/**
 * 应用配置管理
 * 集中管理所有环境变量和配置项
 */

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
}

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export interface EmailConfig {
  targetEmail: string;
  smtp: SmtpConfig;
}

export interface AppConfig {
  nodeEnv: string;
  port: number;
  email: EmailConfig;
  rateLimit: RateLimitConfig;
}

/**
 * 从环境变量中读取配置
 */
function loadConfig(): AppConfig {
  // 验证必需的环境变量
  const requiredEnvVars = ['SMTP_USER', 'SMTP_PASS'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn(`Warning: Missing required environment variables: ${missingVars.join(', ')}`);
    console.warn('Email functionality may not work properly');
  }

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    
    email: {
      targetEmail: process.env.CONTACT_EMAIL || 'contact@zhama.com',
      smtp: {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
        from: process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@zhama.com'
      }
    },
    
    rateLimit: {
      maxRequests: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '60000', 10)
    }
  };
}

/**
 * 验证SMTP配置是否完整
 */
function validateSmtpConfig(smtp: SmtpConfig): boolean {
  return !!(smtp.host && smtp.port && smtp.user && smtp.pass);
}

// 导出配置实例
export const config = loadConfig();

// 验证配置
export const isSmtpConfigured = validateSmtpConfig(config.email.smtp);

// 开发环境下打印配置信息（敏感信息脱敏）
if (config.nodeEnv === 'development') {
  console.log('📋 App Configuration:');
  console.log(`  Environment: ${config.nodeEnv}`);
  console.log(`  Port: ${config.port}`);
  console.log(`  Contact Email: ${config.email.targetEmail}`);
  console.log(`  SMTP Host: ${config.email.smtp.host}:${config.email.smtp.port}`);
  console.log(`  SMTP User: ${config.email.smtp.user ? `${config.email.smtp.user.substring(0, 3)}***` : 'Not configured'}`);
  console.log(`  SMTP Configured: ${isSmtpConfigured ? '✅' : '❌'}`);
  console.log(`  Rate Limit: ${config.rateLimit.maxRequests} requests per ${config.rateLimit.windowMs}ms`);
}

export default config;
