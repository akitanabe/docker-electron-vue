import {
  createConnection,
  ConnectionOptions,
  Connection,
  getMetadataArgsStorage,
} from 'typeorm';

export default class Database {
  connection?: Connection;

  async open(connectionOption: ConnectionOptions): Promise<Database> {
    const connection = await createConnection(connectionOption);

    // テーブル名が定義されていない状態でminifyされるとa,b等の省略されたテーブル名になってしまうので
    // 定義されていなければエラーを発生させる
    if (getMetadataArgsStorage().tables.some(({ name }) => !name)) {
      throw new Error('Entity: table name has not defined');
    }

    this.connection = connection;

    return this;
  }

  async close(): Promise<Database> {
    await this.connection?.close();

    return this;
  }

  static factory(connectionOption: ConnectionOptions): Promise<Database> {
    return new Database().open(connectionOption);
  }
}
