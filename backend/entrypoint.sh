#!/bin/bash
set -e

# Wait for the database to be ready (adjust for your DB, e.g., PostgreSQL)
until npx sequelize-cli db:migrate:status; do
  echo "Waiting for database to be ready..."
  sleep 2
done

# Run database commands
npx sequelize-cli db:drop
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# Start the application
exec npm start