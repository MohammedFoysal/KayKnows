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
    band_name VARCHAR(100) NOT NULL
    -- band_colour CHAR(6)
);

CREATE TABLE IF NOT EXISTS roles(
    role_id SMALLINT UNSIGNED PRIMARY KEY auto_increment,
    role_name VARCHAR(100) NOT NULL,
    role_spec VARCHAR(300) NULL,
    role_description VARCHAR(500) NULL,
    capability_id SMALLINT UNSIGNED,
    family_id SMALLINT UNSIGNED,
    band_id SMALLINT UNSIGNED,
    FOREIGN KEY(capability_id) REFERENCES capabilities(capability_id),
    FOREIGN KEY(family_id) REFERENCES families(family_id),
    FOREIGN KEY(band_id) REFERENCES bands(band_id)
);

