import { ConnectionOptions } from 'typeorm';
import { entities } from '@/entity';

const isDevelopment = process.env.NODE_ENV !== 'production';

const connectionOption: ConnectionOptions = {
  type: 'sqlite',
  database: 'database.sqlite3',
  synchronize: true,
  logging: isDevelopment,
  logger: 'simple-console',
  entities,
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};

export default connectionOption;
