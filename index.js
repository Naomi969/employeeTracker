const connection = require('./connection');
const inquirer = require('inquirer');
const art = require('ascii-art');
const cTable = require('console.table');
const { restoreDefaultPrompts } = require('inquirer');

const titleScreen = () => {
    art.font("Employee Manager", 'doom')
        .then((rendered) => {
            console.log(art.style(rendered, 'black_bg+blue+blink+inverse\n'))
        }).catch((err) => {
        })
}

const runProgram = async () => {
    titleScreen();
    setTimeout(showAll, 10);
}

const showAll = () => {
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

const show = () => {
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

const add = () => {
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

const update = () => {
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
            // .then((answer) => {
            //     connection.query(`DELETE FROM employee WHERE ?`,
            //         {
            //             last_name: (answer.employees)
            //         },
            //         (err, res) => {
            //             if (err) throw err
            //             console.log(`${res.affectedRows} Deleted\n`)
            //             showEmployees();
            //         })
            // })
    })  
};

const remove = () => {
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

runProgram();