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


-- insert into program(programName, programCode) values
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
--     ('OB 102', 'Organizational Behavior 2'),
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
--     ('OB 102', 'Organizational Behavior 2'),
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

-- CREATE TABLE bsaStudentRecords(
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





-- INSERT DATA
{
    "firstName": "Admin",
    "lastName": "Admin",
    "email": "admin@gmail.com",
    "password": "admin123",
    "role": "admin",
    "confirmPassword": "admin123"
  }
[
  {
    "studentId": "2021-02167",
    "firstName": "Shang",
    "lastName": "Gem",
    "email": "shang@gmail.com",
    "password": "shang123",
    "role": "student",
    "confirmPassword": "shang123",
    "programId": 1,
    "status": "Enrolled"
  },
  {
    "studentId": "2021-02168",
    "firstName": "Mika",
    "lastName": "Cruz",
    "email": "mika@gmail.com",
    "password": "mika123",
    "role": "student",
    "confirmPassword": "mika123",
    "programId": 2,
    "status": "Enrolled"
  },
   {
    "studentId": "2021-02170",
    "firstName": "Lara",
    "lastName": "Smith",
    "email": "lara@gmail.com",
    "password": "lara123",
    "role": "student",
    "confirmPassword": "lara123",
    "programId": 3,
    "status": "Enrolled"
  },
  {
    "studentId": "2021-02169",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@gmail.com",
    "password": "john123",
    "role": "student",
    "confirmPassword": "john123",
    "programId": 3,
    "status": "Unenrolled"
  },
  {
    "studentId": "2021-02171",
    "firstName": "James",
    "lastName": "Brown",
    "email": "james@gmail.com",
    "password": "james123",
    "role": "student",
    "confirmPassword": "james123",
    "programId": 2,
    "status": "Enrolled"
  },
  {
    "studentId": "2021-02172",
    "firstName": "Sophia",
    "lastName": "Lee",
    "email": "sophia@gmail.com",
    "password": "sophia123",
    "role": "student",
    "confirmPassword": "sophia123",
    "programId": 3,
    "status": "Unenrolled"
  },
  {
    "studentId": "2021-02173",
    "firstName": "Jake",
    "lastName": "Wilson",
    "email": "jake@gmail.com",
    "password": "jake123",
    "role": "student",
    "confirmPassword": "jake123",
    "programId": 1,
    "status": "Enrolled"
  },
  {
    "studentId": "2021-02174",
    "firstName": "Lucy",
    "lastName": "Kim",
    "email": "lucy@gmail.com",
    "password": "lucy123",
    "role": "student",
    "confirmPassword": "lucy123",
    "programId": 2,
    "status": "Unenrolled"
  },
  {
    "studentId": "2021-02175",
    "firstName": "Tom",
    "lastName": "Clark",
    "email": "tom@gmail.com",
    "password": "tom123",
    "role": "student",
    "confirmPassword": "tom123",
    "programId": 3,
    "status": "Enrolled"
  },
  {
    "studentId": "2021-02176",
    "firstName": "Ella",
    "lastName": "Martinez",
    "email": "ella@gmail.com",
    "password": "ella123",
    "role": "student",
    "confirmPassword": "ella123",
    "programId": 1,
    "status": "Unenrolled"
  },
  {
    "studentId": "2145",
    "firstName": "Anna",
    "lastName": "Nguyen",
    "email": "anna@gmail.com",
    "password": "anna123",
    "role": "faculty",
    "confirmPassword": "anna123",
    "status": "Active"
  },
  {
    "studentId": "2145",
    "firstName": "Ben",
    "lastName": "Perez",
    "email": "ben@gmail.com",
    "password": "ben123",
    "role": "faculty",
    "confirmPassword": "ben123",
    "status": "Inactive"
  },
  {
    "studentId": "2145",
    "firstName": "Cathy",
    "lastName": "Garcia",
    "email": "cathy@gmail.com",
    "password": "cathy123",
    "role": "faculty",
    "confirmPassword": "cathy123",
    "status": "Active"
  },
  {
    "studentId": "2145",
    "firstName": "Daniel",
    "lastName": "Jones",
    "email": "daniel@gmail.com",
    "password": "daniel123",
    "role": "faculty",
    "confirmPassword": "daniel123",
    "status": "Inactive"
  },
  {
    "studentId": "2145",
    "firstName": "Eva",
    "lastName": "Hernandez",
    "email": "eva@gmail.com",
    "password": "eva123",
    "role": "faculty",
    "confirmPassword": "eva123",
    "status": "Active"
  },
  {
    "studentId": "2145",
    "firstName": "Frank",
    "lastName": "Martinez",
    "email": "frank@gmail.com",
    "password": "frank123",
    "role": "faculty",
    "confirmPassword": "frank123",
    "status": "Inactive"
  },
  {
    "studentId": "2145",
    "firstName": "Grace",
    "lastName": "Wilson",
    "email": "grace@gmail.com",
    "password": "grace123",
    "role": "faculty",
    "confirmPassword": "grace123",
    "status": "Active"
  },
  {
    "studentId": "2145",
    "firstName": "Hank",
    "lastName": "Moore",
    "email": "hank@gmail.com",
    "password": "hank123",
    "role": "faculty",
    "confirmPassword": "hank123",
    "status": "Inactive"
  },
  {
    "studentId": "2145",
    "firstName": "Ivy",
    "lastName": "Scott",
    "email": "ivy@gmail.com",
    "password": "ivy123",
    "role": "faculty",
    "confirmPassword": "ivy123",
    "status": "Active"
  },
  {
    "studentId": "2145",
    "firstName": "Jack",
    "lastName": "Young",
    "email": "jack@gmail.com",
    "password": "jack123",
    "role": "faculty",
    "confirmPassword": "jack123",
    "status": "Inactive"
  }
]


UPDATE bsbastudentrecord SET grade = 1.8 WHERE userId = 19 AND courseId = 1;
UPDATE bsbastudentrecord SET grade = 1.6 WHERE userId = 19 AND courseId = 2;
UPDATE bsbastudentrecord SET grade = 1.0 WHERE userId = 19 AND courseId = 3;
UPDATE bsbastudentrecord SET grade = 1.1 WHERE userId = 19 AND courseId = 4;
UPDATE bsbastudentrecord SET grade = 1.9 WHERE userId = 19 AND courseId = 5;
UPDATE bsbastudentrecord SET grade = 1.3 WHERE userId = 19 AND courseId = 6;
UPDATE bsbastudentrecord SET grade = 1.5 WHERE userId = 19 AND courseId = 7;
UPDATE bsbastudentrecord SET grade = 1.9 WHERE userId = 19 AND courseId = 8;
UPDATE bsbastudentrecord SET grade = 1.8 WHERE userId = 19 AND courseId = 9;
UPDATE bsbastudentrecord SET grade = 1.7 WHERE userId = 19 AND courseId = 10;
UPDATE bsbastudentrecord SET grade = 1.0 WHERE userId = 19 AND courseId = 11;
UPDATE bsbastudentrecord SET grade = 1.7 WHERE userId = 19 AND courseId = 12;
UPDATE bsbastudentrecord SET grade = 1.4 WHERE userId = 19 AND courseId = 13;
UPDATE bsbastudentrecord SET grade = 1.2 WHERE userId = 19 AND courseId = 14;
UPDATE bsbastudentrecord SET grade = 1.6 WHERE userId = 19 AND courseId = 15;
UPDATE bsbastudentrecord SET grade = 1.5 WHERE userId = 19 AND courseId = 16;
UPDATE bsbastudentrecord SET grade = 1.9 WHERE userId = 19 AND courseId = 17;
UPDATE bsbastudentrecord SET grade = 1.3 WHERE userId = 19 AND courseId = 18;
UPDATE bsbastudentrecord SET grade = 1.4 WHERE userId = 19 AND courseId = 19;
UPDATE bsbastudentrecord SET grade = 1.8 WHERE userId = 19 AND courseId = 20;
UPDATE bsbastudentrecord SET grade = 1.0 WHERE userId = 19 AND courseId = 21;
UPDATE bsbastudentrecord SET grade = 1.0 WHERE userId = 19 AND courseId = 22;
UPDATE bsbastudentrecord SET grade = 1.1 WHERE userId = 19 AND courseId = 23;
UPDATE bsbastudentrecord SET grade = 1.7 WHERE userId = 19 AND courseId = 24;
UPDATE bsbastudentrecord SET grade = 1.8 WHERE userId = 19 AND courseId = 25;
UPDATE bsbastudentrecord SET grade = 1.9 WHERE userId = 19 AND courseId = 26;
UPDATE bsbastudentrecord SET grade = 1.5 WHERE userId = 19 AND courseId = 27;
UPDATE bsbastudentrecord SET grade = 1.7 WHERE userId = 19 AND courseId = 28;
UPDATE bsbastudentrecord SET grade = 1.2 WHERE userId = 19 AND courseId = 29;
UPDATE bsbastudentrecord SET grade = 1.4 WHERE userId = 19 AND courseId = 30;
UPDATE bsbastudentrecord SET grade = 1.5 WHERE userId = 19 AND courseId = 31;
UPDATE bsbastudentrecord SET grade = 1.6 WHERE userId = 19 AND courseId = 32;
UPDATE bsbastudentrecord SET grade = 1.0 WHERE userId = 19 AND courseId = 33;
UPDATE bsbastudentrecord SET grade = 1.9 WHERE userId = 19 AND courseId = 34;
UPDATE bsbastudentrecord SET grade = 1.1 WHERE userId = 19 AND courseId = 35;
UPDATE bsbastudentrecord SET grade = 1.8 WHERE userId = 19 AND courseId = 36;
UPDATE bsbastudentrecord SET grade = 1.6 WHERE userId = 19 AND courseId = 37;
UPDATE bsbastudentrecord SET grade = 1.9 WHERE userId = 19 AND courseId = 38;
UPDATE bsbastudentrecord SET grade = 1.3 WHERE userId = 19 AND courseId = 39;
UPDATE bsbastudentrecord SET grade = 1.7 WHERE userId = 19 AND courseId = 40;
