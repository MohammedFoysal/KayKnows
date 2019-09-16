
USE knows_db;

-- bands table
INSERT INTO bands VALUES (1, "Executive", "5C2684");
INSERT INTO bands VALUES (2, "Leadership Community", "56B6B1");
INSERT INTO bands VALUES (3, "Principle", "417ABD");
INSERT INTO bands VALUES (4, "Manager", "EF7DA9");
INSERT INTO bands VALUES (5, "Consultant", "F7BE00");
INSERT INTO bands VALUES (6, "Senior Associate", "707271");
INSERT INTO bands VALUES (7, "Associate", "446b23");
INSERT INTO bands VALUES (8, "Trainee", "115E67");
INSERT INTO bands VALUES (9, "Apprentice", "ed8941");

-- families table
INSERT INTO families VALUES (1, "Sales & Marketing");
INSERT INTO families VALUES (2, "Technical");
INSERT INTO families VALUES (3, "Consulting");
INSERT INTO families VALUES (4, "Experience Design");
INSERT INTO families VALUES (5, "Management");
INSERT INTO families VALUES (6, "Central Services Teams");

-- capabilities table, capability_id, capability_name, family_id
INSERT INTO capabilities VALUES (1, "Sales", 1);
INSERT INTO capabilities VALUES (2, "Software Engineering", 2);
INSERT INTO capabilities VALUES (12, "Data Engineering", 2);
INSERT INTO capabilities VALUES (14, "Architect", 2);
INSERT INTO capabilities VALUES (15, "Ops", 2);
INSERT INTO capabilities VALUES (16, "Infrastructure", 2);
INSERT INTO capabilities VALUES (17, "Testing", 2);
INSERT INTO capabilities VALUES (18, "Analytics", 2);
INSERT INTO capabilities VALUES (19, "Integration", 2);
INSERT INTO capabilities VALUES (20, "Product Specialist", 2);
INSERT INTO capabilities VALUES (21, "Product Support", 2);
INSERT INTO capabilities VALUES (22, "Technical Specialist", 2);
INSERT INTO capabilities VALUES (3, "Agile", 3);
INSERT INTO capabilities VALUES (4, "Research", 4);
INSERT INTO capabilities VALUES (5, "Project Management", 5);
INSERT INTO capabilities VALUES (6, "Travel", 6 );
INSERT INTO capabilities VALUES (7, "Cyber Security", 2);
INSERT INTO capabilities VALUES (8, "Product", 3);
INSERT INTO capabilities VALUES (9, "UX Design", 4);
INSERT INTO capabilities VALUES (10, "Creative Design", 4);
INSERT INTO capabilities VALUES (11, "People", 6);



-- ROLES, role_id, role_name, role_spec, role_description, capability_id, family_id, band_id, parent_role_id -----------



-- Sales
INSERT INTO roles VALUES (1, "Sales Director","role spec","Description", 1, 1, 2, NULL);
INSERT INTO roles VALUES (2, "Sales Executive","role spec","Description", 1, 1, 4, NULL);
INSERT INTO roles VALUES (3, "Sales Executive","role spec","Description", 1, 1, 5, NULL);
INSERT INTO roles VALUES (4, "Sales Associate","role spec","Description", 1, 1, 7, NULL);


-- Software Engineering
INSERT INTO roles VALUES (5, "Lead Software Engineer","role spec","Description",2 , 2, 5, NULL);
INSERT INTO roles VALUES (6, "Software Engineer","role spec","Description",2 , 2, 6, NULL);
INSERT INTO roles VALUES (7, "Software Engineer","role spec","Description",2 , 2, 8, NULL);
INSERT INTO roles VALUES (24, "Software Engineer","role spec","Description",2 , 2, 7, NULL);
INSERT INTO roles VALUES (25, "Software Engineer","role spec","Description",2 , 2, 9, NULL);

-- Data Engineering
INSERT INTO roles VALUES (26, "Lead Data Engineer","role spec","Description",12 , 2, 5, NULL);
INSERT INTO roles VALUES (27, "Data Engineer","role spec","Description",12 , 2, 6, NULL);
INSERT INTO roles VALUES (28, "Data Engineer","role spec","Description",12 , 2, 7, NULL);
INSERT INTO roles VALUES (29, "Data Engineer","role spec","Description",12 , 2, 8, NULL);

-- Cyber Security
INSERT INTO roles VALUES (8, "Senior Security Architect","role spec","Description",7 , 2, 4, NULL);
INSERT INTO roles VALUES (9, "Security Architect","role spec","Description",7 , 2, 5, NULL);
INSERT INTO roles VALUES (10, "Security Engineer","role spec","Description",7 , 2, 6, NULL);

-- Architect
INSERT INTO roles VALUES (30, "Chief Technology Officer","role spec","Description",14 , 2, 1, NULL);
INSERT INTO roles VALUES (31, "Technology Leader","role spec","Description",14 , 2, 2, NULL);
INSERT INTO roles VALUES (32, "Principal Architect","role spec","Description", 14, 2, 3, NULL);
INSERT INTO roles VALUES (33, "Solution Architect","role spec","Description", 14, 2, 4, NULL);
INSERT INTO roles VALUES (34, "Technical Architect","role spec","Description", 14, 2, 5, NULL);

-- Ops
INSERT INTO roles VALUES (35, "Leads Ops Engineer","role spec","Description", 15, 2, 5, NULL);
INSERT INTO roles VALUES (36, "Ops Engineer","role spec","Description", 15, 2, 6, NULL);
INSERT INTO roles VALUES (37, "Ops Engineer","role spec","Description", 15, 2, 7, NULL);
INSERT INTO roles VALUES (38, "Ops Engineer","role spec","Description", 15, 2, 8, NULL);

