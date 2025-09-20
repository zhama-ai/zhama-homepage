export interface ContactFormData {
  title: string;
  email: string;
  phone: string;
  content: string;
  timestamp: string;
  userAgent?: string;
  referrer?: string;
}

export interface ContactData extends ContactFormData {
  ip: string;
  created: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    code: string;
    retryAfter?: number;
    remaining?: number;
    limit?: number;
    windowMs?: number;
  };
}

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export interface RateLimitInfo {
  isAllowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter: number;
}
