import * as SecureStore from 'expo-secure-store';

const LOGIN_PATH = 'Auth/SignIn';

let baseUrl = '';
let token = null;

export const setBaseUrl = (url) => {
  baseUrl = url;
};

export const getBaseUrl = () => baseUrl;

export const getToken = () => token;

export const login = async (emailAddress, password) => {
  if (!baseUrl) {
    throw new Error('Base URL is not set');
  }
  const response = await fetch(`${baseUrl.replace(/\/+$/, '')}/${LOGIN_PATH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ emailAddress, password }),
  });

  const data = await response.json();
  if (data && data.token) {
    token = data.token;
    await SecureStore.setItemAsync('authToken', data.token);
  }
  if (data && data.userId) {
    await SecureStore.setItemAsync('userId', String(data.userId));
  }
  if (data && data.masterBrokerId) {
    await SecureStore.setItemAsync('masterBrokerId', String(data.masterBrokerId));
  }
  return data;
};

