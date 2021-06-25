class Queries {
    showAll() {
        console.log(` \n`)
        connection.query(
            `SELECT e.id "ID", e.first_name "First Name", e.last_name "Last Name", r.title "Title", d.name "Department", r.salary "Salary", 
            CONCAT (m.first_name, " ", m.last_name) "Manager" 
            FROM EMPLOYEE e
            LEFT JOIN ROLE r
            ON r.id = e.role_id
            LEFT JOIN DEPARTMENT d
            ON d.id = r.department_id
            LEFT JOIN EMPLOYEE m
            ON m.id = e.manager_id
            ORDER BY id;\n`,
            (err, res) => {
                if (err) throw err;
                console.table(res)
            })
        setTimeout(firstQuestion, 30);
    }
    
    show()  {
        console.log(` \n`)
        connection.query(
            `SELECT e.id "ID", e.first_name "First Name", e.last_name "Last Name" FROM EMPLOYEE e;`,
            (err, res) => {
                if (err) throw err;
                console.table(res)
            }).then
        setTimeout(console.log(` \n`), 10)
        setTimeout(firstQuestion, 100)
    };
    
    add() {
        connection.query(`SELECT * FROM ROLE;`, (err, res) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: `first_name`,
                    type: `input`,
                    message: `Enter Employee First Name:`,
                },
                {
                    name: `last_name`,
                    type: `input`,
                    message: `Enter Employee Last Name:`,
                },
                {
                    name: `role`,
                    type: `input`,
                    message() {
                        const newEmployeeArray = [];
                        res.forEach(({ title, id }) => {
                            newEmployeeArray.push(id + ' = ' + title);
                        });
                        console.log(`What is the emplyee's role ID?\n`)
                        return newEmployeeArray.join(`\n`)
                    },
                    validate: (answer) => {
                        if (isNaN(answer)) {
                            return "Please enter the ID number";
                        }
                        return true;
                    },
                }
            ])
                .then((answer) => {
                    connection.query(
                        `INSERT INTO EMPLOYEE SET ?`,
                        [
                            {
                                first_name: answer.first_name,
                                last_name: answer.last_name,
                                role_id: answer.role
                            },
                        ],
                        (err, res) => {
                            if (err) throw err;
                            console.log(`${res.affectedRows} employee added. \n`)
                            show();
                        })
                })
        })
    }
    
    update() {
        connection.query(`SELECT * FROM EMPLOYEE;`, (err, res) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: `employees`,
                    type: `rawlist`,
                    message: `Which employee would you like to update?\n`,
                    choices() {
                        const employeesArray = [];
                        res.forEach(({ id, first_name, last_name }) => {
                            employeesArray.push(`${id} ${first_name} ${last_name}`);
                        });
                        return employeesArray;
                    },
                },
            ])
        })  
    };
    
    remove() {
        connection.query(`SELECT * FROM EMPLOYEE;`, (err, res) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: `employees`,
                    type: `rawlist`,
                    message: `Which employee would you like to remove?\n`,
                    choices() {
                        const employeesArray = [];
                        res.forEach(({ last_name }) => {
                            employeesArray.push(last_name);
                        });
                        return employeesArray;
                    },
                },
            ])
                .then((answer) => {
                    connection.query(`DELETE FROM EMPLOYEE WHERE ?`,
                        {
                            last_name: (answer.employees)
                        },
                        (err, res) => {
                            if (err) throw err
                            console.log(`${res.affectedRows} Deleted\n`)
                            show();
                        })
                })
        })
    };
    
    showRoles () {
        console.log(` \n`)
        connection.query(
            `SELECT r.id "ID", r.title "title" FROM ROLE r;`,
            (err, res) => {
                if (err) throw err;
                console.table(res)
            })
        setTimeout(console.log(` \n`), 10)
        setTimeout(firstQuestion, 100)
    };
    
    addRole() {
        connection.query(`SELECT * FROM DEPARTMENT`, (err, res) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: `title`,
                    type: `input`,
                    message: `Enter New Role:`,
                },
                {
                    name: `salary`,
                    type: `input`,
                    message: `Enter Salary:`,
                },
                {
                    name: `department`,
                    type: `input`,
                    message() {
                        const departmentArray = [];
                        res.forEach(({ name, id }) => {
                            departmentArray.push(id + ' = ' + name);
                        });
                        console.log(`What is the Department ID?\n`)
                        return departmentArray.join(`\n`)
                    },
                    validate: (answer) => {
                        if (isNaN(answer)) {
                            return "Please enter the ID number";
                        }
                        return true;
                    },
                }
            ])
                .then((answer) => {
                    connection.query(
                        `INSERT INTO ROLE SET ?`,
                        [
                            {
                                title: answer.title,
                                salary: answer.salary,
                                department_id: answer.department
                            },
                        ],
                        (err, res) => {
                            if (err) throw err;
                            console.log(`${res.affectedRows} new role added. \n`)
                            showRoles();
                        })
                })
        })
    };
    
    removeRole()  {
        connection.query(`SELECT * FROM ROLE;`, (err, res) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: `roles`,
                    type: `rawlist`,
                    message: `Which role would you like to remove?"\n`,
                    choices() {
                        const rolesArray = [];
                        res.forEach(({ title }) => {
                            rolesArray.push(title);
                        });
                        return rolesArray;
                    },
                },
            ])
                .then((answer) => {
                    connection.query(`DELETE FROM ROLE WHERE ?`,
                        {
                            title: (answer.roles)
                        },
                        (err, res) => {
                            if (err) throw err
                            console.log(`${res.affectedRows} Deleted\n`)
                            showRoles();
                        })
                })
        })
    };
    
    showDpt()  {
        connection.query(
            `SELECT * FROM DEPARTMENT;`,
            (err, res) => {
                if (err) throw err;
                console.table(res)
            })
        setTimeout(console.log(` \n`), 10)
        setTimeout(firstQuestion, 100)
    };
    
    addDpt() {
        inquirer.prompt([
            {
                name: `name`,
                type: `input`,
                message: `Enter New Department:`,
            }
        ])
            .then((answer) => {
                connection.query(
                    `INSERT INTO DEPARTMENT SET ?`,
                    [
                        {
                            name: answer.name,
                        },
                    ],
                    (err, res) => {
                        if (err) throw err;
                        console.log(`${res.affectedRows} new department added. \n`)
                        showDepartments();
                    })
            })
    };
    
    removeDpt() {
        connection.query(`SELECT * FROM DEPARTMENT;`, (err, res) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: `departments`,
                    type: `rawlist`,
                    message: `Which department would you like to remove?"\n`,
                    choices() {
                        const departmentsArray = [];
                        res.forEach(({ name }) => {
                            departmentsArray.push(name);
                        });
                        return departmentsArray;
                    },
                },
            ])
                .then((answer) => {
                    connection.query(`DELETE FROM DEPARTMENT WHERE ?`,
                        {
                            name: (answer.departments)
                        },
                        (err, res) => {
                            if (err) throw err
                            console.log(`${res.affectedRows} Deleted\n`)
                            showDepartments();
                        })
                })
        })
    };
}

// export const f = [
//     showAll(),
//     show(),
//     add(),
//     remove(),
//     update(),
//     showRole(),
//     addRole(),
//     removeRole(),
//     showDpt(),
//     removeDpt
// ]
module.exports = new Queries;

// export {showAll,
//         show,
//         add,
//         remove,
//         update,
//         showRole,
//         addRole,
//         removeRole,
//         showDpt,
//         removeDpt
//     }