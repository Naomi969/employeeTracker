
CREATE DATABASE EmployeeTracker;

USE EmployeeTracker;

CREATE TABLE DEPARTMENT (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE EMPLOYEE (
    id int NOT NULL AUTO_INCREMENT,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id int,
    is_manager boolean,
    manager_id int,
    PRIMARY KEY (id)
);

CREATE TABLE ROLE (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(30) NOT NULL,
    salary decimal(10,2) NOT NULL,
    department_id int,
    PRIMARY KEY (id)
);