DROP DATABASE IF EXISTS knows_db;
CREATE DATABASE IF NOT EXISTS knows_db;
USE knows_db;

CREATE TABLE IF NOT EXISTS families(
    family_id SMALLINT UNSIGNED PRIMARY KEY auto_increment,
    family_name VARCHAR(100) NOT NULL
);


CREATE TABLE IF NOT EXISTS capabilities(
    capability_id SMALLINT UNSIGNED PRIMARY KEY auto_increment,
    capability_name VARCHAR(100) NOT NULL,
    family_id SMALLINT UNSIGNED,
    FOREIGN KEY(family_id) REFERENCES families(family_id)
);

CREATE TABLE IF NOT EXISTS bands(
    band_id SMALLINT UNSIGNED PRIMARY KEY auto_increment,
    band_name VARCHAR(100) NOT NULL,
    band_colour CHAR(7)
);

CREATE TABLE IF NOT EXISTS roles(
    role_id SMALLINT UNSIGNED PRIMARY KEY auto_increment,
    role_name VARCHAR(100) NOT NULL,
    role_spec VARCHAR(300) NULL,
    role_description VARCHAR(500) NULL,
    capability_id SMALLINT UNSIGNED,
    family_id SMALLINT UNSIGNED,
    band_id SMALLINT UNSIGNED,
    parent_role_id SMALLINT UNSIGNED NULL, 
    FOREIGN KEY(capability_id) REFERENCES capabilities(capability_id),
    FOREIGN KEY(family_id) REFERENCES families(family_id),
    FOREIGN KEY(band_id) REFERENCES bands(band_id),
    FOREIGN KEY(parent_role_id) REFERENCES roles(role_id)
);

CREATE TABLE IF NOT EXISTS users (
    user_id SMALLINT UNSIGNED PRIMARY KEY auto_increment,
    user_email VARCHAR(120) NOT NULL UNIQUE,
    user_password VARCHAR(64) NOT NULL,
    user_admin BOOLEAN,
    role_id SMALLINT UNSIGNED,
    user_full_name VARCHAR(100),
    FOREIGN KEY(role_id) REFERENCES roles(role_id)
);

