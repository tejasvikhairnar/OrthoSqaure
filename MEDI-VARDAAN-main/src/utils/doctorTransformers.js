/**
 * Doctor Data Transformation Utilities
 * Handles transformation between UI forms and API data formats
 */

/**
 * Clinic ID mapping
 */
const CLINIC_ID_MAP = {
  panvel: 1,
  pune: 2,
  mumbai: 3,
  nashik: 4,
};

/**
 * Doctor type ID mapping
 */
const DOCTOR_TYPE_MAP = {
  'full-time': 1,
  'part-time': 2,
  'visiting': 3,
};

/**
 * Transform form data to API format
 * @param {Object} formData - Form data from the UI
 * @returns {Object} Transformed data for API
 */
export const transformFormDataToAPI = (formData) => {
  return {
    // Mode and IDs
    mode: "1",
    doctorID: null, // null for new doctors
    clinicID: formData.clinicName ? CLINIC_ID_MAP[formData.clinicName] : null,
    doctorTypeID: DOCTOR_TYPE_MAP[formData.doctorType] || 1,

    // Personal Information
    firstName: formData.firstName,
    lastName: formData.lastName,
    gender: formData.gender,
    dob: formData.dateOfBirth || null,
    bloodGroup: formData.bloodGroup || null,

    // Contact Information
    phoneNo1: formData.mobileNo1,
    phoneNo2: formData.mobileNo2 || null,
    emailid: formData.email,

    // Address Information
    addressLine1: formData.addressLine1 || null,
    addressLine2: formData.addressLine2 || null,
    areaPin: formData.areaPin || null,
    cityID: null, // Would need actual city ID mapping
    stateID: null, // Would need actual state ID mapping
    countryID: null, // Would need actual country ID mapping

    // Medical Information
    specialityID: Object.keys(formData.specialities)
      .filter(key => formData.specialities[key])
      .join(', '),
    basicDegree: formData.currentEducation.degree || null,
    registrationNo: formData.registrationNo || null,
    registrationImageUrl: null, // File uploads would need separate handling

    // Documents - image URLs
    panCardNo: formData.panCardNo || null,
    panCardImageUrl: null, // File uploads would need separate handling
    adharCardNo: formData.adharCardNo || null,
    adharCardImageUrl: null, // File uploads would need separate handling
    identityPolicyNo: formData.indemnityPolicyNo || null,
    identityPolicyImageUrl: null, // File uploads would need separate handling
    degreeUpload1: null, // File uploads would need separate handling
    degreeUpload2: null,
    profileImageUrl: null, // File uploads would need separate handling

    // Work Information
    intime: formData.inTime || null,
    outtime: formData.outTime || null,
    regDate: formData.date || new Date().toISOString().split('T')[0],

    // User credentials (optional for now)
    userName: null,
    password: null,
    role: null,

    // Status
    isActive: true,
  };
};

/**
 * Transform API response to display format
 * @param {Object} apiDoctor - Doctor data from API
 * @returns {Object} Transformed data for display
 */
export const transformAPIDoctorToDisplay = (apiDoctor) => {
  return {
    srNo: apiDoctor.doctorID || apiDoctor.DoctorID,
    photo: apiDoctor.profilePhoto || "/placeholder-doctor.png",
    name: `${apiDoctor.title || ''} ${apiDoctor.firstName || ''} ${apiDoctor.lastName || ''}`.trim(),
    mobileNo: apiDoctor.mobileNo || apiDoctor.MobileNo || '',
    emailId: apiDoctor.emailID || apiDoctor.EmailID || '',
    regDate: apiDoctor.registrationDate || apiDoctor.RegistrationDate ||
             new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
  };
};

/**
 * Normalize API response to handle different field name formats
 * @param {Object} doctor - Raw doctor data from API
 * @returns {Object} Normalized doctor data
 */
export const normalizeDoctorData = (doctor) => {
  return {
    doctorID: doctor.doctorID || doctor.DoctorID,
    clinicID: doctor.clinicID || doctor.ClinicID,
    clinicName: doctor.clinicName || doctor.ClinicName,
    firstName: doctor.firstName || doctor.FirstName,
    lastName: doctor.lastName || doctor.LastName,
    mobileNo: doctor.mobileNo || doctor.MobileNo || doctor.phoneNo1,
    MobileNo: doctor.mobileNo || doctor.MobileNo || doctor.phoneNo1,
    emailID: doctor.emailID || doctor.EmailID || doctor.emailid,
    EmailID: doctor.emailID || doctor.EmailID || doctor.emailid,
    profilePhoto: doctor.profilePhoto || doctor.ProfilePhoto,
    registrationDate: doctor.registrationDate || doctor.RegistrationDate || doctor.regDate,
    RegistrationDate: doctor.registrationDate || doctor.RegistrationDate || doctor.regDate,
    ...doctor,
  };
};
