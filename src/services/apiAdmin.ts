const BASE_URL = 'https://getikea.vercel.app';

const fetchData = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Request failed');
    }

    const response = await res.json();
    return response;
  } catch (error) {
    console.error('Error during API request:', error);
    throw error;
  }
};

// Parcels API

export const getAllParcels = async (token: string) => {
  const url = `${BASE_URL}/api/admin/parcels`;
  return fetchData(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export const getParcel = async (id: number, token: string) => {
  const url = `${BASE_URL}/api/admin/parcels/${id}`;
  return fetchData(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export const addParcel = async (parcelData: any, token: string) => {
  const url = `${BASE_URL}/api/admin/parcels`;
  return fetchData(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(parcelData)
  });
};

export const patchParcelStatus = async (id: number, status: string, token: string) => {
  const url = `${BASE_URL}/api/admin/parcels/${id}/status`;
  return fetchData(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
};

export const patchParcelItems = async (id: number, items: Item[], token: string) => {
  const url = `${BASE_URL}/api/admin/parcels/${id}/items`;
  return fetchData(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ items })
  });
};

export const patchParcelImageKey = async (id: number, imageKey: string, token: string) => {
  const url = `${BASE_URL}/api/admin/parcels/${id}/imageKey`;
  return fetchData(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ imageKey })
  });
};

export const deleteParcel = async (id: number, token: string) => {
  const url = `${BASE_URL}/api/admin/parcels/${id}`;
  return fetchData(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

// Users API

export const getUserById = async (id: number, token: string) => {
  const url = `${BASE_URL}/api/admin/users/${id}`;
  return fetchData(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export const getAllUsers = async (token: string) => {
  const url = `${BASE_URL}/api/admin/users`;
  return fetchData(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export const createUser = async (userData: any, token: string) => {
  const url = `${BASE_URL}/api/admin/users`;
  return fetchData(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  });
};

export const updateUser = async (id: number, userData: any, token: string) => {
  const url = `${BASE_URL}/api/admin/users/${id}`;
  return fetchData(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  });
};

export const deleteUser = async (id: number, token: string) => {
  const url = `${BASE_URL}/api/admin/users/${id}`;
  return fetchData(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};
