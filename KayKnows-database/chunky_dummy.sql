
USE knows_db;

-- bands table
INSERT INTO bands VALUES (1, "Executive", "#5C2684");
INSERT INTO bands VALUES (2, "Leadership Community", "#56B6B1");
INSERT INTO bands VALUES (3, "Principle", "#417ABD");
INSERT INTO bands VALUES (4, "Manager", "#EF7DA9");
INSERT INTO bands VALUES (5, "Consultant", "#F7BE00");
INSERT INTO bands VALUES (6, "Senior Associate", "#707271");
INSERT INTO bands VALUES (7, "Associate", "#446b23");
INSERT INTO bands VALUES (8, "Trainee", "#115E67");
INSERT INTO bands VALUES (9, "Apprentice", "#ed8941");

-- families table
insert into families values (1, "Sales & Marketing");
insert into families values (2, "Technical");
insert into families values (3, "Consulting");
insert into families values (4, "Experience Design");
insert into families values (5, "Management");
insert into families values (6, "Central Services Teams");

-- capabilities table, capability_id, capability_name, family_id
insert into capabilities values (1, "Sales", 1);
insert into capabilities values (2, "Software Engineering", 2);
insert into capabilities values (12, "Data Engineering", 2);
insert into capabilities values (14, "Architect", 2);
insert into capabilities values (15, "Ops", 2);
insert into capabilities values (16, "Infrastructure", 2);
insert into capabilities values (17, "Testing", 2);
insert into capabilities values (18, "Analytics", 2);
insert into capabilities values (19, "Integration", 2);
insert into capabilities values (20, "Product Specialist", 2);
insert into capabilities values (21, "Product Support", 2);
insert into capabilities values (22, "Technical Specialist", 2);
insert into capabilities values (3, "Agile", 3);
insert into capabilities values (4, "Research", 4);
insert into capabilities values (5, "Project Management", 5);
insert into capabilities values (6, "Travel", 6 );
insert into capabilities values (7, "Cyber Security", 2);
insert into capabilities values (8, "Product", 3);
insert into capabilities values (9, "UX Design", 4);
insert into capabilities values (10, "Creative Design", 4);
insert into capabilities values (11, "People", 6);



-- ROLES, role_id, role_name, role_spec, role_description, capability_id, family_id, band_id, parent_role_id -----------



-- Sales
insert into roles values (1, "Sales Director","role spec","Description", 1, 1, 2, null);
insert into roles values (2, "Sales Executive","role spec","Description", 1, 1, 4, null);
insert into roles values (3, "Sales Executive","role spec","Description", 1, 1, 5, null);
insert into roles values (4, "Sales Associate","role spec","Description", 1, 1, 7, null);


