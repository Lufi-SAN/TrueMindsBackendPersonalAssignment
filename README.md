[Uploading README (1).md…]()
# TrueMinds Backend Personal Assignment

A simple Node.js + Express backend written in TypeScript that uses a
JSON file as its database.

This project is designed to run locally with **no external services**
--- no Redis, no PostgreSQL, no cloud connections. Everything runs using
local JSON storage.

------------------------------------------------------------------------

## Tech Stack

-   Node.js
-   Express
-   TypeScript
-   JSON file as database

------------------------------------------------------------------------

## Requirements

Make sure you have the following installed:

-   **Node.js** (v18 or newer recommended)
-   **npm**

No `.env` file is required.\
No external database is required.

------------------------------------------------------------------------

## Installation & Setup

1.  Clone the repository:

    git clone
    https://github.com/Lufi-SAN/TrueMindsBackendPersonalAssignment.git
    cd TrueMindsBackendPersonalAssignment

2.  Install dependencies:

    npm install

3.  Build the TypeScript project:

    npm run build

4.  Start the server:

    npm start

The server will run on:

http://localhost:3000

------------------------------------------------------------------------

## Development (Optional)

If you want to run directly without building each time:

npx ts-node src/index.ts

This is helpful during development but not required for testing.

------------------------------------------------------------------------

## Project Structure

src/ ├── index.ts \# Entry point\
├── routes/ \# Express route definitions\
├── controllers/ \# Request handlers\
├── services/ \# Business logic\
├── store/ \# JSON data access logic

Compiled output is generated into:

dist/

------------------------------------------------------------------------

## Database

This project uses a local JSON file as its database.

There is: - No real database engine - No migrations - No ORM

Data is read from and written directly to JSON files inside the project.

### Important Notes

-   Data persists between server restarts.
-   There is no automatic reset.
-   Concurrent writes may cause data corruption (limitation of
    file-based storage).
-   JSON files must remain valid or the server will fail to parse them.

------------------------------------------------------------------------

## API Endpoints

Endpoints are defined in the `routes/` directory.

You can test endpoints using:

-   Postman
-   Insomnia
-   curl

Example:

curl http://localhost:3000/users

Refer to the route files for exact paths and request body structures.

------------------------------------------------------------------------

## Known Limitations

-   No environment configuration support
-   No request validation library
-   No authentication middleware
-   No rate limiting
-   No test suite
-   JSON writes are not atomic

This project is intended for demonstration and local testing purposes
only.

------------------------------------------------------------------------

## Possible Improvements

If extending this project, consider adding:

-   Request validation (Zod or Joi)
-   Swagger/OpenAPI documentation
-   Unit and integration tests
-   Database abstraction layer
-   Proper error handling middleware
-   Docker setup
-   Seed/reset script for JSON database

------------------------------------------------------------------------

## License

Add your preferred license here (MIT is common for personal projects).
