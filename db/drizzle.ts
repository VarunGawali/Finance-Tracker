import { neon } from '@neondatabase/serverless';
import { drizzle} from 'drizzle-orm/neon-http';
import * as schema from './schema';

export const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql as any, {schema});

const accounts2 = db.select().from(schema.accounts)
const categories2 = db.select().from(schema.categories)