-- Infrastructure
INSERT INTO roles VALUES (39, "Infrastructure Leader","role spec","Description", 16, 2, 2, NULL);
INSERT INTO roles VALUES (40, "Infrastructure Consultant","role spec","Description", 16, 2, 5, NULL);
INSERT INTO roles VALUES (41, "Infrastructure Engineer","role spec","Description", 16, 2, 6, NULL);
INSERT INTO roles VALUES (42, "Infrastructure Engineer","role spec","Description", 16, 2, 7, NULL);
INSERT INTO roles VALUES (43, "Infrastructure Engineer","role spec","Description", 16, 2, 8, NULL);
INSERT INTO roles VALUES (44, "Infrastructure Engineer","role spec","Description", 16, 2, 9, NULL);

-- Testing
INSERT INTO roles VALUES (45, "Test Manager","role spec","Description", 17, 2, 4, NULL);
INSERT INTO roles VALUES (46, "Lead Test Engineer","role spec","Description", 17, 2, 5, NULL);
INSERT INTO roles VALUES (47, "Test Engineer","role spec","Description", 17, 2, 6, NULL);
INSERT INTO roles VALUES (48, "Test Engineer","role spec","Description", 17, 2, 7, NULL);
INSERT INTO roles VALUES (49, "Test Engineer","role spec","Description", 17, 2, 8, NULL);
INSERT INTO roles VALUES (50, "Test Engineer","role spec","Description", 17, 2, 9, NULL);

-- Analytics
INSERT INTO roles VALUES (51, "Principal Data Consultant","role spec","Description", 18, 2, 3, NULL);
INSERT INTO roles VALUES (52, "Data Architect","role spec","Description", 18, 2, 4, NULL);
INSERT INTO roles VALUES (53, "Data Scientist","role spec","Description", 18, 2, 5, NULL);
INSERT INTO roles VALUES (54, "Data Scientist","role spec","Description", 18, 2, 6, NULL);
INSERT INTO roles VALUES (55, "Data Consultant","role spec","Description", 18, 2, 7, NULL);
INSERT INTO roles VALUES (71, "Data Scientist","role spec","Description", 18, 2, 8, NULL);

-- Integration
INSERT INTO roles VALUES (56, "Lead Integration Consultant","role spec","Description", 19, 2, 4, NULL);
INSERT INTO roles VALUES (57, "Integration Consultant","role spec","Description", 19, 2, 5, NULL);
INSERT INTO roles VALUES (58, "Integration Consultant","role spec","Description", 19, 2, 6, NULL);
INSERT INTO roles VALUES (59, "Integration Consultant","role spec","Description", 19, 2, 7, NULL);
INSERT INTO roles VALUES (60, "Integration Consultant","role spec","Description", 19, 2, 8, NULL);

-- Product Specialist
INSERT INTO roles VALUES (61, "Lead Product Specialist","role spec","Description", 20, 2, 5, NULL);
INSERT INTO roles VALUES (62, "Product Specialist","role spec","Description", 20, 2, 6, NULL);
INSERT INTO roles VALUES (63, "Product Specialist","role spec","Description", 20, 2, 7, NULL);
INSERT INTO roles VALUES (64, "Product Specialist","role spec","Description", 20, 2, 8, NULL);

-- Product Support
INSERT INTO roles VALUES (65, "Product Support Engineer","role spec","Description", 21, 2, 6, NULL);
INSERT INTO roles VALUES (66, "Product Support Engineer","role spec","Description", 21, 2, 7, NULL);
INSERT INTO roles VALUES (67, "Product Support Engineer","role spec","Description", 21, 2, 8, NULL);

-- Technical Specialist
INSERT INTO roles VALUES (68, "Technical Consultant","role spec","Description", 22, 2, 4, NULL);
INSERT INTO roles VALUES (69, "Technical Consultant","role spec","Description", 22, 2, 5, NULL);
INSERT INTO roles VALUES (70, "Technical Consultant","role spec","Description", 22, 2, 6, NULL);

INSERT INTO roles VALUES (11, "Agile Lead", "role spec","Description",3, 3, 4, NULL);

INSERT INTO roles VALUES (12, "Product Principle", "role spec","Description",8, 3, 3, NULL);
INSERT INTO roles VALUES (13, "Product Consultant", "role spec","Description",8, 3, 5, NULL);

INSERT INTO roles VALUES (14, "User Researcher","role spec","Description", 4, 4, 7, NULL);

INSERT INTO roles VALUES (15, "Design Lead","role spec","Description", 9, 4, 4, NULL);
INSERT INTO roles VALUES (16, "Design Consultant","role spec","Description", 9, 4, 5, NULL);

INSERT INTO roles VALUES (17, "Art Director","role spec","Description", 10, 4, 4, NULL);
INSERT INTO roles VALUES (18, "Design Consultant","role spec","Description", 10, 4, 5, NULL);


INSERT INTO roles VALUES (19, "Team Leader","role spec","Description", 5, 5, 5, NULL);

INSERT INTO roles VALUES (20, "Travel Associate","role spec","Description", 6, 6, 7, NULL);

INSERT INTO roles VALUES (21, "Head of People & Talent Development","role spec", "Description", 11, 6, 1, NULL);
INSERT INTO roles VALUES (22, "People Manager","role spec", "Description", 11, 6, 3, NULL);
INSERT INTO roles VALUES (23, "People Manager","role spec", "Description", 11, 6, 4, NULL);