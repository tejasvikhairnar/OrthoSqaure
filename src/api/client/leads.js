import axiosClient from "@/lib/axiosClient";

export const getLeads = async (params = {}) => {
    const mergedParams = { PageSize: 1000, ...params };
    const response = await axiosClient.get('/api/Leads/getLeads', {
        params: mergedParams,
        baseURL: '' // Force relative path to hit Next.js API route instead of external API
    });

    return response.data;
}

export const upsertLead = async (data) => {
    const response = await axiosClient.post('/api/Leads/upsertLeads', data, {
        baseURL: '' // Force relative path to hit Next.js API route
    });

    return response.data;
}
