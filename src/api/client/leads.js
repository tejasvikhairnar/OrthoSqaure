import axiosClient from "@/lib/axiosClient";

export const getLeads = async (params = {}) => {
    const mergedParams = { PageSize: 20, ...params };
    const response = await axiosClient.get('/api/Leads/GetAllLeads', {
        params: mergedParams
    });

    return response.data;
}

export const upsertLead = async (data) => {
    const response = await axiosClient.post('/api/Leads/upsertLeads', data);

    return response.data;
}
