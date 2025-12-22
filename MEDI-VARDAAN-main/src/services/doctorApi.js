/**
 * Doctor API - Legacy Export File
 * @deprecated Use @/services/doctorService and @/utils/doctorTransformers instead
 *
 * This file maintains backward compatibility.
 * New code should import from the new locations:
 * - Service functions: @/services/doctorService
 * - Transformers: @/utils/doctorTransformers
 */

// Re-export service functions
export { getAllDoctors, upsertDoctor, deleteDoctor } from './doctorService';

// Re-export transformer functions
export {
  transformFormDataToAPI,
  transformAPIDoctorToDisplay,
  normalizeDoctorData
} from '../utils/doctorTransformers';
