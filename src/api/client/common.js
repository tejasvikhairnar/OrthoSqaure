import axiosClient from "@/lib/axiosClient";

export const getCommonData = {
    getDoctors: async (ClinicId)=>{
        // Use fetch to hit internal Next.js API (relative path) instead of external axiosClient
        const response = await fetch(`/api/doctors?ClinicId=${ClinicId || ''}`);
        if (!response.ok) throw new Error('Failed to fetch doctors');
        return response.json();
    },
    getClinics: async ()=>{
         // Use fetch to hit internal Next.js API (relative path) instead of external axiosClient
        const response = await fetch(`/api/clinics`);
        if (!response.ok) throw new Error('Failed to fetch clinics');
        return response.json();
    },

}