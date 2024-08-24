use graderepo;



-- create table programs(
-- 	id int auto_increment primary key,
-- 	programName varchar(50),
-- 	programCode varchar(50)
-- );

-- create table users(
-- 	id int auto_increment primary key,
--     firstName varchar(50),
--     lastName varchar(50),
--     email varchar(50) not null unique,
--     password varchar(50),
--     role varchar(50),
--     yearLevel int,
--     programId int,
--     foreign key (programId) references programs(id)
-- );



-- insert into users(firstName, lastName, email, password, role, yearLevel, programId)values 
-- ('John', 'Doe', 'john.doe@example.com', 'hashed_password_1', 'student', 1, 1),
-- ('Liane', 'Moth', 'lianemoth16@example.com', 'hashed_password_4', 'student', 2, 2),
-- ('Vernel', 'Patriarca', 'patriarca15@gmail.com', 'vernel69', 'student', 1, 3);


-- create table bsaCurriculum(
-- 	id int primary key auto_increment,
--     courseCode varchar(50),
--     courseTitle varchar(50)
-- );


-- create table bsbaCurriculum(
-- 	id int primary key auto_increment,
--     courseCode varchar(50),
--     courseTitle varchar(50)
-- );



-- create table bsmaCurriculum(
-- 	id int primary key auto_increment,
--     courseCode varchar(50),
--     courseTitle varchar(50)
-- );


-- insert into programs(programName, programCode) values
-- ('Bachelor of Science in Accountancy', 'BSA'),
-- ('Bachelor of Science in Business Administration', 'BSBA'),
-- ('Bachelor of Science in Management Accounting', 'BSMA');

-- INSERT INTO bsaCurriculum (courseCode, courseTitle) VALUES
--     ('ACCT 101', 'Financial Accounting and Reporting'),
--     ('ACCT 102', 'Management Accounting'),
--     ('TAX 101', 'Taxation'),
--     ('LAW 201', 'Business Law and Taxation'),
--     ('BCOM 101', 'Business Communication'),
--     ('ECON 101', 'Economics'),
--     ('STAT 101', 'Business Statistics'),
--     ('OB 101', 'Organizational Behavior'),
--     ('ETH 101', 'Business Ethics'),
--     ('PDV 101', 'Professional Development and Ethics'),
--     ('ACCT 201', 'Advanced Financial Accounting'),
--     ('ACCT 202', 'Auditing and Assurance Services'),
--     ('ACCT 203', 'Cost Accounting'),
--     ('FIN 101', 'Financial Management'),
--     ('RES 201', 'Business Research'),
--     ('MIS 101', 'Management Information Systems'),
--     ('IBT 201', 'International Business and Trade'),
--     ('QTB 201', 'Quantitative Techniques in Business'),
--     ('BANA 301', 'Business Analytics'),
--     ('ECOM 201', 'E-Commerce'),
--     ('CFIN 301', 'Corporate Finance'),
--     ('FIN 201', 'Investment Management'),
--     ('BFI 201', 'Banking and Financial Institutions'),
--     ('RISK 201', 'Risk Management'),
--     ('FMI 301', 'Financial Markets and Institutions'),
--     ('MGMT 301', 'Strategic Management'),
--     ('LEAD 301', 'Leadership and Management'),
--     ('OPS 101', 'Operations Management'),
--     ('CSR 201', 'Corporate Social Responsibility'),
--     ('MIT 301', 'Management of Information Technology'),
--     ('SFM 401', 'Strategic Financial Management'),
--     ('CGOV 301', 'Corporate Governance'),
--     ('PMGT 201', 'Project Management'),
--     ('ENTR 101', 'Entrepreneurship'),
--     ('MKTG 101', 'Marketing Management'),
--     ('HRM 101', 'Human Resource Management'),
--     ('MKTG 201', 'Consumer Behavior'),
--     ('MKTG 301', 'Sales Management'),
--     ('IMKTG 301', 'International Marketing'),
--     ('OB 101', 'Organizational Behavior');


