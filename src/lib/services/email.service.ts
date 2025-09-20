import nodemailer from 'nodemailer';
import type { ContactData } from '@/lib/types/contact';
import { config, isSmtpConfigured } from '@/lib/config';

export class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    // 延迟初始化，避免构建时检查环境变量
  }

  /**
   * 获取或创建传输器
   */
  private getTransporter(): nodemailer.Transporter {
    if (!this.transporter) {
      if (!isSmtpConfigured) {
        throw new Error('SMTP configuration is incomplete. Please check your environment variables: SMTP_USER, SMTP_PASS');
      }

      this.transporter = nodemailer.createTransport({
        host: config.email.smtp.host,
        port: config.email.smtp.port,
        secure: config.email.smtp.secure,
        auth: {
          user: config.email.smtp.user,
          pass: config.email.smtp.pass
        }
      });
    }
    
    return this.transporter;
  }

  /**
   * 发送联系表单邮件到指定邮箱
   */
  async sendContactEmail(contactData: ContactData, targetEmail?: string): Promise<void> {
    const transporter = this.getTransporter(); // 延迟获取传输器
    const emailContent = this.formatContactEmail(contactData);
    const recipient = targetEmail || config.email.targetEmail;
    
    const mailOptions = {
      from: config.email.smtp.from,
      to: recipient,
      subject: `[联系表单] ${contactData.title}`,
      text: emailContent,
      replyTo: contactData.email
    };

    await transporter.sendMail(mailOptions);
  }

  /**
   * 格式化联系表单邮件内容
   */
  private formatContactEmail(contactData: ContactData): string {
    return `
新的联系表单提交

标题: ${contactData.title}
发件人邮箱: ${contactData.email}
电话: ${contactData.phone || '未提供'}
提交时间: ${new Date(contactData.timestamp).toLocaleString('zh-CN')}

内容:
${contactData.content}

--
技术信息:
IP地址: ${contactData.ip}
用户代理: ${contactData.userAgent}
来源页面: ${contactData.referrer}
    `.trim();
  }

  /**
   * 验证SMTP配置
   */
  async verifyConnection(): Promise<boolean> {
    try {
      const transporter = this.getTransporter();
      await transporter.verify();
      return true;
    } catch (error) {
      console.error('SMTP connection failed:', error);
      return false;
    }
  }
}
