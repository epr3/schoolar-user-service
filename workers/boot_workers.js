require('../src/config/bookshelf');
require('../src/models');

const deleteQueueStart = require('./entity_delete_worker');
const createQueueStart = require('./entity_create_worker');

createQueueStart();
deleteQueueStart();
console.log('workers booted');
