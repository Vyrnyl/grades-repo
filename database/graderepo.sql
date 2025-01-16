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
-- ('Liane', 'Moth', 'lianemh16@example.com', 'hashed_password_4', 'student', 2, 2),
-- ('Vernel', 'Patriarca', 'triarca15@gmail.com', 'vernel69', 'student', 1, 3);


-- create table bsaCurricum(
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
-- 	id int primary key auto_irement,
--     studentId int,
--     courseId int,
--     gre int,
--     foreign key (studentId) references users(id) on delete casde,
--     foreign key (courseId) references bsaCurriculum(id) on delete cascade
-- );

-- CREATE TABLE bsaStudentRecords(
-- 	id int primary key auto_irement,
--     studentId int,
--     courseId int,
--     gre int,
--     foreign key (studentId) references users(id) on delete casde,
--     foreign key (courseId) references bsbaCurriculum(id) on delete cascade
-- );

-- CREATE TABLE bsmaStudentRecords(
-- 	id int primary key auto_irement,
--     studentId int,
--     courseId int,
--     gre int,
--     foreign key (studentId) references users(id) on delete casde,
--     foreign key (courseId) references bsmaCurriculum(id) on delete cascade
-- );


-- INSERT INTO bsmaStudentRecords (studentId, courseId)
-- SELEC3, id FROM bsmurriculum;





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
    "firstName": "Kai",
    "lastName": "Lee",
    "email": "kai.lee@gmail.com",
    "password": "kai123",
    "role": "student",
    "confirmPassword": "kai123",
    "programId": 1,
    "status": "Enrolled"
  },
  {
    "studentId": "2021-03167",
    "firstName": "Jay",
    "lastName": "Park",
    "email": "jay@gmail.com",
    "password": "jay123",
    "role": "student",
    "confirmPassword": "jay123",
    "programId": 2,
    "status": "Enrolled"
  },
  {
    "studentId": "2021-03168",
    "firstName": "Mia",
    "lastName": "Wang",
    "email": "mia@gmail.com",
    "password": "mia123",
    "role": "student",
    "confirmPassword": "mia123",
    "programId": 2,
    "status": "Enrolled"
  },
  {
    "studentId": "2021-04167",
    "firstName": "Liam",
    "lastName": "Chen",
    "email": "liam@gmail.com",
    "password": "liam123",
    "role": "student",
    "confirmPassword": "liam123",
    "programId": 3,
    "status": "Enrolled"
  },
  {
    "studentId": "2021-04168",
    "firstName": "Nina",
    "lastName": "Kim",
    "email": "nina@gmail.com",
    "password": "nina123",
    "role": "student",
    "confirmPassword": "nina123",
    "programId": 3,
    "status": "Enrolled"
  },
  {
    "studentId": "2021-05167",
    "firstName": "Chris",
    "lastName": "Tan",
    "email": "chris@gmail.com",
    "password": "chris123",
    "role": "student",
    "confirmPassword": "chris123",
    "programId": 4,
    "status": "Enrolled"
  },
  {
    "studentId": "2021-05168",
    "firstName": "Ella",
    "lastName": "Xu",
    "email": "ella@gmail.com",
    "password": "ella123",
    "role": "student",
    "confirmPassword": "ella123",
    "programId": 4,
    "status": "Enrolled"
  },
  {
    "studentId": "2021-06167",
    "firstName": "Mark",
    "lastName": "Lim",
    "email": "mark@gmail.com",
    "password": "mark123",
    "role": "student",
    "confirmPassword": "mark123",
    "programId": 5,
    "status": "Enrolled"
  },
  {
    "studentId": "2021-06168",
    "firstName": "Sophie",
    "lastName": "Ng",
    "email": "sophie@gmail.com",
    "password": "sophie123",
    "role": "student",
    "confirmPassword": "sophie123",
    "programId": 5,
    "status": "Enrolled"
  }



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
    "studentId": "2146",
    "firstName": "Brian",
    "lastName": "Smith",
    "email": "brian@gmail.com",
    "password": "brian123",
    "role": "faculty",
    "confirmPassword": "brian123",
    "status": "Active"
  },
  {
    "studentId": "2147",
    "firstName": "Claire",
    "lastName": "Davis",
    "email": "claire@gmail.com",
    "password": "claire123",
    "role": "faculty",
    "confirmPassword": "claire123",
    "status": "Active"
  },
  {
    "studentId": "2148",
    "firstName": "David",
    "lastName": "Lee",
    "email": "david@gmail.com",
    "password": "david123",
    "role": "faculty",
    "confirmPassword": "david123",
    "status": "Active"
  },
  {
    "studentId": "2149",
    "firstName": "Emily",
    "lastName": "Johnson",
    "email": "emily@gmail.com",
    "password": "emily123",
    "role": "faculty",
    "confirmPassword": "emily123",
    "status": "Active"
  },
  {
    "studentId": "2150",
    "firstName": "Frank",
    "lastName": "Miller",
    "email": "frank@gmail.com",
    "password": "frank123",
    "role": "faculty",
    "confirmPassword": "frank123",
    "status": "Active"
  },
  {
    "studentId": "2151",
    "firstName": "Grace",
    "lastName": "Wilson",
    "email": "grace@gmail.com",
    "password": "grace123",
    "role": "faculty",
    "confirmPassword": "grace123",
    "status": "Active"
  },
  {
    "studentId": "2152",
    "firstName": "Henry",
    "lastName": "Garcia",
    "email": "henry@gmail.com",
    "password": "henry123",
    "role": "faculty",
    "confirmPassword": "henry123",
    "status": "Active"
  },
  {
    "studentId": "2153",
    "firstName": "Isla",
    "lastName": "Martinez",
    "email": "isla@gmail.com",
    "password": "isla123",
    "role": "faculty",
    "confirmPassword": "isla123",
    "status": "Active"
  },
  {
    "studentId": "2154",
    "firstName": "Jack",
    "lastName": "Brown",
    "email": "jack@gmail.com",
    "password": "jack123",
    "role": "faculty",
    "confirmPassword": "jack123",
    "status": "Active"
  }
]


