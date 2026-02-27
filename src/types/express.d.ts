import "express";

declare module "express-serve-static-core" {
  interface Request {
    validated?: Record<string, any>,
    rateLimit?: {
      limit: number;
      used: number;
      remaining: number;
      resetTime: Date;
    };
  }
}
