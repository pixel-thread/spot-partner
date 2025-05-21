import React from 'react';

import { SubscriptionContext } from '~/src/context/subscription';

export function useSubscription() {
  const context = React.useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionContextProvider');
  }
  return context;
}
