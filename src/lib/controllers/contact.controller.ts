import type { NextRequest } from 'next/server';
import type { ContactFormData, ContactData, ApiResponse } from '@/lib/types/contact';
import { EmailService } from '@/lib/services/email.service';
import { contactRateLimiter } from '@/lib/utils/rate-limiter';
import { config } from '@/lib/config';

export class ContactController {
  private emailService: EmailService | null = null;

  constructor() {
    // EmailService将在需要时延迟初始化
  }

  /**
   * 获取或创建邮件服务实例
   */
  private getEmailService(): EmailService {
    if (!this.emailService) {
      this.emailService = new EmailService();
    }
    return this.emailService;
  }

  /**
   * 处理联系表单提交
   */
  async handleContactSubmission(request: NextRequest): Promise<ApiResponse> {
    try {
      // 速率限制检查
      const rateLimitInfo = contactRateLimiter.checkLimit();
      
      if (!rateLimitInfo.isAllowed) {
        console.log(`[Rate Limit] Request blocked - retry after ${rateLimitInfo.retryAfter}s`);
        
        return {
          success: false,
          message: '请求过于频繁，请稍后再试',
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            retryAfter: rateLimitInfo.retryAfter,
            remaining: rateLimitInfo.remaining,
            limit: config.rateLimit.maxRequests,
            windowMs: config.rateLimit.windowMs
          }
        };
      }
      
      console.log(`[Rate Limit] Request allowed - remaining: ${rateLimitInfo.remaining}`);

      // 解析和验证请求数据
      const formData: ContactFormData = await request.json();
      const validationResult = this.validateContactData(formData);
      
      if (!validationResult.success) {
        return validationResult;
      }

      // 准备联系数据
      const contactData = this.prepareContactData(formData, request);

      // 发送邮件
      const emailService = this.getEmailService();
      await emailService.sendContactEmail(contactData);

      console.log('Contact form submitted and email sent successfully');
      console.log('Contact details:', {
        title: contactData.title,
        email: contactData.email,
        timestamp: contactData.timestamp
      });

      return {
        success: true,
        message: '消息已成功发送，我们会尽快回复您'
      };

    } catch (error) {
      console.error('Contact form submission error:', error);
      
      return {
        success: false,
        message: '服务器内部错误，请稍后重试'
      };
    }
  }

  /**
   * 验证联系表单数据
   */
  private validateContactData(data: ContactFormData): ApiResponse {
    // 验证必填字段
    if (!data.title || !data.email || !data.content) {
      return {
        success: false,
        message: '请填写所有必填字段（标题、邮件、内容）'
      };
    }

    // 验证邮件格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: '请输入有效的邮箱地址'
      };
    }

    return {
      success: true,
      message: '验证通过'
    };
  }

  /**
   * 准备联系数据，添加技术信息
   */
  private prepareContactData(formData: ContactFormData, request: NextRequest): ContactData {
    return {
      title: formData.title.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone?.trim() || '',
      content: formData.content.trim(),
      timestamp: formData.timestamp || new Date().toISOString(),
      userAgent: formData.userAgent || '',
      referrer: formData.referrer || '',
      ip: request.headers.get('x-forwarded-for') || 
           request.headers.get('x-real-ip') || 
           'unknown',
      created: new Date().toISOString()
    };
  }

  /**
   * 获取速率限制信息
   */
  getRateLimitHeaders() {
    const remaining = contactRateLimiter.getRemainingQuota();
    const rateLimitInfo = contactRateLimiter.checkLimit();
    
    return {
      'X-RateLimit-Limit': config.rateLimit.maxRequests.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': Math.ceil(rateLimitInfo.resetTime / 1000).toString(),
      'Retry-After': rateLimitInfo.retryAfter.toString()
    };
  }
}
