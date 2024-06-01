-- Active: 1717100521496@@127.0.0.1@3306

CREATE TABLE IF NOT EXISTS users(
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    cpf TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL,
    schooling TEXT NOT NULL,
    age TEXT NOT NULL,
    is_active BOOLEAN NULL DEFAULT(0),
    address TEXT NOT NULL
);

