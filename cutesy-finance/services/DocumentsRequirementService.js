import { getBaseUrl, getToken } from './LoginService';
import * as SecureStore from 'expo-secure-store';

const REQUIRED_PATH = 'DocumentsRequirement/requireddocuments';

export const getRequiredDocuments = async () => {
  const baseUrl = getBaseUrl();
  const token = getToken();
  const userId = await SecureStore.getItemAsync('userId');

  if (!baseUrl || !token || !userId) {
    throw new Error('Missing document requirement configuration');
  }

  const url = `${baseUrl.replace(/\/+$/, '')}/${REQUIRED_PATH}/${userId}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to load document requirements');
  }

  return await response.json();
};
