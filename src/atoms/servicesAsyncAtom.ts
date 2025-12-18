import { baseUrl } from "@/constants/base-url";

export const getServicesService = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/services`);

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      const message = errorData?.message || 'Something went wrong';
      throw new Error(message);
    }

    const data = await res.json();
    return data.services;

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Fetch Error:', error.message);
      throw new Error(error.message);
    }
    throw new Error('Unknown error occurred');
  }
};
