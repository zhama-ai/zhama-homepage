import { NextRequest, NextResponse } from 'next/server';
import { ContactController } from '@/lib/controllers/contact.controller';

const contactController = new ContactController();

export async function POST(request: NextRequest) {
  try {
    const result = await contactController.handleContactSubmission(request);
    
    // 根据结果设置HTTP状态码
    let status = 200;
    if (!result.success) {
      if (result.error?.code === 'RATE_LIMIT_EXCEEDED') {
        status = 429;
      } else if (result.message.includes('必填字段') || result.message.includes('有效的邮箱')) {
        status = 400;
      } else {
        status = 500;
      }
    }

    const response = NextResponse.json(result, { status });
    
    // 添加速率限制响应头（如果是速率限制错误）
    if (result.error?.code === 'RATE_LIMIT_EXCEEDED') {
      const headers = contactController.getRateLimitHeaders();
      Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
    }
    
    return response;
  } catch (error) {
    console.error('Unexpected error in POST handler:', error);
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
