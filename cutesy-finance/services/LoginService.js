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

  if (data && (data.token || data.Token)) {
    token = data.token || data.Token;
    await SecureStore.setItemAsync('authToken', token);
  }
  const uid = data.userId ?? data.UserId;
  if (uid !== undefined) {
    await SecureStore.setItemAsync('userId', String(uid));
  }
  const mbid = data.masterBrokerId ?? data.MasterBrokerId;
  if (mbid !== undefined) {
    await SecureStore.setItemAsync('masterBrokerId', String(mbid));

  }
  return data;
};

