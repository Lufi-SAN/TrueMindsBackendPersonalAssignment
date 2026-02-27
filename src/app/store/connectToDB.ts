import fs from 'fs/promises'

export async function readDB(DB_PATH: string) {
  const raw = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

export async function writeDB(DB_PATH : string , data: Record<string, any>) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  return true
}