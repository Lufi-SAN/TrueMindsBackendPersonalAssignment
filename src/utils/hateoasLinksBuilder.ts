import { type Request } from "express";

export function buildLinks(req: Request, linksConfig: { rel: string; path: string; method: string }[] | []) {
    const selfUrl = `${req.baseUrl}${req.path}`;
    if (linksConfig.length === 0) {
        return { self : { href: selfUrl, rel: 'self', method: req.method.toUpperCase() } }
    }
    return linksConfig.reduce((acc, link) => {
        acc[link.rel] = {
            href: link.path,
            rel: link.rel,
            method: link.method
        };
        return acc;
    }, { self : { href: selfUrl, rel: 'self', method: req.method.toUpperCase() } } as Record<string, { href: string; rel: string; method: string }>);
}

 