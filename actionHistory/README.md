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

3. Start node.js application

## NPM scripts

- `npm run start`: Start node.js application
- `npm run dev`: Start development mode (nodemon)
