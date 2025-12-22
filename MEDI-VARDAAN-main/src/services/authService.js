/**
 * Authentication Service
 * Handles authentication with the external API
 */

import { API_CONFIG } from '@/config/api.config';

class AuthService {
  constructor() {
    this.cachedToken = null;
    this.tokenExpiry = null;
  }

  /**
   * Check if token is still valid
   * @returns {boolean}
   */
  isTokenValid() {
    return this.cachedToken && this.tokenExpiry && Date.now() < this.tokenExpiry;
  }

  /**
   * Get authentication token
   * Returns cached token if still valid, otherwise fetches new token
   * @returns {Promise<string>} Authentication token
   * @throws {Error} If authentication fails
   */
  async getToken() {
    // Return cached token if still valid
    if (this.isTokenValid()) {
      return this.cachedToken;
    }

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: API_CONFIG.AUTH.USERNAME,
          userPassword: API_CONFIG.AUTH.PASSWORD,
        }),
      });

      if (!response.ok) {
        throw new Error(`Login failed! status: ${response.status}`);
      }

      const data = await response.json();

      // Extract token from response (try different possible property names)
      this.cachedToken = data.token || data.accessToken || data.jwt || data.data || data;

      // Set token expiry (default to 1 hour if not specified)
      this.tokenExpiry = Date.now() + API_CONFIG.TOKEN_CACHE_DURATION;

      console.log('[Auth] Token acquired successfully');

      return this.cachedToken;
    } catch (error) {
      console.error('[Auth] Authentication failed:', error.message);
      throw new Error(`Authentication failed: ${error.message}`);
    }
  }

  /**
   * Clear cached token
   */
  clearToken() {
    this.cachedToken = null;
    this.tokenExpiry = null;
    console.log('[Auth] Token cleared');
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
