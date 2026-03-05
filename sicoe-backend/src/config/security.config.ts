import { ConfigService } from '@nestjs/config';

export const getHelmetConfig = () => ({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", 'https:', 'data:'],
      formAction: ["'self'"],
      frameAncestors: ["'self'", 'http://localhost:5173', 'http://localhost:3000'],
      imgSrc: ["'self'", 'data:', 'https:'],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'"],
      scriptSrcAttr: ["'none'"],
      styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: { policy: 'same-origin' as const },
  crossOriginResourcePolicy: { policy: 'cross-origin' as const },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: 'sameorigin' as const },
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  ieNoOpen: true,
  noSniff: true,
  originAgentCluster: true,
  permittedCrossDomainPolicies: { permittedPolicies: 'none' as const },
  referrerPolicy: { policy: 'no-referrer' as const },
  xssFilter: true,
});

export const getThrottlerConfig = (configService: ConfigService) => ([
  {
    ttl: configService.get<number>('THROTTLE_TTL', 60) * 1000,
    limit: configService.get<number>('THROTTLE_LIMIT', 10),
  },
]);

export const getCorsConfig = (configService: ConfigService) => ({
  origin: configService.get<string>('CORS_ORIGIN', 'http://localhost:5173'),
  credentials: configService.get<boolean>('CORS_CREDENTIALS', true),
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
