// Centralized route names to avoid typos and ensure consistency
export const ROUTES = {
  HOME: 'index',
  DISCOVER: 'discover',
  MAP: 'map',
  FAVORITES: 'favorites',
  PROFILE: 'profile',
} as const;

export type RouteNames = typeof ROUTES[keyof typeof ROUTES];