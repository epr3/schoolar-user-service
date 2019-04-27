import deleteQueueStart from './entity_delete_worker';
import createQueueStart from './entity_create_worker';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

(async () => {
  try {
    await createConnection();
    await createQueueStart();
    deleteQueueStart();
    console.log('workers booted');
  } catch (e) {
    console.log('Error while connecting to the database', e);
    return e;
  }
})();
