import React from 'react';

import { SubscriptionContextI } from '~/src/types/subscription';

export const SubscriptionContext = React.createContext<SubscriptionContextI | null>(null);
