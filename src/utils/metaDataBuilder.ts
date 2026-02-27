import { type Request } from "express";

export function buildMeta(req: Request) {
    return {
        timestamp: new Date().toISOString(),
        rate_limit: req.rateLimit ? req.rateLimit : {},
        api_version: req.baseUrl.split('/')[1] || 'unknown'
    };
}
