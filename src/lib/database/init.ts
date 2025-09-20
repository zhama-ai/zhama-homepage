import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

export interface ContactRecord {
  id: string;
  title: string;
  email: string;
  phone: string;
  content: string;
  timestamp: string;
  userAgent: string;
  referrer: string;
  ip: string;
  created: string;
}

let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (!db) {
    // 确保数据库目录存在
    const dataDir = path.join(process.cwd(), 'data');
    const dbPath = path.join(dataDir, 'database.sqlite');
    
    // 创建 data 目录（如果不存在）
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    db = new Database(dbPath);
    
    // 创建 contacts 表
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS contacts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT DEFAULT '',
        content TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        userAgent TEXT DEFAULT '',
        referrer TEXT DEFAULT '',
        ip TEXT DEFAULT '',
        created TEXT NOT NULL
      )
    `;
    
    db.exec(createTableSQL);
    
    // 创建索引提升查询性能
    const createIndexes = `
      CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
      CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created);
      CREATE INDEX IF NOT EXISTS idx_contacts_timestamp ON contacts(timestamp);
    `;
    
    db.exec(createIndexes);
    
    // 启用外键约束
    db.pragma('foreign_keys = ON');
  }
  
  return db;
}

export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
  }
}

// 优雅关闭数据库连接
process.on('exit', closeDatabase);
process.on('SIGINT', () => {
  closeDatabase();
  process.exit(0);
});
process.on('SIGTERM', () => {
  closeDatabase();
  process.exit(0);
});
