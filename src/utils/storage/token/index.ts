import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_TOKEN_KEY } from '~/src/libs/constants/auth';

class TokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TokenError';
  }
}

const TOKEN_KEY = AUTH_TOKEN_KEY;

const validateToken = (token: string): boolean => {
  // Basic validation - adjust according to your token format
  return typeof token === 'string' && token.length > 10;
};

export const saveToken = async (token: string): Promise<void> => {
  if (!validateToken(token)) {
    throw new TokenError('Invalid token format');
  }

  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error: any) {
    throw new TokenError(`Failed to save token: ${error.message}`);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token && validateToken(token) ? token : null;
  } catch (error: any) {
    throw new TokenError(`Failed to retrieve token: ${error.message}`);
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error: any) {
    throw new TokenError(`Failed to remove token: ${error.message}`);
  }
};
