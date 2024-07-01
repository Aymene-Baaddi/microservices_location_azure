#!/bin/bash
set -e

echo "Starting init script..."

# Wait for MySQL to be ready
until mysql -h "localhost" -u root -p"$MYSQL_ROOT_PASSWORD" -e "SELECT 1"; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "MySQL is up - executing command"

mysql -u root -p"$MYSQL_ROOT_PASSWORD" <<EOSQL
    CREATE DATABASE IF NOT EXISTS voiture;
    CREATE DATABASE IF NOT EXISTS user;
    CREATE DATABASE IF NOT EXISTS admin;
    CREATE DATABASE IF NOT EXISTS favoris;
    CREATE DATABASE IF NOT EXISTS reservation;
    GRANT ALL PRIVILEGES ON voiture.* TO 'root'@'%';
    GRANT ALL PRIVILEGES ON user.* TO 'root'@'%';
    GRANT ALL PRIVILEGES ON admin.* TO 'root'@'%';
    GRANT ALL PRIVILEGES ON favoris.* TO 'root'@'%';
    GRANT ALL PRIVILEGES ON reservation.* TO 'root'@'%';
    FLUSH PRIVILEGES;
    USE user;
    CREATE TABLE IF NOT EXISTS users (id BIGINT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255));
    INSERT INTO users (name) VALUES ('John Doe'), ('Jane Doe');
EOSQL

echo "Init script completed."
