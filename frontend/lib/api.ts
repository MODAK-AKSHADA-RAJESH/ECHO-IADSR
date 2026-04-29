/**
 * Shared API configuration.
 * Falls back to localhost:8000 for local dev;
 * in Docker / production, set NEXT_PUBLIC_API_URL.
 */
export const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
