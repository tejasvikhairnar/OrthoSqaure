import axiosClient from "@/lib/axiosClient";

export const dashboardCount={
getDashboardCountData : async (Regions,UserId,Type) => {
    const response = await axiosClient.get(`/api/Dashboard/GetAllDashboard`,{
        params:{
            Regions,
            UserId,
            Type
        }
    })

return response.data;
},


getClinicDashboardCountData : async (ClinicId,DoctorId) => {
    // Use fetch to hit internal Next.js API (relative path) instead of external axiosClient
    const params = new URLSearchParams();
    if (ClinicId !== undefined && ClinicId !== null) params.append('Regions', ClinicId);
    if (DoctorId !== undefined && DoctorId !== null) params.append('Id', DoctorId);
    
    const response = await fetch(`/api/dashboard?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch dashboard data');
    return response.json();
},


}