const axios = require('axios');

// Fallback token from route.js
const FALLBACK_TOKEN = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkFkbWluIiwiSXNDdXN0b21lciI6ImZhbHNlIiwiZXhwIjoxNzY2NTgzNzA1LCJpc3MiOiJodHRwczovL215d2ViYXBpLmNvbSIsImF1ZCI6Imh0dHBzOi8vbXl3ZWJhcGkuY29tIn0.w09KxWQ82EFW5TrT9Gw6mVwPcolWmtUzhj2hnrf2am8";

const BASE_URL = "https://bmetrics.in/APIDemo";

async function testApi() {
    try {
        console.log("Testing POST request...");
        // Emulate the POST request
        try {
            await axios.post(`${BASE_URL}/api/Leads/GetAllLeads`, {
                PageSize: 20,
                PageNumber: 1
            }, {
                headers: { 'Authorization': `Bearer ${FALLBACK_TOKEN}` }
            });
        } catch (postError) {
            console.log("POST failed as expected with status:", postError.response ? postError.response.status : postError.message);
            
            if (postError.response && (postError.response.status === 405 || postError.response.status === 404)) {
                console.log("Falling back to GET...");
                const response = await axios.get(`${BASE_URL}/api/Leads/GetAllLeads?fromDate=1900-01-01&toDate=2100-01-01`, {
                    headers: { 'Authorization': `Bearer ${FALLBACK_TOKEN}` }
                });
                console.log("GET Success:", response.status);
            } else {
                throw postError;
            }
        }
    } catch (error) {
        console.error("Final Error caught:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
            console.error("Headers:", error.response.headers);
        } else {
            console.error("Message:", error.message);
        }
    }
}

testApi();
