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
    avatar TEXT,
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
    state TEXT NOT NULL,
    complement TEXT NULL,
    zip_code TEXT NOT NULL,
    primary_adress BOOLEAN NOT NULL DEFAULT TRUE,
    client_id TEXT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES client(id) ON UPDATE CASCADE ON DELETE CASCADE
);






-- TABELA DE CARTÃO DE CREDITO DE CLIENTES
CREATE TABLE IF NOT EXISTS payment_cards (
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    client_id TEXT NOT NULL UNIQUE,
    number_card INTEGER NOT NULL UNIQUE,
    client_name TEXT NOT NULL,
    method TEXT NOT NULL,
    expires_in TEXT NOT NULL,
    cvv INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES client(id) 
    ON UPDATE CASCADE ON DELETE CASCADE
);




-- -----------------------------------------;

-- TABELA DE BANNERS

CREATE TABLE IF NOT EXISTS banners(
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    title TEXT NOT NULL,
    sub_title TEXT NOT NULL,
    cta TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT
);


-- TABELA DE PRODUTOS


CREATE TABLE IF NOT EXISTS products(
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    discount INTEGER,
    image_url TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT
);