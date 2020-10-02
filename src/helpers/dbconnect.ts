import { createConnection, Connection, getMetadataArgsStorage } from 'typeorm';
import connectionOption from '@/ormconfig';

export default function dbconnect(): Promise<Connection> {
  const connect = createConnection(connectionOption);

  // テーブル名が定義されていない状態でminifyされるとa,b等の省略されたテーブル名になってしまうので
  // 定義されていなければエラーを発生させる
  if (
    getMetadataArgsStorage().tables.some((table) => table.name !== undefined)
  ) {
    throw new Error('Entity: table name has not defined');
  }

  return connect;
}
