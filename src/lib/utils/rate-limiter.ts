import type { RateLimitConfig, RateLimitInfo } from '@/lib/types/contact';
import { config } from '@/lib/config';

export class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private windowMs: number;

  constructor(config: RateLimitConfig = { maxRequests: 5, windowMs: 60000 }) {
    this.maxRequests = config.maxRequests;
    this.windowMs = config.windowMs;
  }

  /**
   * 检查请求是否被允许
   */
  checkLimit(): RateLimitInfo {
    const now = Date.now();
    
    // 清理过期的请求记录
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    
    const remaining = Math.max(0, this.maxRequests - this.requests.length);
    const isAllowed = this.requests.length < this.maxRequests;
    
    if (isAllowed) {
      // 记录此次请求
      this.requests.push(now);
    }

    return {
      isAllowed,
      remaining: isAllowed ? remaining - 1 : remaining,
      resetTime: this.getResetTime(),
      retryAfter: this.getRetryAfter()
    };
  }

  /**
   * 获取剩余配额
   */
  getRemainingQuota(): number {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    return Math.max(0, this.maxRequests - this.requests.length);
  }

  /**
   * 获取重置时间（时间戳）
   */
  private getResetTime(): number {
    if (this.requests.length === 0) return 0;
    const oldestRequest = Math.min(...this.requests);
    return oldestRequest + this.windowMs;
  }

  /**
   * 获取重试等待时间（秒）
   */
  private getRetryAfter(): number {
    if (this.requests.length < this.maxRequests) return 0;
    const resetTime = this.getResetTime();
    const waitMs = Math.max(0, resetTime - Date.now());
    return Math.ceil(waitMs / 1000);
  }
}

// 全局速率限制器实例
export const contactRateLimiter = new RateLimiter(config.rateLimit);
