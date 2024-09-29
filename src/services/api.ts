// services/api.ts
import { Item } from "../types";

const BASE_URL = "https://getikea.vercel.app";

export const login = async (email: string, password: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }

    const response = await res.json();
    console.log("Response status:", res.status);
    console.log("User data:", response); // Log user data for debugging

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const register = async (email: string, password: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const response = await res.json();
    console.log("Response:", response); // Log response for debugging

    return response;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const getParcels = async (token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/me/parcels`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res.headers);

    if (!res.ok) {
      throw new Error("Failed to fetch parcels");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching parcels:", error);
    throw error;
  }
};

export const addParcels = async (token: string, items: Item[]) => {
  try {
    const payload = { items };
    console.log("Отправляемый payload:", payload);

    const response = await fetch("https://getikea.vercel.app/api/me/parcels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Ошибка ${response.status}: ${errorDetails}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка при добавлении посылки:", error);
    throw error;
  }
};

export const getProfile = async (token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/me/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};
export const updateProfile = async (token: string, profileData: any) => {
  try {
    console.log("Updating profile with data:", profileData);
    const res = await fetch(`${BASE_URL}/api/me/profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error data:", errorData);
      throw new Error(errorData.message || "Failed to update profile");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