-- Software Engineering
insert into roles values (5, "Lead Software Engineer","https://kainossoftwareltd.sharepoint.com/people.old/Shared%20Documents/Forms/AllItems.aspx?id=%2Fpeople.old%2FShared%20Documents%2FJob%20Descriptions%2FSoftware%20Engineering%2FJob%20Specification%20-%20Lead%20Software%20Engineer%20-%20Consultant.pdf&parent=%2Fpeople.old%2FShared%20Documents%2FJob%20Descriptions%2FSoftware%20Engineering&embed=%7B%22o%22%3A%22https%3A%2F%2Fkainossoftwareltd.sharepoint.com%22%2C%22id%22%3A%222dd9b883-7e75-bf6c-a96a-cdf89e108a74%22%2C%22af%22%3Atrue%7D","Be an active career coach and to escalate to their line manager if stretch goals are not set for your coachees
|Ensure that your coachee has received an appraisal and regular feedback and to escalate to HR if this is not the case
|Visibly and regularly share knowledge
|Actively identify and develop talent and highlight to your BU talent manager
|Contribute to presales activities – completion of bids, presenting, tender qualification, bid management etc….
|Provide constructive feedback and record it on Workday",2 , 2, 5, null);
insert into roles values (6, "Software Engineer","https://kainossoftwareltd.sharepoint.com/people.old/Shared%20Documents/Forms/AllItems.aspx?id=%2Fpeople.old%2FShared%20Documents%2FJob%20Descriptions%2FSoftware%20Engineering%2FJob%20Specification%20-%20Senior%20Software%20Engineer%20-%20Senior%20Associate.pdf&parent=%2Fpeople.old%2FShared%20Documents%2FJob%20Descriptions%2FSoftware%20Engineering&embed=%7B%22o%22%3A%22https%3A%2F%2Fkainossoftwareltd.sharepoint.com%22%2C%22id%22%3A%225396a260-dd7d-201b-6ccb-41b66038ed6f%22%2C%22af%22%3Atrue%7D","Make your line manager aware if you think someone may be considering leaving the company
|Help with recruitment activities",2 , 2, 6, null);
insert into roles values (24, "Software Engineer","https://kainossoftwareltd.sharepoint.com/people.old/Shared%20Documents/Forms/AllItems.aspx?id=%2Fpeople.old%2FShared%20Documents%2FJob%20Descriptions%2FSoftware%20Engineering%2FJob%20Specification%20-%20Software%20Engineer%20-%20Associate.pdf&parent=%2Fpeople.old%2FShared%20Documents%2FJob%20Descriptions%2FSoftware%20Engineering&embed=%7B%22o%22%3A%22https%3A%2F%2Fkainossoftwareltd.sharepoint.com%22%2C%22id%22%3A%22f28d6f9e-af7d-54d1-3a48-ae3991e2cd76%22%2C%22af%22%3Atrue%7D","Mentor junior team members
|Deliver your tasks within the timelines while adhering to the Kainos quality standards
|Set professional self-development goals, including asking for training
|Maintain a Kainos CV and store it in the correct location",2 , 2, 7, null);
insert into roles values (7, "Software Engineer","https://kainossoftwareltd.sharepoint.com/people.old/Shared%20Documents/Forms/AllItems.aspx?id=%2Fpeople.old%2FShared%20Documents%2FJob%20Descriptions%2FSoftware%20Engineering%2FJob%20Specification%20-%20Software%20Engineer%20-%20Trainee.pdf&parent=%2Fpeople.old%2FShared%20Documents%2FJob%20Descriptions%2FSoftware%20Engineering&embed=%7B%22o%22%3A%22https%3A%2F%2Fkainossoftwareltd.sharepoint.com%22%2C%22id%22%3A%22709cc3d3-3d67-366d-0494-2294bd2efe82%22%2C%22af%22%3Atrue%7D","Represent Kainos at careers fairs or Kainos open evenings events if invited
|Immediately tell your manager if your tasks are not going to be complete within the expected timeframe
|Notify your line manager if there are dependencies that are impacting your work
|Escalate to your line manager if you do not have appropriate project goals
|Notify HR if you have not received your project review on time",2 , 2, 8, null);
insert into roles values (25, "Software Engineer","","Carry out all professional administration (timesheets, keeping calendar and voicemail up-to-date)
|Notify your manager if you are sick and cannot attend work
|Be a representative at the Earn-As-You-Learn or Apprentice events if invited
|Attend training courses when invited
|Raise any concerns/issues/problems directly with your manager or your career coach",2 , 2, 9, null);

-- Data Engineering
insert into roles values (26, "Lead Data Engineer","role spec","Description",12 , 2, 5, null);
insert into roles values (27, "Data Engineer","role spec","Description",12 , 2, 6, null);
insert into roles values (28, "Data Engineer","role spec","Description",12 , 2, 7, null);
insert into roles values (29, "Data Engineer","role spec","Description",12 , 2, 8, null);

-- Cyber Security
insert into roles values (8, "Senior Security Architect","role spec","Description",7 , 2, 4, null);
insert into roles values (9, "Security Architect","role spec","Description",7 , 2, 5, null);
insert into roles values (10, "Security Engineer","role spec","Description",7 , 2, 6, null);

-- Architect
insert into roles values (30, "Chief Technology Officer","role spec","Description",14 , 2, 1, null);
insert into roles values (31, "Technology Leader","role spec","Description",14 , 2, 2, null);
insert into roles values (32, "Principal Architect","role spec","Description", 14, 2, 3, null);
insert into roles values (33, "Solution Architect","role spec","Description", 14, 2, 4, null);
insert into roles values (34, "Technical Architect","role spec","Description", 14, 2, 5, null);

-- Ops
insert into roles values (35, "Leads Ops Engineer","role spec","Description", 15, 2, 5, null);
insert into roles values (36, "Ops Engineer","role spec","Description", 15, 2, 6, null);
insert into roles values (37, "Ops Engineer","role spec","Description", 15, 2, 7, null);
insert into roles values (38, "Ops Engineer","role spec","Description", 15, 2, 8, null);

-- Infrastructure
insert into roles values (39, "Infrastructure Leader","role spec","Description", 16, 2, 2, null);
insert into roles values (40, "Infrastructure Consultant","role spec","Description", 16, 2, 5, null);
insert into roles values (41, "Infrastructure Engineer","role spec","Description", 16, 2, 6, null);
insert into roles values (42, "Infrastructure Engineer","role spec","Description", 16, 2, 7, null);
insert into roles values (43, "Infrastructure Engineer","role spec","Description", 16, 2, 8, null);
insert into roles values (44, "Infrastructure Engineer","role spec","Description", 16, 2, 9, null);

-- Testing
insert into roles values (45, "Test Manager","role spec","Description", 17, 2, 4, null);
insert into roles values (46, "Lead Test Engineer","role spec","Description", 17, 2, 5, null);
insert into roles values (47, "Test Engineer","role spec","Description", 17, 2, 6, null);
insert into roles values (48, "Test Engineer","role spec","Description", 17, 2, 7, null);
insert into roles values (49, "Test Engineer","role spec","Description", 17, 2, 8, null);
insert into roles values (50, "Test Engineer","role spec","Description", 17, 2, 9, null);

-- Analytics
insert into roles values (51, "Principal Data Consultant","role spec","Description", 18, 2, 3, null);
insert into roles values (52, "Data Architect","role spec","Description", 18, 2, 4, null);
insert into roles values (53, "Data Scientist","role spec","Description", 18, 2, 5, null);
insert into roles values (54, "Data Scientist","role spec","Description", 18, 2, 6, null);
insert into roles values (55, "Data Consultant","role spec","Description", 18, 2, 7, null);
insert into roles values (71, "Data Scientist","role spec","Description", 18, 2, 8, null);

-- Integration
insert into roles values (56, "Lead Integration Consultant","role spec","Description", 19, 2, 4, null);
insert into roles values (57, "Integration Consultant","role spec","Description", 19, 2, 5, null);
insert into roles values (58, "Integration Consultant","role spec","Description", 19, 2, 6, null);
insert into roles values (59, "Integration Consultant","role spec","Description", 19, 2, 7, null);
insert into roles values (60, "Integration Consultant","role spec","Description", 19, 2, 8, null);

-- Product Specialist
insert into roles values (61, "Lead Product Specialist","role spec","Description", 20, 2, 5, null);
insert into roles values (62, "Product Specialist","role spec","Description", 20, 2, 6, null);
insert into roles values (63, "Product Specialist","role spec","Description", 20, 2, 7, null);
insert into roles values (64, "Product Specialist","role spec","Description", 20, 2, 8, null);

-- Product Support
insert into roles values (65, "Product Support Engineer","role spec","Description", 21, 2, 6, null);
insert into roles values (66, "Product Support Engineer","role spec","Description", 21, 2, 7, null);
insert into roles values (67, "Product Support Engineer","role spec","Description", 21, 2, 8, null);

-- Technical Specialist
insert into roles values (68, "Technical Consultant","role spec","Description", 22, 2, 4, null);
insert into roles values (69, "Technical Consultant","role spec","Description", 22, 2, 5, null);
insert into roles values (70, "Technical Consultant","role spec","Description", 22, 2, 6, null);

insert into roles values (11, "Agile Lead", "role spec","Description",3, 3, 4, null);

insert into roles values (12, "Product Principle", "role spec","Description",8, 3, 3, null);
insert into roles values (13, "Product Consultant", "role spec","Description",8, 3, 5, null);

insert into roles values (14, "User Researcher","role spec","Description", 4, 4, 7, null);

insert into roles values (15, "Design Lead","role spec","Description", 9, 4, 4, null);
insert into roles values (16, "Design Consultant","role spec","Description", 9, 4, 5, null);

insert into roles values (17, "Art Director","role spec","Description", 10, 4, 4, null);
insert into roles values (18, "Design Consultant","role spec","Description", 10, 4, 5, null);


insert into roles values (19, "Team Leader","role spec","Description", 5, 5, 5, null);

insert into roles values (20, "Travel Associate","role spec","Description", 6, 6, 7, null);

insert into roles values (21, "Head of People & Talent Development","role spec", "Description", 11, 6, 1, null);
insert into roles values (22, "People Manager","role spec", "Description", 11, 6, 3, null);
insert into roles values (23, "People Manager","role spec", "Description", 11, 6, 4, null);


-- USERS user_id SMALLINT UNSIGNED PRIMARY KEY auto_increment, --------------------------------------------------------
--    user_password VARCHAR(100) NOT NULL,
--    user_email VARCHAR(100) NOT NULL,
--    role_id SMALLINT UNSIGNED,
--    user_admin BIT,
--    user_full_name VARCHAR(100),

-- users
insert into users values (1, "kyle.a@kainos.com", "password", 1, 7, "Kyle Allen-Taylor");
insert into users values (2, "ola.k@kainos.com", "123456", 1, 7, "Ola Kondracka");
insert into users values (3, "juliano.s@kainos.com", "iamthepassword", 1, 7, "Juliano Saunders");
insert into users values (4, "joe.z@kainos.com", "ez123", 1, 7, "Joe Zazzaro-Francis");
insert into users values (5, "foysal.m@kainos.com", "pA55w0rd", 0, 7, "Foysal Mohammed");
insert into users values (6, "dragos.a@kainos.com", "password54321", 1, 7, "Dragos-Andrei Ilies");

-- CAPABILITY_LEADS capability_lead_id SMALLINT UNSIGNED PRIMARY KEY auto_increment, ----------------------------------
--    user_id SMALLINT UNSIGNED,
--    capability_lead_photo VARCHAR(300) NOT NULL,
--    capability_lead_message VARCHAR(500),
--    capability_id SMALLINT UNSIGNED,

-- capabiliy leads
insert into capability_leads values (1, 1, "https://media.licdn.com/dms/image/C4D03AQEJKzONm7TdxA/profile-displayphoto-shrink_800_800/0?e=1573689600&v=beta&t=IukaWvOoMic3bZunKzDZkC4teugahaWZuwJm4h0bArE",
"At Kainos we want the best for you, Kainos is at the forefront for technological advancements and we wish to continue this.", 2);
insert into capability_leads values (2, 2, "https://scontent-lhr3-1.cdninstagram.com/vp/485a3978ff137d34459c20fe27529ed8/5E3BFB7B/t51.2885-15/e35/66197876_414132222532974_5983494422550757045_n.jpg?_nc_ht=scontent-lhr3-1.cdninstagram.com&_nc_cat=106",
"UX design is fundamental to what we do at Kainos! At the end of the day the User's experience is the most important aspect to the work that we produce.", 9);
insert into capability_leads values (3, 3, "https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/54236957_2530272617002755_1423110093242630144_o.jpg?_nc_cat=107&_nc_oc=AQl7QYG4Wt5xD_j0rXevzLJBEqRQh9i2JxiaXQ5dLyn-ptsOaJxGtYIWCCyNCPZgcRM&_nc_ht=scontent-lhr3-1.xx&oh=fe3c17a1b0d888964cf97b21468f12d6&oe=5DFFBE94",
"Testing is a critical aspect to everything produced by Kainos. It ensures that our clients can trust the amazing work that we produce", 17);

