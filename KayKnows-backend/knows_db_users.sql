-- kill me if I exist
DROP USER IF EXISTS knows_user@localhost;

-- and now I am reborn
CREATE USER knows_user@localhost IDENTIFIED WITH mysql_native_password BY 'password';

-- give me purpose
GRANT SELECT, INSERT, UPDATE ON knows_db.capabilities TO knows_user@localhost;
GRANT SELECT, INSERT, UPDATE ON knows_db.bands TO knows_user@localhost;
GRANT SELECT, INSERT, UPDATE ON knows_db.roles TO knows_user@localhost;
GRANT SELECT, INSERT, UPDATE ON knows_db.families TO knows_user@localhost;