import { ConnectionOptions, Entity, PrimaryGeneratedColumn } from 'typeorm';
import Database from './database';
import fs from 'fs';

@Entity()
class NoEntityName {
  @PrimaryGeneratedColumn()
  id?: number;
}

const database = 'test.sqlte3';

const connectionOption: ConnectionOptions = {
  type: 'sqlite',
  database,
  entities: [NoEntityName],
};

describe('helpers/Database', function () {
  test('Database.open required Entity name', async () => {
    const database = new Database();

    await expect(database.open(connectionOption)).rejects.toThrow();

    return expect(database.connection).toBe(undefined);
  });

  afterAll(function () {
    fs.unlinkSync(database);
  });
});
