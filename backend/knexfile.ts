import path from 'path';

module.exports = {
    client: 'postgresql',
    connection: {
      database: 'challenge',
      port: 5432,
      user: 'postgres',
      password: 'passwd'
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,

    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    }
}
