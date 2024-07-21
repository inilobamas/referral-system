import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
});