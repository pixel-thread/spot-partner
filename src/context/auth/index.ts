import React from 'react';

import { AuthContextI } from '~/src/types/auth/context';

export const AuthContext = React.createContext<AuthContextI | null>(null);
