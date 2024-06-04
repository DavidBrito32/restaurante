-- Active: 1717100521496@@127.0.0.1@3306

-- TABELA DE USUARIOS DA DASHBOARD (ROTAS DO CLIENTE)
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
-- -----------------------------------------
-- TABELA DE CLIENTES
CREATE TABLE IF NOT EXISTS client(
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    cpf TEXT NOT NULL UNIQUE,
    date_of_birth DATE NULL,
    role TEXT NOT NULL
);



-- TABELA DE ENDEREÇO DE CLIENTES
CREATE TABLE IF NOT EXISTS address(
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    street TEXT NOT NULL,
    house_number INTEGER NOT NULL,
    district TEXT NOT NULL,
    city TEXT NOT NULL,
    complement TEXT NULL,
    zip_code TEXT NOT NULL,
    client_id TEXT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES client(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- TABELA DE CARTÃO DE CREDITO DE CLIENTES
CREATE TABLE IF NOT EXISTS payment_cards (
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    client_id TEXT NOT NULL UNIQUE,
    number_card INTEGER NOT NULL UNIQUE,
    method TEXT NOT NULL,
    expires_in TEXT NOT NULL,
    cvv TEXT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES client(id) 
    ON UPDATE CASCADE ON DELETE CASCADE
);

-- -----------------------------------------;


