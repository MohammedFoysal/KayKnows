-- kill me if I exist
DROP USER IF EXISTS knows_test_user@localhost;

-- and now I am reborn
CREATE USER knows_test_user@localhost IDENTIFIED WITH mysql_native_password BY 'password';

-- give me purpose
GRANT SELECT, INSERT, UPDATE ON knows_test_db.capabilities TO knows_test_user@localhost;
GRANT SELECT, INSERT, UPDATE ON knows_test_db.bands TO knows_test_user@localhost;
GRANT SELECT, INSERT, UPDATE ON knows_test_db.roles TO knows_test_user@localhost;
GRANT SELECT, INSERT, UPDATE ON knows_test_db.families TO knows_test_user@localhost;