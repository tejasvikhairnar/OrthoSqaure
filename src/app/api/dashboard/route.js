import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/config/api.config';
import { authService } from '@/services/authService';

const { BASE_URL, ENDPOINTS } = API_CONFIG;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const regions = searchParams.get('Regions');
    const id = searchParams.get('Id');

    // Get authentication token
    const token = await authService.getToken();

    const params = new URLSearchParams();
    if (regions) params.append('Regions', regions);
    if (id) params.append('Id', id);

    const queryString = params.toString();
    const url = queryString
      ? `${BASE_URL}${ENDPOINTS.DASHBOARD.GET_ALL}?${queryString}`
      : `${BASE_URL}${ENDPOINTS.DASHBOARD.GET_ALL}`;

    console.log('Fetching dashboard data from:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    // Handle 400 params error by returning empty or passing message
    if (!response.ok) {
      const responseText = await response.text();
      console.error('Non-OK response:', response.status, responseText);
      return NextResponse.json(
        { error: `HTTP error! status: ${response.status}`, body: responseText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch dashboard data',
        details: error.message
      },
      { status: 500 }
    );
  }
}
