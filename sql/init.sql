-- init.sql

-- create user 
CREATE USER "mohamad" WITH ENCRYPTED PASSWORD "mohamad";

-- create database 
CREATE DATABASE "auth" WITH OWNER "mohamad";

-- All access for the user
GRANT ALL PRIVILEGES ON DATABASE "auth" TO "mohamad";
