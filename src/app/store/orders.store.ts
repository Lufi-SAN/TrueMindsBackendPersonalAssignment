import path from 'path';
import { readDB, writeDB } from './connectToDB.js';

const DB_PATH = path.join(process.cwd(), 'src', 'db', 'orders.json')