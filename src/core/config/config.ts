import * as process from 'process';
import { IConfig } from './interface/config.interface';

export const config = (): IConfig => ({
  port: process.env.PORT,
  rabbitUrl: process.env.RABBITMQ_URL,
  db: process.env.DATABASE_URL,
});
