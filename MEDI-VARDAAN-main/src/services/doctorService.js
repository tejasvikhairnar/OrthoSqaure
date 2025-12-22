/**
 * Doctor Service
 * Handles all doctor-related API operations
 */

const API_BASE_URL = "/api/doctors";

/**
 * Fetch all doctors with optional filters
 * @param {Object} filters - Filter parameters
 * @param {string} [filters.doctorId] - Doctor ID
 * @param {string} [filters.clinicId] - Clinic ID
 * @param {string} [filters.clinicName] - Clinic name
 * @param {string} [filters.mobileNo] - Mobile number
 * @param {string} [filters.mode] - Mode parameter
 * @returns {Promise<{data: Array, isMockData: boolean}>} Doctors list with mock data flag
 * @throws {Error} If request fails
 */
export const getAllDoctors = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    // Build query parameters
    if (filters.doctorId) params.append('DoctorID', filters.doctorId);
    if (filters.clinicId) params.append('ClinicID', filters.clinicId);
    if (filters.clinicName) params.append('ClinicName', filters.clinicName);
    if (filters.mobileNo) params.append('MobileNo', filters.mobileNo);
    if (filters.mode) params.append('Mode', filters.mode);

    const queryString = params.toString();
    const url = `${API_BASE_URL}${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    // Check if using mock data
    const dataSource = response.headers.get('X-Data-Source');
    if (dataSource === 'mock') {
      console.log('[Doctor Service] Using mock data - external API unavailable');
      return { data, isMockData: true };
    }

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
    console.error('[Doctor Service] Error fetching doctors:', error);
    throw error;
  }
};

/**
 * Add or update a doctor
 * @param {Object} doctorData - Doctor information
 * @returns {Promise<{doctorID: number, success: boolean, isMockData: boolean}>}
 * @throws {Error} If request fails
 */
export const upsertDoctor = async (doctorData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/upsert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doctorData),
    });

    const data = await response.json();

    // Check if using mock data
    const dataSource = response.headers.get('X-Data-Source');
    if (dataSource === 'mock') {
      console.log('[Doctor Service] Mock upsert - data not saved to external API');
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
    console.error('[Doctor Service] Error upserting doctor:', error);
    throw error;
  }
};

/**
 * Delete a doctor
 * @param {number} doctorId - Doctor ID to delete
 * @returns {Promise<boolean>} Success status
 * @throws {Error} If request fails
 */
export const deleteDoctor = async (doctorId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${doctorId}`, {
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
    console.error('[Doctor Service] Error deleting doctor:', error);
    throw error;
  }
};
