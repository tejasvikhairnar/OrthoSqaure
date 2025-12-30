import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/config/api.config';
import { authService } from '@/services/authService';

const { BASE_URL, ENDPOINTS } = API_CONFIG;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Get authentication token
    const token = await authService.getToken();

    const url = `${BASE_URL}${ENDPOINTS.CLINIC.GET_ALL}`;

    console.log('Fetching clinics from:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

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
    console.error('Error fetching clinics:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch clinics',
        details: error.message
      },
      { status: 500 }
    );
  }
}
