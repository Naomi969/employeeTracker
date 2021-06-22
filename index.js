const connection = require('./connection');
const query = require('./queries')
const inquirer = require('inquirer');
const art = require('ascii-art');
const consoleTable = require('console.table');
const { restoreDefaultPrompts } = require('inquirer');

const titleScreen = () => {
    art.font("Employee Tracker", 'doom')
        .then((rendered) => {
            console.log(art.style(rendered, 'black_bg+pink+blink+inverse\n'))
        }).catch((err) => {
        })
}

const start = async () => {
    titleScreen();
    setTimeout(showAll, 10);
}

const firstQuestion = () => {
    inquirer.prompt({
        name: 'userChoice',
        type: 'rawlist',
        message: 'What would you like to do?\n',
        choices: [
            'View All Employees',
            'Add Employee',
            'Remove Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'Remove Role',
            'View All Departments',
            'Add Department',
            'Remove Department',
            'End Program'
        ]
    })
        .then((answer) => {
            switch (answer.userChoice) {
                case 'Show All Info':
                    query.showAll()
                    break;
                case 'View All Employees':
                    show();
                    break;
                case 'Add Employee':
                    add();
                    break;
                case 'Remove Employee':
                    remove();
                    break;
                case 'Update Employee Role':
                    update();
                    break;
                case 'View All Roles':
                    showRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Remove Role':
                    removeRole();
                    break;
                case 'View All Departments':
                    showDpt();
                    break;
                case 'Add Department':
                    addDpt();
                    break;
                case 'Remove Department':
                    removeDpt();
                    break;
                case 'End Program':
                    connection.end();
                    break;
            }
        })
}


start();