import { useMutation } from '@tanstack/react-query';
import React, { useEffect } from 'react';

import { AuthContext } from '~/src/context/auth';
import { AUTH_ENDPOINT } from '~/src/libs/endpoints/auth';
import { AuthContextI, UserT } from '~/src/types/auth/context';
import http from '~/src/utils/https';
import { logger } from '~/src/utils/logger';
import { getToken, removeToken } from '~/src/utils/storage/token';
import { Ternary } from '../../common/Ternary';
import { LoadingScreen } from '../../common/LoadingScreen';

type Props = {
  children: Readonly<React.ReactNode>;
};

const onSuccessLogout = async () => {
  try {
    await removeToken();
  } catch (error) {
    logger.error({ message: 'Failed to logout', error });
  }
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<UserT | null>(null);
  const [isInitial, setIsInitial] = React.useState(true);

  const { mutate, isPending: isAuthLoading } = useMutation({
    mutationKey: ['user'],
    mutationFn: () => http.get<UserT>(AUTH_ENDPOINT.GET_ME),
    onSuccess: async (data) => {
      if (data.success) {
        const userData = data.data;
        setUser(userData);
        if (userData) {
          logger.info('Saving User To Storage after fetching');
          return userData;
        }
      }
      removeToken();
      logger.error('User failed to verify');
      setUser(null);
    },
    onError: (error) => {
      setUser(null);
      logger.error({ message: 'Fetching user failed', error });
    },
  });

  const verifyUser = async () => {
    try {
      const token = await getToken();
      if (token) {
        mutate();
        logger.info('Getting User From Token');
      } else {
        setUser(null);
        logger.info('No token or user found in storage');
      }
    } catch (error) {
      setUser(null);
      logger.error({ message: 'Error verifying user', error });
    } finally {
      setIsInitial(false);
    }
  };

  const { mutate: onLogout, isPending: isLogoutPending } = useMutation({
    mutationFn: () => http.post(AUTH_ENDPOINT.POST_LOGOUT),
    onSuccess: async () => {
      onSuccessLogout();
      setUser(null);
      logger.info('Logout Successfull');
    },
    onError: (error) => {
      onSuccessLogout();
      setUser(null);
      logger.error({ message: 'Failed to logout but still logged locally', error });
    },
  });

  useEffect(() => {
    const initializeAuth = async () => {
      if (isInitial) {
        logger.info('Initializing Auth');
        await verifyUser();
      }
    };

    initializeAuth();
  }, [isInitial, mutate, verifyUser]);

  const isLoading = isAuthLoading || isLogoutPending;
  const value: AuthContextI = {
    user,
    onLogout,
    isAuthLoading: isLoading,
    refresh: verifyUser,
  } satisfies AuthContextI;

  return (
    <AuthContext.Provider value={value}>
      <Ternary condition={isLoading} ifTrue={<LoadingScreen />} ifFalse={children} />
    </AuthContext.Provider>
  );
};
