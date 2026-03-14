// Database connection utilities for Astro project with Hostinger support

/**
 * Initialize database connection
 * @param {string} type - Database type (sqlite, mysql, postgres)
 * @param {object} config - Connection configuration
 * @returns {object} - Database connection object
 */
export async function initDatabase(type = 'sqlite', config = {}) {
  try {
    switch (type) {
      case 'sqlite':
        return await initSQLite(config);
      case 'mysql':
        return await initMySQL(config);
      case 'postgres':
        return await initPostgreSQL(config);
      default:
        throw new Error('Unsupported database type');
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

/**
 * Initialize SQLite connection
 * @param {object} config - SQLite configuration
 * @returns {object} - SQLite connection object
 */
async function initSQLite(config) {
  // For Hostinger, we'll use a local file-based approach with proper permissions
  const dbPath = config.path || './db/therapy.db';
  
  // In a real implementation with Astro, you would initialize the SQLite database here
  console.log('Initializing SQLite database at:', dbPath);
  
  return {
    path: dbPath,
    type: 'sqlite',
    connected: true,
    
    async query(sql, params = []) {
      // Mock query function - implement actual SQLite operations
      console.log('Executing SQL:', sql, 'with params:', params);
      return { rows: [], affectedRows: 0 };
    },
    
    async close() {
      // Close database connection
      console.log('SQLite connection closed');
    }
  };
}

/**
 * Initialize MySQL connection
 * @param {object} config - MySQL configuration
 * @returns {object} - MySQL connection object
 */
async function initMySQL(config) {
  // For Hostinger cPanel, this would use connection details from environment variables
  const host = process.env.MYSQL_HOST || config.host;
  const port = process.env.MYSQL_PORT || config.port || 3306;
  const user = process.env.MYSQL_USER || config.user;
  const password = process.env.MYSQL_PASSWORD || config.password;
  const database = process.env.MYSQL_DATABASE || config.database;
  
  // In a real implementation, you would use mysql2 or similar library
  console.log('Initializing MySQL connection to:', database);
  
  return {
    host,
    port,
    user,
    password,
    database,
    type: 'mysql',
    connected: true,
    
    async query(sql, params = []) {
      // Mock query function - implement actual MySQL operations
      console.log('Executing MySQL SQL:', sql, 'with params:', params);
      return { rows: [], affectedRows: 0 };
    },
    
    async close() {
      // Close database connection
      console.log('MySQL connection closed');
    }
  };
}

/**
 * Initialize PostgreSQL connection
 * @param {object} config - PostgreSQL configuration
 * @returns {object} - PostgreSQL connection object
 */
async function initPostgreSQL(config) {
  // For Hostinger cPanel, this would use connection details from environment variables
  const host = process.env.POSTGRES_HOST || config.host;
  const port = process.env.POSTGRES_PORT || config.port || 5432;
  const user = process.env.POSTGRES_USER || config.user;
  const password = process.env.POSTGRES_PASSWORD || config.password;
  const database = process.env.POSTGRES_DATABASE || config.database;
  
  // In a real implementation, you would use pg library
  console.log('Initializing PostgreSQL connection to:', database);
  
  return {
    host,
    port,
    user,
    password,
    database,
    type: 'postgres',
    connected: true,
    
    async query(sql, params = []) {
      // Mock query function - implement actual PostgreSQL operations
      console.log('Executing PostgreSQL SQL:', sql, 'with params:', params);
      return { rows: [], affectedRows: 0 };
    },
    
    async close() {
      // Close database connection
      console.log('PostgreSQL connection closed');
    }
  };
}

/**
 * Create required tables for the therapy website
 * @param {object} db - Database connection object
 */
export async function createTables(db) {
  const tables = {
    posts: `
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        author TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        published BOOLEAN DEFAULT FALSE
      )
    `,
    
    contacts: `
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `
  };
  
  for (const [tableName, sql] of Object.entries(tables)) {
    try {
      await db.query(sql);
      console.log(`Table ${tableName} created successfully`);
    } catch (error) {
      console.error(`Error creating table ${tableName}:`, error);
    }
  }
}