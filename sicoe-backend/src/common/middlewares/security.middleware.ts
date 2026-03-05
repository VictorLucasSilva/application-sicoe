import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    res.removeHeader('X-Powered-By');


    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');


    res.setHeader('X-API-Version', '1.0.0');


    this.detectSuspiciousActivity(req);

    next();
  }


  private detectSuspiciousActivity(req: Request): void {
    const suspiciousPatterns = [

      /(\bOR\b|\bAND\b).*=.*('|")/i,
      /union.*select/i,
      /drop\s+table/i,
      /insert\s+into/i,
      /delete\s+from/i,

      // XSS patterns
      /<script[^>]*>.*?<\/script>/i,
      /javascript:/i,
      /onerror\s*=/i,
      /onload\s*=/i,

      // Path traversal
      /\.\.\//,
      /\.\.\\/,

      // Command injection
      /;\s*(cat|ls|pwd|whoami|id|uname)/i,
    ];

    const checkString = JSON.stringify(req.body) + JSON.stringify(req.query) + req.url;

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(checkString)) {
        console.warn('[SECURITY] Suspicious activity detected', {
          ip: req.ip,
          url: req.url,
          method: req.method,
          pattern: pattern.toString(),
          userAgent: req.get('user-agent'),
        });
        break;
      }
    }
  }
}
