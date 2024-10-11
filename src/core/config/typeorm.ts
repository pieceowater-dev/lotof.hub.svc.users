import { config as dotenvConfig } from 'dotenv';
import { config } from './config';
import { DataSource } from 'typeorm';
import * as path from 'path';

dotenvConfig({ path: '.env' });

const cfg = config();

export default new DataSource({
  type: 'postgres',
  url: cfg.db,
  entities: [path.join(__dirname, '/../../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '/../../**/*-migrations{.ts,.js}')],
});
