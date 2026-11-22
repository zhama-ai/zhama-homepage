import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const projectRoot = fileURLToPath(new URL('../../', import.meta.url));

export function loadContactConfig(env) {
  if (!env) {
    const localFile = path.join(projectRoot, '.env.contact.local');
    if (existsSync(localFile)) loadEnvFile(localFile);
    env = process.env;
  }
  const integer = (key, fallback, min, max) => {
    const value = Number(env[key] || fallback);
    if (!Number.isInteger(value) || value < min || value > max) throw new Error(`Invalid ${key}`);
    return value;
  };
  const boolean = (key, fallback) => {
    if (env[key] === undefined || env[key] === '') return fallback;
    if (!['true', 'false'].includes(env[key])) throw new Error(`Invalid ${key}`);
    return env[key] === 'true';
  };
  const defaultOrigins = ['https://www.zhama.com', 'https://zhama.com'];
  if (env.NODE_ENV !== 'production') defaultOrigins.push('http://127.0.0.1:4350', 'http://localhost:4350');
  const origins = new Set((env.CONTACT_ALLOWED_ORIGINS || defaultOrigins.join(',')).split(',').map(value => {
    try {
      const url = new URL(value.trim());
      if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw new Error();
      return url.origin;
    } catch { throw new Error('Invalid CONTACT_ALLOWED_ORIGINS'); }
  }));
  const dataDir = path.resolve(projectRoot, env.CONTACT_DATA_DIR || '.contact-data');
  for (const directory of ['public', 'dist']) {
    const relative = path.relative(path.join(projectRoot, directory), dataDir);
    if (!relative || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative))) throw new Error('Invalid CONTACT_DATA_DIR');
  }
  if (dataDir === path.resolve(projectRoot)) throw new Error('Invalid CONTACT_DATA_DIR');
  const recipients = [...new Set(`${env.CONTACT_EMAIL || 'contact@zhama.com'},${env.CONTACT_EXTRA_EMAIL || ''}`.split(/[,;]/).map(value => value.trim().toLowerCase()).filter(Boolean))];
  if (recipients.some(value => !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value))) throw new Error('Invalid contact recipient');
  const port = integer('SMTP_PORT', 587, 1, 65535);
  return {
    host: env.CONTACT_HOST || '127.0.0.1',
    port: integer('CONTACT_PORT', 4351, 1, 65535),
    dataDir,
    origins,
    trustProxy: boolean('CONTACT_TRUST_PROXY', false),
    rateLimit: { max: integer('RATE_LIMIT_MAX', 5, 1, 1000), windowMs: integer('RATE_LIMIT_WINDOW', 60000, 1000, 3600000) },
    recipients,
    smtp: {
      host: env.SMTP_HOST || '', port,
      secure: boolean('SMTP_SECURE', port === 465),
      user: env.SMTP_USER || '', pass: env.SMTP_PASS || '',
      from: env.SMTP_FROM || env.SMTP_USER || '',
    },
    feishu: {
      enabled: boolean('FEISHU_ENABLED', Boolean(env.FEISHU_APP_ID || env.FEISHU_APP_SECRET)),
      appId: env.FEISHU_APP_ID || '', appSecret: env.FEISHU_APP_SECRET || '',
      chatId: env.FEISHU_CHAT_ID || '',
    },
  };
}

export function configurationStatus(config) {
  return {
    email: Boolean(config.smtp.host && config.smtp.user && config.smtp.pass && config.smtp.from),
    feishu: !config.feishu.enabled || Boolean(config.feishu.appId && config.feishu.appSecret && config.feishu.chatId),
  };
}
