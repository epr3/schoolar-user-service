const bookshelf = require('../config/bookshelf');
const Fields = require('bookshelf-schema/lib/fields');

module.exports = bookshelf.model('Professor', {
  tableName: 'professors',
  uuid: true,
  schema: [
    Fields.StringField('name'),
    Fields.StringField('surname'),
    Fields.StringField('telephone'),
    Fields.StringField('title'),
    Fields.StringField('userId')
  ]
});
