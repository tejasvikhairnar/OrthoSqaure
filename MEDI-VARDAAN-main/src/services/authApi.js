// API base URL - using local Next.js API routes to bypass CORS
const API_BASE_URL = "/api/auth";

/**
 * Login to get JWT token
 * @param {string} userId - User ID
 * @param {string} userPassword - User password
 * @returns {Promise<string>} JWT token
 */
export const login = async (userId, userPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        userPassword,
      }),
    });

    if (!response.ok) {
      throw new Error(`Login failed! status: ${response.status}`);
    }

    const data = await response.json();

    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('jwt_token', data.token);
    }

    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

/**
 * Logout
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    const token = localStorage.getItem('jwt_token');

    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    // Clear token from localStorage
    localStorage.removeItem('jwt_token');

    if (!response.ok) {
      throw new Error(`Logout failed! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error during logout:', error);
    // Still clear token even if logout fails
    localStorage.removeItem('jwt_token');
    throw error;
  }
};

/**
 * Get stored JWT token
 * @returns {string|null} JWT token or null if not found
 */
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('jwt_token');
  }
  return null;
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if token exists
 */
export const isAuthenticated = () => {
  return !!getToken();
};
