import 'reflect-metadata';
import {DataSource} from 'typeorm';
import SportEvents from './models/SportsEvents';
import User from './models/User';
import dbConfig from './config/db';

const connConfigs = dbConfig.dbConfig;
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: connConfigs.DB_HOST,
  port: parseInt(connConfigs.DB_PORT, 10) || 5432,
  username: connConfigs.DB_USER,
  password: connConfigs.DB_PASS,
  database: connConfigs.DB_NAME,

  synchronize: process.env.NODE_ENV === 'dev' ? false : false,
  logging: process.env.NODE_ENV === 'dev' ? false : false,
  entities: [SportEvents, User]
});
