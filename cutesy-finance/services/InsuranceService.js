import { getBaseUrl, getToken } from './LoginService';
import * as SecureStore from 'expo-secure-store';

const INSURANCE_PATH = 'Insurance/customer';

export const getInsurance = async () => {
  const baseUrl = getBaseUrl();
  const token = getToken();
  const userId = await SecureStore.getItemAsync('userId');

  if (!baseUrl || !token || !userId) {
    throw new Error('Missing insurance configuration');
  }

  const url = `${baseUrl.replace(/\/+$/, '')}/${INSURANCE_PATH}/${userId}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to load insurance');
  }

  return await response.json();
};
