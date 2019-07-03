// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    useNullAsDefault: true,
    debug: true,
    connection: {
      host: 'db',
      user: 'root',
      password: '',
      database: 'users'
      // filename: '/database/db.sqlite'
    }
    // pool: {
    //   afterCreate: (conn, cb) => {
    //     conn.run('PRAGMA foreign_keys = ON', cb);
    //   }
    // }
  }
};
