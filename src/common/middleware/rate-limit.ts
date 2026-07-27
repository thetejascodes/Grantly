import type { NextFunction, Request, Response } from 'express';
import { redis } from '../redis/index.js';
import ApiError from '../utils/api-error.js';

interface RateLimitOptions {
  keyPrefix: string;
  limit: number;
  windowSeconds: number;
}

/**
 * Fixed-window counter rate limiter backed by Redis.
 * Key shape: ratelimit:<keyPrefix>:<ip> — one counter per IP per route
 * group, reset every windowSeconds via Redis TTL.
 */
export function rateLimit({ keyPrefix, limit, windowSeconds }: RateLimitOptions) {
  return async function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip ?? 'unknown';
    const key = `ratelimit:${keyPrefix}:${ip}`;

    try {
      const current = await redis.incr(key);

      if (current === 1) {
        await redis.expire(key, windowSeconds);
      }

      if (current > limit) {
        const ttl = await redis.ttl(key);
        res.set('Retry-After', String(ttl > 0 ? ttl : windowSeconds));
        throw ApiError.tooManyRequests('Too many requests, please try again later.');
      }

      next();
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
        return;
      }
      // Redis connectivity issue — fail open rather than blocking all
      // traffic because Redis is unreachable.
      console.error('Rate limiter error (failing open):', error);
      next();
    }
  };
}