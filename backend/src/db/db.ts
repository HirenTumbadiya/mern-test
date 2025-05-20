import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let client: Client | null = null;

export const getDbClient = (): Client => {
  if (client) {
    return client;
  }
  client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  client.connect();

  return client;
};