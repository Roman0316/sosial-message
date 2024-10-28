## Deployment

1. Install dependencies `npm install`

2. You must ensure that the application has access to the following environment variables:

API_PORT - Port number on which the API server should listen for incoming requests.

#DATABASE
PGUSER - Username used to authenticate with the PostgreSQL database.
PGPASSWORD - Password used for authentication when connecting to the PostgreSQL database.
PGDATABASE - Name of the PostgreSQL database to connect to.
PGHOST - Hostname or IP address of the server where the PostgreSQL database is located.
PGPORT - Port number on which the PostgreSQL database server is listening for connections.
POSTGRES_PASSWORD - Only used in docker-compose options. Sets the password for the PostgreSQL database. Must match PGPASSWORD.

#SEEDERS
ADMIN_FIRST_NAME - First name for the default admin account.
ADMIN_LAST_NAME - Last name for the default admin account.
ADMIN_EMAIL - Email address for the default admin account.
ADMIN_PASSWORD - Password for the default admin account.

#JWT
JWT_ACCESS_SECRET_KEY - Secret key used to generate JWT (JSON Web Token) access tokens, providing secure access control.

#S3 minio
S3_ACCESS_KEY_ID - Access key for authentication with the Minio S3-compatible storage service.
S3_SECRET_KEY - Secret key for authentication with the Minio S3-compatible storage service.
S3_BUCKET_NAME - Name of the storage bucket within Minio.
S3_EXTERNAL_ENDPOINT - External URL or endpoint for accessing the Minio service.

3. Run database migration
4. Create the first admin
5. Start node.js application

## NPM scripts

- `npm run start`: Start node.js application
- `npm run dev`: Start development mode (nodemon)
- `npm run migrate:run`: Run all migrations
- `npm run migrate:undo`: Rollback the last migration
- `npm run migrate:undo:all`: Rollback all migrations
- `npm run migration:create`: Create a new migration
- `npm run seed:admin`: Create the first admin
