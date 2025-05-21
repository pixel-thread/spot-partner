import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_SKIP_LOGIN_KEY } from '~/src/libs/constants/auth';

class SkipAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TokenError';
  }
}

const TOKEN_KEY = AUTH_SKIP_LOGIN_KEY;

const validateUserSkipLogin = (isSkipLogin: boolean): boolean => {
  return typeof isSkipLogin === 'boolean';
};

export const saveSkipAuth = async (isSkipLogin: boolean): Promise<void> => {
  if (!validateUserSkipLogin(isSkipLogin)) {
    throw new SkipAuthError('Invalid token format');
  }

  try {
    await AsyncStorage.setItem(TOKEN_KEY, isSkipLogin.toString());
  } catch (error: any) {
    throw new SkipAuthError(`Failed to save token: ${error.message}`);
  }
};

export const getSkipAuth = async (): Promise<boolean | null> => {
  try {
    const tokenAsString = await AsyncStorage.getItem(TOKEN_KEY);
    const token = tokenAsString === 'true' || false;
    return token && validateUserSkipLogin(token) ? token : null;
  } catch (error: any) {
    throw new SkipAuthError(`Failed to retrieve token: ${error.message}`);
  }
};

export const removeSkipAuth = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error: any) {
    throw new SkipAuthError(`Failed to remove token: ${error.message}`);
  }
};
