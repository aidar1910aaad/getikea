// services/api.ts
const BASE_URL = 'https://getikea.vercel.app';

export const login = async (email: string, password: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const response = await res.json();
    console.log('Response status:', res.status);
    console.log('User data:', response); // Log user data for debugging

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const register = async (email: string, password: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const response = await res.json();
    console.log('Response:', response); // Log response for debugging

    return response;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const getParcels = async (token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/me/parcels`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch parcels');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching parcels:', error);
    throw error;
  }
};
