import { createConnection } from 'typeorm';

export function connect() {
  return createConnection();
}
