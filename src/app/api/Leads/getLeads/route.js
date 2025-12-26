import { NextResponse } from 'next/server';
import { getMockLeads } from '@/api/mocks/leads.js';
import axiosClient from '@/lib/axiosClient';

// Flag to enable/disable mock data fallback
const USE_MOCK_FALLBACK = false;

// Fallback token for testing/dev when header is missing
const FALLBACK_TOKEN = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkFkbWluIiwiSXNDdXN0b21lciI6ImZhbHNlIiwiZXhwIjoxNzY2NTgzNzA1LCJpc3MiOiJodHRwczovL215d2ViYXBpLmNvbSIsImF1ZCI6Imh0dHBzOi8vbXl3ZWJhcGkuY29tIn0.w09KxWQ82EFW5TrT9Gw6mVwPcolWmtUzhj2hnrf2am8";

export async function GET(request) {
  try {
    console.log('Fetching leads list...');

    // Get query parameters from the request
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    
    // Construct potential POST payload for search/pagination
    const searchPayload = {
      PageSize: searchParams.get('PageSize') || 20,
      PageNumber: searchParams.get('PageNumber') || 1,

      // Map common filters
      firstName: searchParams.get('firstName') || "",
      mobile: searchParams.get('mobile') || "",
      // Force wide date range if not provided
      fromDate: searchParams.get('fromDate') || "1900-01-01T00:00:00",
      toDate: searchParams.get('toDate') || "2100-01-01T00:00:00",
      // Support legacy keys if needed
      Name: searchParams.get('firstName') || "",
      MobileNo: searchParams.get('mobile') || ""
    };

    console.log('[DEBUG] Attempting POST search with payload:', JSON.stringify(searchPayload));

    // Extract auth header from incoming request to pass to backend
    let authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
        console.log('[DEBUG] No Authorization header found, using fallback token');
        authHeader = `Bearer ${FALLBACK_TOKEN}`;
    }

    const requestConfig = {
        headers: {
            'Authorization': authHeader // Pass the incoming token or fallback
        }
    };

    // Strategy: Try POST first (common for advanced search), fall back to GET
    let response;
    let methodUsed = "POST";

    try {
        console.log(`[PERF] Starting External API Call (${methodUsed})...`);
        console.time("ExternalAPI_Duration");
        response = await axiosClient.post('/api/Leads/GetAllLeads', searchPayload, requestConfig);
        console.timeEnd("ExternalAPI_Duration");
    } catch (postError) {
        console.timeEnd("ExternalAPI_Duration");
        // Log detailed error from the POST attempt
        if (postError.response) {
            console.log(`[DEBUG] POST Error Status: ${postError.response.status}`);
            console.log(`[DEBUG] POST Error Data:`, postError.response.data);
        } else {
             console.log(`[DEBUG] POST Error: ${postError.message}`);
        }

        // If POST fails with 404 or 405, fallback to GET
        if (postError.response && (postError.response.status === 405 || postError.response.status === 404)) {
             console.log(`[DEBUG] POST search failed (${postError.message}), falling back to GET`);
             methodUsed = "GET";
             
             // Ensure date params are present for GET fallback
             if (!searchParams.has('fromDate')) searchParams.append('fromDate', '1900-01-01');
             if (!searchParams.has('toDate')) searchParams.append('toDate', '2100-01-01');
             
             const getQueryString = searchParams.toString();
             response = await axiosClient.get(`/api/Leads/GetAllLeads${getQueryString ? `?${getQueryString}` : ''}`, requestConfig);
        } else {
            throw postError; // Re-throw other errors
        }
    }

    console.log(`[DEBUG] ${methodUsed} Response Status:`, response.status);
    
    const data = response.data;

    console.log('Leads fetch successful, count:', Array.isArray(data) ? data.length : 'N/A');
    if (Array.isArray(data) && data.length > 0) {
        // Log FULL first item to debug schema mismatch
        console.log('[DEBUG] Full First Item:', JSON.stringify(data[0], null, 2));
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching leads:', error.message);
    if (error.response) {
         console.error('[DEBUG] Full Error Response Data:', JSON.stringify(error.response.data, null, 2));
    }

    // Fallback to mock data on any error if enabled
    if (USE_MOCK_FALLBACK) {
      console.log('⚠️  Exception occurred, using mock data for leads list');
      const mockLeads = getMockLeads();
      return NextResponse.json(mockLeads, {
        headers: {
          'X-Data-Source': 'mock',
          'X-Warning': 'Mock data - external API unavailable'
        }
      });
    }

    const status = error.response ? error.response.status : 500;
    const errorMessage = error.response ? error.response.data : error.message;

    return NextResponse.json(
      {
        error: 'Failed to fetch leads',
        details: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: status }
    );
  }
}
