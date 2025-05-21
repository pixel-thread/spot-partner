import { EndpointT } from '~/src/types/endpoints';

type UserEndpointKeys =
  | 'PUT_USER'
  | 'PUT_USER_PASSWORD'
  | 'GET_USER_RECENT_BOOKINGS'
  | 'GET_USER_BOOKING_HISTORY';

export const USER_ENDPOINT: EndpointT<UserEndpointKeys> = {
  PUT_USER: '/user/:id',
  PUT_USER_PASSWORD: '/user/:id/password',
  GET_USER_RECENT_BOOKINGS: '/user/booking/recent',
  GET_USER_BOOKING_HISTORY: '/user/booking/history',
};
