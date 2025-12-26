/**
 * Leads Service
 * Handles all leads/enquiry-related API operations
 */

const API_BASE_URL = "/api/Leads";

/**
 * Fetch all leads with optional filters
 * @param {Object} filters - Filter parameters
 * @param {string} [filters.leadId] - Lead ID
 * @param {string} [filters.clinicId] - Clinic ID
 * @param {string} [filters.mobileNo] - Mobile number
 * @param {string} [filters.mobileNo] - Mobile number
 * @param {string} [filters.name] - Lead name
 * @param {string} [filters.fromDate] - From Date (YYYY-MM-DD)
 * @param {string} [filters.toDate] - To Date (YYYY-MM-DD)
 * @returns {Promise<{data: Array, isMockData: boolean}>} Leads list with mock data flag
 * @throws {Error} If request fails
 */
export const getAllLeads = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    // Build query parameters
    // Build query parameters
    // Note: External API seems to return 404 if we send unknown params.
    // We will try to filter client-side if server-side filtering fails.
    if (filters.leadId) params.append('enquiryID', filters.leadId);
    if (filters.clinicId) params.append('clinicID', filters.clinicId);
    if (filters.fromDate) params.append('fromDate', filters.fromDate);
    if (filters.toDate) params.append('toDate', filters.toDate);
    
    // Pagination parameters
    const size = '20';
    if (!params.has('PageSize')) params.append('PageSize', size);
    if (!params.has('pageSize')) params.append('pageSize', size);
    if (!params.has('limit')) params.append('limit', size);

    if (!params.has('PageNumber')) params.append('PageNumber', '1');

    const queryString = params.toString();
    const url = `${API_BASE_URL}/getLeads${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const data = await response.json();

    // Check if using mock data
    const dataSource = response.headers.get('X-Data-Source');
    if (dataSource === 'mock') {
      console.log('[Leads Service] Using mock data - external API unavailable');
      return { data, isMockData: true };
    }

    console.log('[Leads Service] Fetched leads count:', Array.isArray(data) ? data.length : 'Not an array');

    // Check if response contains an error object
    if (data && data.error) {
      const errorMsg = data.message || data.error || `HTTP error! status: ${response.status}`;
      throw new Error(errorMsg);
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { data, isMockData: false };
  } catch (error) {
    console.error('[Leads Service] Error fetching leads:', error);
    throw error;
  }
};

/**
 * Add or update a lead
 * @param {Object} leadData - Lead information
 * @returns {Promise<{leadID: number, success: boolean, isMockData: boolean}>}
 * @throws {Error} If request fails
 */
export const upsertLead = async (leadData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/upsertLeads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    const data = await response.json();

    // Check if using mock data
    const dataSource = response.headers.get('X-Data-Source');
    if (dataSource === 'mock') {
      console.log('[Leads Service] Mock upsert - data not saved to external API');
      return { ...data, isMockData: true };
    }

    // Check for errors in response
    if (data && data.error) {
      throw new Error(data.error);
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { ...data, isMockData: false };
  } catch (error) {
    console.error('[Leads Service] Error upserting lead:', error);
    throw error;
  }
};

/**
 * Delete a lead
 * @param {number} leadId - Lead ID to delete
 * @returns {Promise<boolean>} Success status
 * @throws {Error} If request fails
 */
export const deleteLead = async (leadId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${leadId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('[Leads Service] Error deleting lead:', error);
    throw error;
  }
};
