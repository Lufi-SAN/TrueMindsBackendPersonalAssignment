import { type Request } from "express";

export function buildMeta(req: Request) : metaType {
    return {
        timestamp: new Date().toISOString(),
        rate_limit: req.rateLimit ? req.rateLimit : {},
        api_version: req.baseUrl.split('/')[1] || 'unknown'
    };
}

export interface metaType {
    timestamp: string;
    rate_limit: Record<string, any> | {};
    api_version: string;
}