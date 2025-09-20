import { NextRequest, NextResponse } from 'next/server';
import { contactsDB } from '@/lib/database/contacts';

// 速率限制器
class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 5, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(): boolean {
    const now = Date.now();
    
    // 清理过期的请求记录
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    
    // 检查是否超过限制
    if (this.requests.length >= this.maxRequests) {
      return false;
    }
    
    // 记录此次请求
    this.requests.push(now);
    return true;
  }

  getRemainingQuota(): number {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    return Math.max(0, this.maxRequests - this.requests.length);
  }

  getResetTime(): number {
    if (this.requests.length === 0) return 0;
    const oldestRequest = Math.min(...this.requests);
    return oldestRequest + this.windowMs;
  }

  getRetryAfter(): number {
    if (this.requests.length < this.maxRequests) return 0;
    const resetTime = this.getResetTime();
    const waitMs = Math.max(0, resetTime - Date.now());
    return Math.ceil(waitMs / 1000);
  }
}

// Contact API 速率限制器 - 每分钟5个请求
const contactRateLimiter = new RateLimiter(100, 60000);

interface ContactData {
  title: string;
  email: string;
  phone: string;
  content: string;
  timestamp: string;
  userAgent?: string;
  referrer?: string;
}

export async function POST(request: NextRequest) {
  try {
    // 速率限制检查
    if (!contactRateLimiter.isAllowed()) {
      const retryAfter = contactRateLimiter.getRetryAfter();
      const remaining = contactRateLimiter.getRemainingQuota();
      const resetTime = Math.ceil(contactRateLimiter.getResetTime() / 1000);
      
      console.log(`[Rate Limit] Request blocked - retry after ${retryAfter}s`);
      
      const response = NextResponse.json(
        {
          success: false,
          message: '请求过于频繁，请稍后再试',
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            retryAfter: retryAfter,
            remaining: remaining,
            limit: 5,
            windowMs: 60000
          }
        },
        { status: 429 }
      );
      
      // 添加速率限制响应头
      response.headers.set('X-RateLimit-Limit', '5');
      response.headers.set('X-RateLimit-Remaining', remaining.toString());
      response.headers.set('X-RateLimit-Reset', resetTime.toString());
      response.headers.set('Retry-After', retryAfter.toString());
      
      return response;
    }
    
    console.log(`[Rate Limit] Request allowed - remaining: ${contactRateLimiter.getRemainingQuota()}`);

    // 解析请求数据
    const body: ContactData = await request.json();
    
    // 验证必填字段
    if (!body.title || !body.email || !body.content) {
      return NextResponse.json(
        { 
          success: false, 
          message: '请填写所有必填字段（标题、邮件、内容）' 
        },
        { status: 400 }
      );
    }

    // 验证邮件格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: '请输入有效的邮箱地址' 
        },
        { status: 400 }
      );
    }

    // 准备保存的数据
    const contactData = {
      title: body.title.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || '',
      content: body.content.trim(),
      timestamp: body.timestamp || new Date().toISOString(),
      userAgent: body.userAgent || '',
      referrer: body.referrer || '',
      ip: request.headers.get('x-forwarded-for') || 
           request.headers.get('x-real-ip') || 
           'unknown',
      created: new Date().toISOString()
    };

    // 保存到SQLite数据库
    const contactId = contactsDB.insert(contactData);

    console.log(`Contact form submitted and saved to database with ID: ${contactId}`);
    console.log('Contact details:', {
      id: contactId,
      title: contactData.title,
      email: contactData.email,
      timestamp: contactData.timestamp
    });

    return NextResponse.json(
      { 
        success: true, 
        message: '消息已成功提交，我们会尽快回复您',
        id: contactId
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: '服务器内部错误，请稍后重试' 
      },
      { status: 500 }
    );
  }
}

// 不支持其他HTTP方法
export async function GET() {
  return NextResponse.json(
    { message: '此接口仅支持POST请求' }, 
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: '此接口仅支持POST请求' }, 
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: '此接口仅支持POST请求' }, 
    { status: 405 }
  );
}
