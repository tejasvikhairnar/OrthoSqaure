/**
 * Leads Data Transformation Utilities
 * Handles transformation between UI forms and API data formats
 */

/**
 * Clinic ID mapping
 */
const CLINIC_ID_MAP = {
  'Panvel': 1,
  'Pune': 2,
  'Mumbai': 3,
  'Nashik': 4,
};

/**
 * Lead Source mapping
 */
const LEAD_SOURCE_MAP = {
  'google': 1,
  'facebook': 2,
  'instagram': 3,
  'justdial': 4,
  'referral': 5,
  'walkin': 6,
};

/**
 * Transform form data to API format
 * @param {Object} formData - Form data from the UI
 * @returns {Object} Transformed data for API
 */
export const transformFormDataToAPI = (formData) => {
  // Build the leadsModel object with all fields
  const leadData = {
    // Mode and IDs - using capitalized field names to match API
    Mode: "1",
    LeadID: 0, // 0 for new leads (not null)
    ClinicID: formData.clinicName ? CLINIC_ID_MAP[formData.clinicName] : 1,

    // Personal Information - capitalized to match API
    FirstName: formData.firstName,
    LastName: formData.lastName || "",
    DOB: formData.dateOfBirth || null,
    Age: formData.age ? parseInt(formData.age) : 0,
    Gender: formData.gender || "",

    // Contact Information - capitalized to match API
    PhoneNo1: formData.mobileNo1,
    PhoneNo2: formData.mobileNo2 || "",
    Emailid: formData.email || "",

    // Address Information - capitalized to match API (using default IDs)
    Address: formData.address || "",
    Area: formData.area || "",
    CityID: 1, // Default city ID (required as number)
    StateID: 1, // Default state ID (required as number)
    CountryID: 1, // Default country ID (required as number)

    // Lead Information - capitalized to match API
    LeadSourceID: formData.leadSource ? LEAD_SOURCE_MAP[formData.leadSource] : 1,
    LeadDate: formData.leadDate || new Date().toISOString().split('T')[0],
    AssignTo: formData.assignTo || "",
    PatientFollowup: formData.patientFollowup || "patient",
    InterestLevel: formData.interestLevel ? parseInt(formData.interestLevel) : 1,
    PatientStatus: formData.patientStatus || "cooperative",
    ConversationDetails: formData.conversationDetails || "",
    LeadFor: formData.leadFor || "",
    ContactType: formData.contactType || "doctors",

    // Status - capitalized to match API
    IsActive: true,
  };

  // Return with leadsModel wrapper as required by API
  return {
    leadsModel: leadData
  };
};

/**
 * Transform API response to display format
 * @param {Object} apiLead - Lead data from API
 * @returns {Object} Transformed data for display
 */
export const transformAPILeadToDisplay = (apiLead) => {
  return {
    srNo: apiLead.leadID || apiLead.LeadID,
    leadNo: apiLead.leadNo || apiLead.LeadNo || `E${apiLead.leadID}`,
    name: `${apiLead.firstName || ''} ${apiLead.lastName || ''}`.trim(),
    mobileNo: apiLead.phoneNo1 || apiLead.PhoneNo1 || '',
    clinicName: getClinicNameFromID(apiLead.clinicID || apiLead.ClinicID),
    sourceName: getSourceNameFromID(apiLead.leadSourceID || apiLead.LeadSourceID),
    status: apiLead.patientFollowup || apiLead.PatientFollowup || 'Patient',
    date: formatDate(apiLead.leadDate || apiLead.LeadDate),
    email: apiLead.emailid || apiLead.Emailid || '',
  };
};

/**
 * Get clinic name from ID
 * @param {number} clinicID - Clinic ID
 * @returns {string} Clinic name
 */
const getClinicNameFromID = (clinicID) => {
  const reverseMap = Object.entries(CLINIC_ID_MAP).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {});
  return reverseMap[clinicID] || 'Unknown';
};

/**
 * Get source name from ID
 * @param {number} sourceID - Source ID
 * @returns {string} Source name
 */
const getSourceNameFromID = (sourceID) => {
  const reverseMap = Object.entries(LEAD_SOURCE_MAP).reduce((acc, [key, value]) => {
    acc[value] = key.charAt(0).toUpperCase() + key.slice(1);
    return acc;
  }, {});
  return reverseMap[sourceID] || 'Unknown';
};

/**
 * Format date to DD-MMM-YYYY
 * @param {string} dateString - Date string
 * @returns {string} Formatted date
 */
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

/**
 * Normalize lead data for consistent handling
 * @param {Object} leadData - Raw lead data
 * @returns {Object} Normalized lead data
 */
export const normalizeLeadData = (leadData) => {
  if (!leadData) return null;

  return {
    leadID: leadData.leadID || leadData.LeadID || null,
    firstName: leadData.firstName || leadData.FirstName || '',
    lastName: leadData.lastName || leadData.LastName || '',
    mobileNo: leadData.phoneNo1 || leadData.PhoneNo1 || '',
    email: leadData.emailid || leadData.Emailid || '',
    clinicID: leadData.clinicID || leadData.ClinicID || null,
    leadSourceID: leadData.leadSourceID || leadData.LeadSourceID || null,
  };
};
