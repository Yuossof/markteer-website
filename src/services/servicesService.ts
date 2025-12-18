import { getServicesService } from '@/atoms/servicesAsyncAtom';
import { atom } from 'jotai';

export const servicesAsyncAtom = atom(async () => {
  try {
    const data = await getServicesService();
    return {
      data,
      error: null,
      loading: false,
    };
  } catch (error: unknown) {
    let message = 'Unknown error';
    if (error instanceof Error) message = error.message;

    return {
      data: null,
      error: message,
      loading: false,
    };
  }
});