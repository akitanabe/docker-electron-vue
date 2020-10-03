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
  test('Database.open required Entity name', () => {
    const database = new Database();

    return expect(database.open(connectionOption)).rejects.toThrow();
  });

  afterAll(function () {
    fs.unlinkSync(database);
  });
});
