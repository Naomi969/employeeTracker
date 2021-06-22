USE EmployeeTracker;

INSERT INTO EMPLOYEE (first_name, last_name, role_id, is_manager, manager_id)
VALUES ("Adriel", "Garcia", 8, 1, null),
("Joelys", "Gracia", 7, 1, 10),
("Daisy", "Padilla", 6, 0, 6),
("Alberto", "Serrano", 6, 1, 10),
("Angelica", "Serrano", 5, 0, null),
("Carlos", "Serrano", 5, 1, 10),
("Kevin", "Serrano", 6, 0, 6),
("Kenny", "Serrano", 7, 1, 6),
("Keysha", "Miranda", 2, 0, 1),
("Naomi", "Torres", 1, 1, 10);

SELECT * FROM EMPLOYEE;

INSERT INTO department (name)
VALUES ("Engineering"), 
("Finance"),
("Legal"),
("Sales");

SELECT * FROM DEPARTMENT;

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 4), 
("Salesperson", 80000, 4),
("Legal Team Lead", 250000, 3),
("Lawyer", 190000, 3),
("Lead Engineer", 150000, 1),
("Software Engineer", 120000, 1),
("Accountant", 125000, 2),
("Project Manager", 250000, 1);

SELECT * FROM ROLE;


SELECT e.id "ID", e.first_name "First Name", e.last_name "Last Name", r.title "Title", d.name "Department", r.salary "Salary", 
CONCAT (m.first_name, " ", m.last_name) "Manager" 
FROM EMPLOYEE e
LEFT JOIN role r
ON r.id = e.role_id
LEFT JOIN DEPARTMENT d
ON d.id = r.department_id
LEFT JOIN EMPLOYEE m
ON m.id = e.manager_id
ORDER BY id;
