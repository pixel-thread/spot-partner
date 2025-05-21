import { EndpointT } from '~/src/types/endpoints';

/**
 * Available parking endpoint keys.
 * Format: HTTP_METHOD_ACTION
 *
 * @property GET_PARKING - Get all parking locations
 * @property GET_PARKING_BY_ID - Get parking details by ID
 * @property GET_NEARBY_PARKING - Get nearby parking locations
 * @property POST_BOOK_PARKING - Book a parking spot
 */
type ParkingEndpointKeys =
  | 'GET_PARKING'
  | 'POST_ADD_PARKING_GALLERY'
  | 'PUT_ADD_PARKING_IMAGE'
  | 'POST_ADD_PARKING'
  | 'POST_ADD_BOOKING'
  | 'GET_PARKING_BY_USER_ID'
  | 'PUT_PARKING_UPDATE_RATING'
  | 'GET_RANDOM_PARKING'
  | 'GET_PARKING_BY_ID'
  | 'PUT_PARKING_PARKING_ID'
  | 'DELETE_PARKING_PARKING_ID'
  | 'GET_SEARCH_PARKING';

/**
 * Parking API endpoints configuration.
 * Uses EndpointT generic type for type-safe endpoint definitions.
 *
 * @example
 * ```typescript
 * // Using an endpoint
 * const parkingUrl = PARKING_ENDPOINT.GET_PARKING; // "/parking"
 * const parkingDetailUrl = PARKING_ENDPOINT.GET_PARKING_BY_ID; // "/parking/:id"
 * ```
 */

export const PARKING_ENDPOINT: EndpointT<ParkingEndpointKeys> = {
  GET_PARKING: '/parking?page=:page',
  POST_ADD_BOOKING: '/parking/:id/booking',
  PUT_PARKING_UPDATE_RATING: '/parking/:id/rating',
  GET_RANDOM_PARKING: '/parking/random?page=:page&limit=:limit',
  GET_PARKING_BY_ID: '/parking/:id',
  GET_PARKING_BY_USER_ID: '/parking/user/:userId',
  GET_SEARCH_PARKING: '/parking/search?q=:query&page=:page',
  POST_ADD_PARKING: '/parking',
  POST_ADD_PARKING_GALLERY: '/parking/:id/gallery-image',
  PUT_ADD_PARKING_IMAGE: '/parking/:id/image',
  PUT_PARKING_PARKING_ID: '/parking/:id',
  DELETE_PARKING_PARKING_ID: '/parking/:id',
};