-- INSERT INTO bsbaCurriculum (courseCode, courseTitle) VALUES
--     ('ACCT 101', 'Financial Accounting and Reporting'),
--     ('FIN 101', 'Financial Management'),
--     ('MKTG 101', 'Marketing Management'),
--     ('HRM 101', 'Human Resource Management'),
--     ('ECON 101', 'Economics'),
--     ('STAT 101', 'Business Statistics'),
--     ('OB 101', 'Organizational Behavior'),
--     ('BCOM 101', 'Business Communication'),
--     ('ETH 101', 'Business Ethics'),
--     ('PDV 101', 'Professional Development and Ethics'),
--     ('ACCT 102', 'Management Accounting'),
--     ('RES 201', 'Business Research'),
--     ('MIS 101', 'Management Information Systems'),
--     ('IBT 201', 'International Business and Trade'),
--     ('QTB 201', 'Quantitative Techniques in Business'),
--     ('ECOM 201', 'E-Commerce'),
--     ('BPO 201', 'Business Process Outsourcing'),
--     ('CSR 201', 'Corporate Social Responsibility'),
--     ('ENTR 101', 'Entrepreneurship'),
--     ('LEAD 301', 'Leadership and Management'),
--     ('MGMT 301', 'Strategic Management'),
--     ('FIN 201', 'Investment Management'),
--     ('MKTG 201', 'Consumer Behavior'),
--     ('RISK 201', 'Risk Management'),
--     ('BANA 301', 'Business Analytics'),
--     ('PMGT 201', 'Project Management'),
--     ('MIT 301', 'Management of Information Technology'),
--     ('CGOV 301', 'Corporate Governance'),
--     ('OPS 101', 'Operations Management'),
--     ('FMI 301', 'Financial Markets and Institutions'),
--     ('SFM 401', 'Strategic Financial Management'),
--     ('CFIN 301', 'Corporate Finance'),
--     ('BFI 201', 'Banking and Financial Institutions'),
--     ('MKTG 301', 'Sales Management'),
--     ('IMKTG 301', 'International Marketing'),
--     ('LAW 201', 'Business Law and Taxation'),
--     ('TAX 101', 'Taxation'),
--     ('ACCT 201', 'Advanced Financial Accounting'),
--     ('ACCT 202', 'Auditing and Assurance Services'),
--     ('ACCT 203', 'Cost Accounting');

-- INSERT INTO bsmaCurriculum (courseCode, courseTitle) VALUES
--     ('ACCT 101', 'Financial Accounting and Reporting'),
--     ('ACCT 102', 'Management Accounting'),
--     ('FIN 101', 'Financial Management'),
--     ('MKTG 101', 'Marketing Management'),
--     ('ECON 101', 'Economics'),
--     ('STAT 101', 'Business Statistics'),
--     ('OB 101', 'Organizational Behavior'),
--     ('BCOM 101', 'Business Communication'),
--     ('ETH 101', 'Business Ethics'),
--     ('PDV 101', 'Professional Development and Ethics'),
--     ('ACCT 201', 'Advanced Financial Accounting'),
--     ('ACCT 202', 'Auditing and Assurance Services'),
--     ('ACCT 203', 'Cost Accounting'),
--     ('RES 201', 'Business Research'),
--     ('MIS 101', 'Management Information Systems'),
--     ('IBT 201', 'International Business and Trade'),
--     ('QTB 201', 'Quantitative Techniques in Business'),
--     ('ECOM 201', 'E-Commerce'),
--     ('CSR 201', 'Corporate Social Responsibility'),
--     ('LEAD 301', 'Leadership and Management'),
--     ('CFIN 301', 'Corporate Finance'),
--     ('FIN 201', 'Investment Management'),
--     ('BFI 201', 'Banking and Financial Institutions'),
--     ('RISK 201', 'Risk Management'),
--     ('FMI 301', 'Financial Markets and Institutions'),
--     ('MGMT 301', 'Strategic Management'),
--     ('BANA 301', 'Business Analytics'),
--     ('OPS 101', 'Operations Management'),
--     ('MIT 301', 'Management of Information Technology'),
--     ('CGOV 301', 'Corporate Governance'),
--     ('SFM 401', 'Strategic Financial Management'),
--     ('PMGT 201', 'Project Management'),
--     ('ENTR 101', 'Entrepreneurship'),
--     ('MKTG 201', 'Consumer Behavior'),
--     ('MKTG 301', 'Sales Management'),
--     ('IMKTG 301', 'International Marketing'),
--     ('LAW 201', 'Business Law and Taxation'),
--     ('TAX 101', 'Taxation'),
--     ('HRM 101', 'Human Resource Management'),
--     ('OB 101', 'Organizational Behavior');

-- CREATE TABLE bsaStudentRecords(
-- 	id int primary key auto_increment,
--     studentId int,
--     courseId int,
--     grade int,
--     foreign key (studentId) references users(id) on delete cascade,
--     foreign key (courseId) references bsaCurriculum(id) on delete cascade
-- );

-- CREATE TABLE bsbaStudentRecords(
-- 	id int primary key auto_increment,
--     studentId int,
--     courseId int,
--     grade int,
--     foreign key (studentId) references users(id) on delete cascade,
--     foreign key (courseId) references bsbaCurriculum(id) on delete cascade
-- );

-- CREATE TABLE bsmaStudentRecords(
-- 	id int primary key auto_increment,
--     studentId int,
--     courseId int,
--     grade int,
--     foreign key (studentId) references users(id) on delete cascade,
--     foreign key (courseId) references bsmaCurriculum(id) on delete cascade
-- );


-- INSERT INTO bsmaStudentRecords (studentId, courseId)
-- SELECT 3, id FROM bsmaCurriculum;





