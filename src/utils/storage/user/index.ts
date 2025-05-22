import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_USER_KEY } from '~/src/libs/constants/auth';
import { UserT } from '~/src/types/auth/context';

/**
 * Custom error class for user-related storage operations.
 */
class UserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserError';
  }
}

/**
 * Save a user object to AsyncStorage.
 * @param user User object conforming to UserT.
 */
export const saveUser = async (user: UserT): Promise<void> => {
  try {
    const json = JSON.stringify(user);
    await AsyncStorage.setItem(AUTH_USER_KEY, json);
  } catch (error: any) {
    throw new UserError(`Failed to save user: ${error?.message}`);
  }
};

/**
 * Retrieve the user object from AsyncStorage.
 * @returns Parsed UserT object or null.
 */
export const getUser = async (): Promise<UserT | null> => {
  try {
    const userJson = await AsyncStorage.getItem(AUTH_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error: any) {
    throw new UserError(`Failed to retrieve user: ${error?.message}`);
  }
};

/**
 * Remove the user object from AsyncStorage.
 */
export const removeUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(AUTH_USER_KEY);
  } catch (error: any) {
    throw new UserError(`Failed to remove user: ${error?.message}`);
  }
};
