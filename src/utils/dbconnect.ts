import { createConnection, Connection } from 'typeorm';
import connectionOption from '@/ormconfig';

export default function dbconnect(): Promise<Connection> {
  return createConnection(connectionOption);
}
