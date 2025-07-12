import { getBaseUrl, getToken } from './LoginService';
import * as SecureStore from 'expo-secure-store';

// Retrieves the list of document requirements that the currently logged in user
// still needs to supply. Each requirement includes a DocuVault type identifier
// which can be matched with the metadata returned by DocumentVaultTypeService.

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
