import { getBaseUrl, getToken } from './LoginService';
import * as SecureStore from 'expo-secure-store';

const CHAT_PATH = 'Chat/pagedchat';
const PAGE_SIZE = 15;

export const getChatMessages = async (pageNumber = 1) => {
  const baseUrl = getBaseUrl();
  const token = getToken();
  const userId = await SecureStore.getItemAsync('userId');
  const masterBrokerId = await SecureStore.getItemAsync('masterBrokerId');

  if (!baseUrl || !token || !userId || !masterBrokerId) {
    throw new Error('Missing chat configuration');
  }

  const payload = {
    CustomerId: parseInt(userId, 10),
    BrokerId: parseInt(masterBrokerId, 10),
    MarkAsRead: false,
    GetDocumentFileContents: false,
    GetImageDocumentFileContents: false,
    CachedImageGuids: [],
    GetLatestMessagesByCount: 0,
    PageNumber: pageNumber,
    PageSize: PAGE_SIZE,
  };

  const response = await fetch(`${baseUrl.replace(/\/+$/, '')}/${CHAT_PATH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to load chat messages');
  }

  const data = await response.json();
  return data;
};
