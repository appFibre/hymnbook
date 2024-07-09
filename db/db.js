import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const _drizzle = drizzle(new Database('./hymnbook.db'));

export default _drizzle;