UPDATE bsisstudentrecord SET grade = 1.8 WHERE userId = 37 AND courseId = 1;
UPDATE bsisstudentrecord SET grade = 1.6 WHERE userId = 37 AND courseId = 2;
UPDATE bsisstudentrecord SET grade = 1.3 WHERE userId = 37 AND courseId = 3;
UPDATE bsisstudentrecord SET grade = 1.1 WHERE userId = 37 AND courseId = 4;
UPDATE bsisstudentrecord SET grade = 1.9 WHERE userId = 37 AND courseId = 5;
UPDATE bsisstudentrecord SET grade = 1.3 WHERE userId = 37 AND courseId = 6;
UPDATE bsisstudentrecord SET grade = 1.5 WHERE userId = 37 AND courseId = 7;
UPDATE bsisstudentrecord SET grade = 1.9 WHERE userId = 37 AND courseId = 8;

UPDATE bsisstudentrecord SET grade = 1.8 WHERE userId = 37 AND courseId = 9;
UPDATE bsisstudentrecord SET grade = 1.7 WHERE userId = 37 AND courseId = 10;
UPDATE bsisstudentrecord SET grade = 1.3 WHERE userId = 37 AND courseId = 11;
UPDATE bsisstudentrecord SET grade = 1.7 WHERE userId = 37 AND courseId = 12;
UPDATE bsisstudentrecord SET grade = 1.4 WHERE userId = 37 AND courseId = 13;
UPDATE bsisstudentrecord SET grade = 1.2 WHERE userId = 37 AND courseId = 14;
UPDATE bsisstudentrecord SET grade = 1.6 WHERE userId = 37 AND courseId = 15;
UPDATE bsisstudentrecord SET grade = 1.5 WHERE userId = 37 AND courseId = 16;
UPDATE bsisstudentrecord SET grade = 1.9 WHERE userId = 37 AND courseId = 17;
UPDATE bsisstudentrecord SET grade = 1.3 WHERE userId = 37 AND courseId = 18;
UPDATE bsisstudentrecord SET grade = 1.4 WHERE userId = 37 AND courseId = 19;
UPDATE bsisstudentrecord SET grade = 1.8 WHERE userId = 37 AND courseId = 20;
UPDATE bsisstudentrecord SET grade = 1.3 WHERE userId = 37 AND courseId = 21;
UPDATE bsisstudentrecord SET grade = 1.3 WHERE userId = 37 AND courseId = 22;
UPDATE bsisstudentrecord SET grade = 1.1 WHERE userId = 37 AND courseId = 23;
UPDATE bsisstudentrecord SET grade = 1.7 WHERE userId = 37 AND courseId = 24;
UPDATE bsisstudentrecord SET grade = 1.8 WHERE userId = 37 AND courseId = 25;
UPDATE bsisstudentrecord SET grade = 1.9 WHERE userId = 37 AND courseId = 26;
UPDATE bsisstudentrecord SET grade = 1.5 WHERE userId = 37 AND courseId = 27;
UPDATE bsisstudentrecord SET grade = 1.7 WHERE userId = 37 AND courseId = 28;
UPDATE bsisstudentrecord SET grade = 1.2 WHERE userId = 37 AND courseId = 29;
UPDATE bsisstudentrecord SET grade = 1.4 WHERE userId = 37 AND courseId = 30;
UPDATE bsisstudentrecord SET grade = 1.5 WHERE userId = 37 AND courseId = 31;
UPDATE bsisstudentrecord SET grade = 1.6 WHERE userId = 37 AND courseId = 32;
UPDATE bsisstudentrecord SET grade = 1.3 WHERE userId = 37 AND courseId = 33;
UPDATE bsisstudentrecord SET grade = 1.9 WHERE userId = 37 AND courseId = 34;
UPDATE bsisstudentrecord SET grade = 1.1 WHERE userId = 37 AND courseId = 35;
UPDATE bsisstudentrecord SET grade = 1.8 WHERE userId = 37 AND courseId = 36;
UPDATE bsisstudentrecord SET grade = 1.6 WHERE userId = 37 AND courseId = 37;
UPDATE bsisstudentrecord SET grade = 1.9 WHERE userId = 37 AND courseId = 38;
UPDATE bsisstudentrecord SET grade = 1.3 WHERE userId = 37 AND courseId = 39;
UPDATE bsisstudentrecord SET grade = 1.7 WHERE userId = 37 AND courseId = 40;

UPDATE bsisstudentrecord SET grade = 1.9 WHERE userId = 37 AND courseId = 41;
UPDATE bsisstudentrecord SET grade = 1.3 WHERE userId = 37 AND courseId = 42;
UPDATE bsisstudentrecord SET grade = 1.5 WHERE userId = 37 AND courseId = 43;
UPDATE bsisstudentrecord SET grade = 1.9 WHERE userId = 37 AND courseId = 44;
UPDATE bsisstudentrecord SET grade = 1.8 WHERE userId = 37 AND courseId = 45;
UPDATE bsisstudentrecord SET grade = 1.7 WHERE userId = 37 AND courseId = 46;
UPDATE bsisstudentrecord SET grade = 1.3 WHERE userId = 37 AND courseId = 47;
UPDATE bsisstudentrecord SET grade = 1.7 WHERE userId = 37 AND courseId = 48;
UPDATE bsisstudentrecord SET grade = 1.4 WHERE userId = 37 AND courseId = 49;
UPDATE bsisstudentrecord SET grade = 1.4 WHERE userId = 37 AND courseId = 50;
UPDATE bsisstudentrecord SET grade = 1.4 WHERE userId = 37 AND courseId = 51;