const bookshelf = require('../config/bookshelf');
const Fields = require('bookshelf-schema/lib/fields');

module.exports = bookshelf.model('Student', {
  tableName: 'students',
  uuid: true,
  schema: [
    Fields.StringField('name'),
    Fields.StringField('surname'),
    Fields.StringField('telephone'),
    Fields.StringField('groupId'),
    Fields.StringField('userId')
  ]
});
