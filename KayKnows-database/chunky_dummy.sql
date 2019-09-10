
USE knows_db;

-- bands table
INSERT INTO bands VALUES (1, "Executive");
INSERT INTO bands VALUES (2, "Leadership Community");
INSERT INTO bands VALUES (3, "Principle");
INSERT INTO bands VALUES (4, "Manager");
INSERT INTO bands VALUES (5, "Consultant");
INSERT INTO bands VALUES (6, "Senior Associate");
INSERT INTO bands VALUES (7, "Associate");
INSERT INTO bands VALUES (8, "Trainee");
INSERT INTO bands VALUES (9, "Apprentice");

-- families table
INSERT INTO families VALUES (1, "Sales & Marketing");
INSERT INTO families VALUES (2, "Technical");
INSERT INTO families VALUES (3, "Consulting");
INSERT INTO families VALUES (4, "Experience Design");
INSERT INTO families VALUES (5, "Management");
INSERT INTO families VALUES (6, "Central Services Teams");

-- capabilities table, 1 capability per family
INSERT INTO capabilities VALUES (1, "Sales", 1);
INSERT INTO capabilities VALUES (2, "Software Engineering", 2);
INSERT INTO capabilities VALUES (3, "Agile", 3);
INSERT INTO capabilities VALUES (4, "Research", 4);
INSERT INTO capabilities VALUES (5, "Project Management", 5);
INSERT INTO capabilities VALUES (6, "Travel", 6 );

-- roles
INSERT INTO roles VALUES (1, "Sales Director","role spec","Description", 1, 1, 2, NULL);
INSERT INTO roles VALUES (2, "Software Engineer","role spec","Description",2 , 2, 6, NULL);
INSERT INTO roles VALUES (3, "Agile Lead", "role spec","Description",3, 3, 4, NULL);
INSERT INTO roles VALUES (4, "User Researcher","role spec","Description", 4, 4, 7, NULL);
INSERT INTO roles VALUES (5, "Team Leader","role spec","Description", 5, 5, 5, NULL);
INSERT INTO roles VALUES (6, "Travel Associate","role spec","Description", 6, 6, 7, NULL);

