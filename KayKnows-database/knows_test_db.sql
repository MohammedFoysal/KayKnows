DROP DATABASE IF EXISTS knows_test_db;
CREATE DATABASE IF NOT EXISTS knows_test_db;
USE knows_test_db;

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
    band_colour CHAR(7),
    band_competencies TEXT NOT NULL,
    band_responsibilities TEXT NOT NULL
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

CREATE TABLE IF NOT EXISTS capability_leads(
    capability_lead_id SMALLINT UNSIGNED PRIMARY KEY auto_increment,
    user_id SMALLINT UNSIGNED,
    capability_lead_photo VARCHAR(300) NOT NULL,
    capability_lead_message VARCHAR(500),
    capability_id SMALLINT UNSIGNED,
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    FOREIGN KEY(capability_id) REFERENCES capabilities(capability_id)
);
-- bands table
INSERT INTO bands VALUES (1, "Executive", "#5C2684", "Commercial Awareness
Anticipates changes in the Kainos marketplace when budgeting for the future
Communicating & Teamwork
Creates successful alignment between diverse teams across the organisation
Innovation and Continuous Improvement
Customer Focus
Includes all Customer Focus indicators from lower Job Levels
Developing Yourself and Others
Integrates people development in their business plans
Matches long term business needs with the career development and job fulfilment of staff
Develops the whole business through learning and development
Planning and Organising
Sets a clear sense of direction, forward thinking and responsibly shapes the future", "Formulate policies and strategic planning.");
INSERT INTO bands VALUES (2, "Leadership Community", "#56B6B1", "Competency framework doesn't directly apply at this Job Level.", "Lead the community.");
INSERT INTO bands VALUES (3, "Principle", "#417ABD","Commercial Awareness
You take a balanced view of wider impact on the organisation when making significant changes
You strive to add measurable and significant value to the longer term growth of Kainos and take calculated risks in order to do so.
You influence and negotiate creating commercial strategies that maximise return, reduce cost and drive improvement in quality
Communicating & Teamwork
You achieve widely accepted 'buy in' by explaining benefits at both individual and department level
You build collaborative partnerships across the company
You build cohesive formal and informal teams and networks across the organisation which deliver significant added value
You lead the implementation of changes with a positive approach delivering and respecting the need for the company message
You understand the culture and proactively instil within your team, understanding what is and not possible to achieve within the organisation
You build capability, processes and structures to speed the development of skills and the future leaders so the business can scale sustainably.
Innovation and Continuous Improvement
You create strategies that introduce improvements across your business unit and the Kainos group
Customer Focus
You anticipate customer's future needs, identifies their key strategic issues and positively challenges unfounded assumptions
You create mutually supportive and loyal relationships with all major customers
You see the wider picture, understand the levels of service that are valued by customers and ensures that these are the priority at all times
You understand and apply sector-wide standards
Developing Yourself and Others
You create an environment which encourages continuous learning and development and have led and contributed to the development of capability across the group
You actively sponsor and participate MAP training programmes to ensure that the skills required by the business are available to drive future growth
You take accountability for ensuring that there is a clear talent pipeline within your area of responsibility
You are an active role model ensuring that each of your direct reports are managed in accordance with the talent management process eg performance reviews/retention/succession/career development plans are in place.
You ensure that the group management processes are actively adapted by all members of staff within your responsibility.
Planning and Organising
You plan effectively for the medium and long term, reviewing strategies and revising to meet changing business needs
You actively make use of management information available in order to understand issues
You liaises effectively with colleagues outside of immediate team to coordinate activities and encourage your team to participate with others outside your team and BU where appropriate
You produce a consistent, 'no blame' culture, with a feeling of pride and achievement
Job Specific Knowledge
You anticipate and understand future trends in functional or technical skills and process
You actively drive the necessary changes to role and learning requirements to ensure the Company is best placed to adapt to new challenges
You demonstrates an outstanding level of accomplishment in job performance", "Make significant decsions/changes when needed
Take into account the wider impacts your decisions will have on the company");
INSERT INTO bands VALUES (4, "Manager", "#EF7DA9", "Commercial Awareness
You put forward sound business cases to gain support for new and more effective methods of working
You prioritise actions to minimise costs and maximise advantage across the organisation
You understand the need to demonstrate a return on investment in activities and identify opportunities for generating income
You actively pursue alternative ideas and ways of working to gain cost savings
You lead successful initiatives that create a positive image of Kainos with potential to generate more income
You support the company's commercial decisions and ensure that your team understand the reasons for these decisions
You understand and are able to articulate the company mission statement, culture, values and business goals and behave accordingly at all times
You prepare strong and influential business cases, understanding the needs of all stakeholders
You understand and identify risk to the business and proactively mitigate and manage
Communicating & Teamwork
You role model company values, even when there is significant risk in doing so
You address issues within your team and deliver difficult conversations when staff expectations need aligned or behaviours do not reflect the Kainos values
You understand that your role is to 'Challenge' and 'Protect' those under your management fostering longer term career development for the benefit of Kainos
You use team dynamics to construct the most effective team structures
You clarify the vision and goals for every team member ensuring your team understands the role they have to play in the business
You demonstrate effective networking skills to maintain a broad range of trusted contacts throughout the Company
You develops strategies which ensure win-win solutions for all parties
You create the Kainos culture placing high value on successful delivery, co-creation and cooperation, honesty, respect and creativeness
You understand the people risk within your team and mitigate and proactively manage ensuring adherence to policies and processes e.g. Retention/Succession Planning/Well Being)
Innovation and Continuous Improvement
You understand that proposed innovation and changes should have a clear link to improving the business results delivered
You set standards for quality and ensures best practice
You integrate systems and processes to avoid duplication of effort
You understand how changes might impact differently on different stakeholders and address arising issues
You take ownership and accountability for problems and the generation of solutions
You communicates and manage the need for change delivering the corporate message
You create a culture where new ideas are encouraged and evaluated; obstacles removed and people and resources are used in the most effective way in order to achieve Company goals
You capitalise on opportunities to improve processes, systems or efficiency supporting the company's decision on corporate tools
Customer Focus
You manage expectations so customers always feels valued and have a positive experience of Kainos
You champion customer service improvement initiatives
You create a culture of professionalism in dealing with customers at all levels
Developing Yourself and Others
You tailor development approaches to suit the needs of each team member
You identify potential developmental opportunities for individuals within your team, making them happen whilst managing the impact within your team
You evaluate the effectiveness of training in the development of your team
You understand the talent development process and effectively use to take accountability for the development of staff
You create a supportive coaching culture and share your knowledge and skills to groups of individuals
Planning and Organising
You organise people and resources to successfully achieve both short and medium term objectives
You confidently juggle complex projects of different size and priority
You empower individuals and pass decision making down to the lowest appropriate level
Job Specific Knowledge
You provide opportunities for others to learn functional and technical skills and concepts
You apply advanced functional or technical knowledge to process innovation and complex problem solving
You continually seeks to improve or redesign processes, tools, or technologies to enhance business efficiency and relevance
You are sought by others for functional or technical expertise and knowledge and for troubleshooting of complex issues
You demonstrates an excellent level of accomplishment in job performance", "Ensure everyone in the team knows what their tasks are as well as the goals associated with the project.");
INSERT INTO bands VALUES (5, "Consultant", "#F7BE00", "Commercial Awareness
You look beyond immediate problems/issues to see the impact on the bigger picture
You use financial information to find pragmatic new ways of saving cost/effort without reducing throughput
You manage people and your resources effectively and efficiently
You are aware of and actively use project/financial information to manage profitability e.g.. revisiting estimates
You understand the commercial implications of changes in scope and negotiate with customers proactively
You understand the impact of decisions on BU and company profitability and support company decisions that affect profitability
You identify potential new opportunities for the company to generate income and proactively take action to progress
You actively engage and contribute to sales activities such as presales bids, presentations for new clients
Communicating & Teamwork
You recognise and build on individual strengths of colleagues/team members
You build relationships based on trust
You identify personally with the team and are proud of its achievements
You publicise what team members have achieved and give feedback and recognition awards where due
You act as an influential and effective member of multi-disciplinary teams or projects
You use communication to create a shared sense of purpose and direction
You initiate collaboration and actively encourage people to cooperate in initiatives where you think that they can add value
You lead by example demonstrating openness and honesty with your team
You proactively identify internal and external talent and support them in finding developmental opportunities e.g. recruitment, career coaching
Innovation and Continuous Improvement
You invite regular feedback on performance from team members and customers
You quickly turn new ideas into clear and effective improvements
You take responsibility for others, encouraging and supporting others who make suggestions for improvement
Customer Focus
You assess your customer needs accurately by listening and applying sensitive questioning
You manage customer expectations in relation to scope of work being honest with what can and cannot be achieved within timelines
You negotiate with customers to reflect changes in scope of work
You actively seek feedback and suggestions to improve customer service
Developing Yourself and Others
You consistently give constructive feedback to others in relation to the performance areas for improvement
You make independent decisions and are able to 'get on with the job' escalating decisions only when appropriate
You draw on your past experiences to solve problems
You assist others in developing capability by educating them in your areas of specialism through a variety of forums - eg MAP courses, demonstrations, show and tells, blogs and thought leadership initiatives.
You are an active career coach and are able to objectively demonstrate how you coached others in your team to improve their performance
You identify and mentor new people and help them achieve success in their roles
Planning and Organising
You motivate and encourage others to achieve planned results
If appropriate to role, you manage your team effectively, delegating work to use people and resources to best effect
You ensure colleagues are aware of changes in priorities and help them to plan their workload
You monitor progress and put effort in where it is most needed to achieve the end goal
You develop effective systems to organise and track workload
Job Specific Knowledge
You choose appropriate tools or technology for solutions; experiments with new processes, tools, or technologies to determine applicability
You apply advanced functional or technical knowledge to do your job at a high level of accomplishment
You improve or redesign processes, tools, or technologies to achieve business needs
You consistently share expertise with others, teach skills and explain concepts
You demonstrate an avid interest in continuously enhancing current skills and learning new ones", "Conduct research to understand how the company functions and where the company can improve.
Analyse gathered information to form a hypothesis of company weaknesses and how to fix them.");
INSERT INTO bands VALUES (6, "Senior Associate", "#707271", "Commercial Awareness
You understand how the company makes profit and how your role affects profitability of the company
You create honest time estimates and are determined to deliver upon these
You question actions where appropriate and identify cost-effective approaches
You respectfully challenge commercial decisions to contribute an increase in profitability
You manage and meet the expectations of customers without compromising budgets
You understand the organisational structure of Kainos, your reporting lines and can actively identify where key responsibilities lie
Communicating & Teamwork
You use honest data and facts in a clear and constructive way to support arguments and gain agreement
You are open to giving and receiving honest feedback in order to highlight areas for improvement and recognise high performance.
You appreciate the impact of decisions on others and mitigate or minimise any negative effects
You recognise and respect that communication is a two way process and demonstrate effective questioning and active listening skills to achieve this
You persuade and influence with sound rational argument, 'appealing to others' interest or reason to gain support.
Innovation and Continuous Improvement
You proactively look for creative/better ways of doing things and put forward improvements in order to improve performance
You identify problems, carefully consider and test possible options, evaluate pros and cons and consequences of various decisions and create a range of solutions
You suggest and implement practical and workable solutions
Customer Focus
You respond honestly and promptly to customer requests and whenever possible within agreed timeframes
You keep promises made to your customer
You are authentic in stakeholder relations and take pride in being inclusive and trustworthy.
Developing Yourself and Others
You identify your learning and development needs and actively seek opportunities to gain this experience
You seek and respond positively to feedback regarding your own learning and development
You constructively challenge colleagues, including those in positions of authority.
You state alternative views with confidence and respect.
You adapt your behaviours and act in the most appropriate way to enable others to respond constructively
You tailor your responses to be constructive and diffuse tense situations and calm others
You acknowledge the capabilities of others in your team and publicly recognise your colleagues who have performed well
You offer help or advice when team members are struggling to ensure that the team as a whole is successful.
You give advice and guidance and provide practical support to others to help them understand tasks. You give 'how to' demonstrations or instructions and explain how others can achieve performance expectations
Planning and Organising
You overcome obstacles to ensure work gets done on time
You effectively prioritise workload to meet important objectives
Job Specific Knowledge
You have the capability and knowledge base to share job specific skills with others
You demonstrate an active interest in enhancing current skills and learning new ones
You demonstrate a good level of accomplishment in job performance","Interact with clients. 
Work on gathering client requirements. 
Provide estimates and work on deciding project timelines.");
INSERT INTO bands VALUES (7, "Associate", "#446b23", "Commercial Awareness
You understand the contribution your role makes to the success of the business, consistently delivering to task deadlines
You understand and the need for the business to generate additional income and respect that costs need to be managed
You know what you have to do to manage costs within the business
You complete expenses honestly, on time and accurately
You consistently achieve your personal productive utilisation target
You understand how your team supports increased income for Kainos
Communicating & Teamwork
You get involved at meetings, ask questions, listen and give honest information when appropriate.
You actively participate and cooperate within the team helping others and sharing workload.
You focus on shared goals playing a full part in their successful completion.
You are communicative and clear in your thoughts and ideas when approached by others
You give consideration to the communication needs of staff in other locations
You are able to interact effectively in a situation you find stressful or frustrating knowing when to remove yourself from a situation to allow you to compose yourself
You have an awareness of the activities in other jobs and departments
Innovation and Continuous Improvement
You actively seek out colleagues in order to share thoughts and ideas that may be use or interest to them
Your share your ideas (creative) with colleagues and seek support from management in developing those ideas
You share information, insights or comments in order to improve an individual/an area of the business, when it would be easier to refrain from doing so.
Customer Focus
You know who your customer is and what problem the team is trying to solve
You consistently strive to provide a quality service and showcase Kainos positively
Developing Yourself and Others
You seek out new challenges that may stretch your abilities
You learn from people and ask for their ideas and opinions.
You are cooperative and ask others to participate in meetings/activities where you think that they can add value.
You manage your emotions and respond honestly and calmly when under pressure.
You are able to identify analyse a problem and either drill down to the root cause or escalate to another for help
You are quick to take considered action in order to achieve a positive outcome when faced with an opportunity or problem.
You explain technical or specialist information to new or less experienced colleagues to enable them to do their jobs
You have your own internal standards of performance which match or exceed those imposed by others
Planning and Organising
You plan your time effectively and consistently meet task deadlines
You keep honest records of your achievements to discuss with your manager during your 1-2-1
Job Specific Knowledge
You respect the need for you to do your role well and actively learn the functional and technical knowledge and skills that are necessary to do your job with a high level of accomplishment (determined)
You use appropriate tools, technology or process for the task
You take decisions independently and are able to get on with your job, escalating decisions only when appropriate", "Welcoming new customers to the company and being there to answer their queries.
");
INSERT INTO bands VALUES (8, "Trainee", "#115E67", "Commercial Awareness
You consistently cooperate with the business processes completing accurately and honestly e.g. timesheets/EOY review/travel requests
You willingly cooperate by volunteering to take on additional tasks that will benefit the business e.g. Recruitment events such as University careers fairs, EAYL open evening, Work experience mentoring
You understand how the business generates income
Communicating & Teamwork
You are open and honest in your opinions.
You respect others by attending meetings on time and contributing where appropriate
You forecast your annual leave so the team can plan for your absence
You understand how your job relates to others within your function.
You are aware of the consequences of your own behaviour and how this may affect others within the team
Innovation and Continuous Improvement
You seek advice where appropriate
You actively cooperate with the team and contribute to team discussions about improvement.
You are flexible when it comes to work assignments responsibility, location.
Customer Focus
You act in accordance with the Kainos values demonstrating through your behaviours and interactions with colleagues and customers
Developing Yourself and Others
You are flexible and willing to learn
You set SMART objectives in Workday and discuss and agree with your manager
Planning and Organising
You make sure that you understand the task that you are required to deliver and escalate to your manager if you are unsure of what is required from you
You understand the timelines for your tasks and plan your time effectively to ensure that deadlines are met
You are honest and escalate to your manager if you do not believe that you can complete your tasks within the specified time
Job Specific Knowledge
You actively cooperate and participate in training completing all pre and post training work
You understand the investment that the company has made in you and set personal development goals to allow you to address gaps and advance to an Associate level within 18 months of joining the company",
"Researching and accessing new learning resources as necessary.
Submitting forms and documentation by the required deadlines");
INSERT INTO bands VALUES (9, "Apprentice", "#ed8941", "Competency framework doesn't directly apply at this Job Level for now. Please see Associate to assist with your career planning.", 
"Exhibit an enthusiasm to learn and an interest in your job role.
Complete training assignments.");

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
INSERT INTO capabilities VALUES (7, "Cyber Security", 2);
INSERT INTO capabilities VALUES (8, "Product", 3);
INSERT INTO capabilities VALUES (9, "UX Design", 4);
INSERT INTO capabilities VALUES (10, "Creative Design", 4);
INSERT INTO capabilities VALUES (11, "People", 6);

-- roles
INSERT INTO roles VALUES (1, "Sales Director","role spec","Description", 1, 1, 2, NULL);
INSERT INTO roles VALUES (2, "Sales Executive","role spec","Description", 1, 1, 4, NULL);
INSERT INTO roles VALUES (3, "Sales Executive","role spec","Description", 1, 1, 5, NULL);
INSERT INTO roles VALUES (4, "Sales Associate","role spec","Description", 1, 1, 7, NULL);


INSERT INTO roles VALUES (5, "Lead Software Engineer","role spec","Description",2 , 2, 5, NULL);
INSERT INTO roles VALUES (6, "Software Engineer","role spec","Description",2 , 2, 6, NULL);
INSERT INTO roles VALUES (7, "Software Engineer","role spec","Description",2 , 2, 8, NULL);

INSERT INTO roles VALUES (8, "Senior Security Architect","role spec","Description",7 , 2, 4, NULL);
INSERT INTO roles VALUES (9, "Security Architect","role spec","Description",7 , 2, 5, NULL);
INSERT INTO roles VALUES (10, "Security Engineer","role spec","Description",7 , 2, 6, NULL);

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

INSERT INTO users VALUES (1, 'emp@test.com', 'hashedPassword', 0, 6, 'Employee');
INSERT INTO users VALUES (2, 'admin@test.com', 'hashedPassword', 1, 7, 'Admin');
