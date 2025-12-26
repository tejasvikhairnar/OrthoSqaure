const axios = require('axios');

async function testApi() {
  console.log('Testing External API...');
  console.time('API_Call');
  try {
    const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkFkbWluIiwiSXNDdXN0b21lciI6ImZhbHNlIiwiZXhwIjoxNzY2NTgzNzA1LCJpc3MiOiJodHRwczovL215d2ViYXBpLmNvbSIsImF1ZCI6Imh0dHBzOi8vbXl3ZWJhcGkuY29tIn0.w09KxWQ82EFW5TrT9Gw6mVwPcolWmtUzhj2hnrf2am8";
    const response = await axios.get('https://bmetrics.in/APIDemo/api/Leads/GetAllLeads?PageSize=20', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Status:', response.status);
    console.log('Data length:', response.data.length);
  } catch (error) {
    console.error('Error:', error.message);
  }
  console.timeEnd('API_Call');
}

testApi();
