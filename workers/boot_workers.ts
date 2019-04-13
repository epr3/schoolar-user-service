import { queueStart } from './entity_delete_worker';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

(async () => {
  try {
    await createConnection();
    queueStart();
    console.log('workers booted');
  } catch (e) {
    console.log('Error while connecting to the database', e);
    return e;
  }
})();
