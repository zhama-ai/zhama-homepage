import { getDatabase, ContactRecord } from './init';

export class ContactsDB {
  private db: ReturnType<typeof getDatabase>;
  
  constructor() {
    this.db = getDatabase();
  }
  
  // 插入新的联系记录
  insert(contact: Omit<ContactRecord, 'id'>): string {
    // 生成唯一ID
    const id = Math.random().toString(36).substring(2, 8);
    
    const insertStmt = this.db.prepare(`
      INSERT INTO contacts (
        id, title, email, phone, content, timestamp, 
        userAgent, referrer, ip, created
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = insertStmt.run(
      id,
      contact.title,
      contact.email,
      contact.phone,
      contact.content,
      contact.timestamp,
      contact.userAgent,
      contact.referrer,
      contact.ip,
      contact.created
    );
    
    if (result.changes === 0) {
      throw new Error('Failed to insert contact record');
    }
    
    return id;
  }
  
  // 根据ID查询联系记录
  findById(id: string): ContactRecord | null {
    const selectStmt = this.db.prepare('SELECT * FROM contacts WHERE id = ?');
    const result = selectStmt.get(id) as ContactRecord | undefined;
    return result || null;
  }
  
  // 根据邮箱查询联系记录
  findByEmail(email: string): ContactRecord[] {
    const selectStmt = this.db.prepare('SELECT * FROM contacts WHERE email = ? ORDER BY created DESC');
    return selectStmt.all(email) as ContactRecord[];
  }
  
  // 获取所有联系记录（支持分页）
  findAll(limit: number = 100, offset: number = 0): ContactRecord[] {
    const selectStmt = this.db.prepare('SELECT * FROM contacts ORDER BY created DESC LIMIT ? OFFSET ?');
    return selectStmt.all(limit, offset) as ContactRecord[];
  }
  
  // 获取记录总数
  count(): number {
    const countStmt = this.db.prepare('SELECT COUNT(*) as count FROM contacts');
    const result = countStmt.get() as { count: number };
    return result.count;
  }
  
  // 根据时间范围查询
  findByDateRange(startDate: string, endDate: string): ContactRecord[] {
    const selectStmt = this.db.prepare(
      'SELECT * FROM contacts WHERE created BETWEEN ? AND ? ORDER BY created DESC'
    );
    return selectStmt.all(startDate, endDate) as ContactRecord[];
  }
  
  // 删除记录（根据ID）
  deleteById(id: string): boolean {
    const deleteStmt = this.db.prepare('DELETE FROM contacts WHERE id = ?');
    const result = deleteStmt.run(id);
    return result.changes > 0;
  }
  
  // 更新记录
  update(id: string, updates: Partial<Omit<ContactRecord, 'id'>>): boolean {
    const fields = Object.keys(updates);
    if (fields.length === 0) {
      return false;
    }
    
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const values = fields.map(field => updates[field as keyof typeof updates]);
    
    const updateStmt = this.db.prepare(`UPDATE contacts SET ${setClause} WHERE id = ?`);
    const result = updateStmt.run(...values, id);
    return result.changes > 0;
  }
}

// 导出单例实例
export const contactsDB = new ContactsDB();
