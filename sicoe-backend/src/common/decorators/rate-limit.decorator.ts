import { SetMetadata } from '@nestjs/common';

export const RATE_LIMIT_KEY = 'rateLimit';

export interface RateLimitOptions {
  ttl: number;  // Time window in seconds
  limit: number;  // Max requests per window
}

/**
 * Custom rate limit decorator for specific routes
 *
 * @example
 * @RateLimit({ ttl: 60, limit: 5 }) // 5 requests per minute
 * @Post('login')
 * async login() {}
 */
export const RateLimit = (options: RateLimitOptions) =>
  SetMetadata(RATE_LIMIT_KEY, options);
