import { getBaseUrl, getToken } from './LoginService';
import * as SecureStore from 'expo-secure-store';

const VAULT_TYPE_PATH = 'documentvaulttype';

export const getDocumentVaultTypes = async () => {
  const baseUrl = getBaseUrl();
  const token = getToken();
  const masterBrokerId = await SecureStore.getItemAsync('masterBrokerId');

  if (!baseUrl || !token || !masterBrokerId) {
    throw new Error('Missing document vault type configuration');
  }

  const url = `${baseUrl.replace(/\/+$/, '')}/${VAULT_TYPE_PATH}?brokerId=${masterBrokerId}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to load document vault types');
  }

  return await response.json();
};
