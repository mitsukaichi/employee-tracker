const inquirer = require('inquirer');
const mysql = require('mysql2');
const question = require('./Assets/questions.js');

console.log(question);

const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'people_db'
    },
    console.log(`Connected to the classlist_db database.`)
);

function init() {
    inquirer
    .prompt(question.main_question)
    .then((response) => {
        let selectedAction = response.action_type[0];
        switch (selectedAction) {
            case "View all departments":
                db.query('SELECT id,name FROM department', function (err, results) {
                    if(results){
                        console.table(results);
                        return(results);
                    };
                    if(err){
                        console.log(err)
                    }
                });
                break;
            case "View all roles":
                db.query('SELECT role.id, title, salary, department.name FROM role LEFT JOIN department ON role.department_id = department.id', function (err, results) {
                    if(results){
                        console.table(results);
                    };
                    if(err){
                        console.log(err)
                    }
                });
                break;
            case "View all employees":
                db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, manager.first_name as manager_first_name, manager.last_name as manager_last_name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN (SELECT id, first_name, last_name from employee) AS manager ON employee.manager_id = manager.id', function (err, results) {
                    if(results){
                        console.table(results);
                    };
                    if(err){
                        console.log(err)
                    }
                });
                break;
            case "Add a department":
                inquirer
                .prompt(question.add_department)
                .then((response) => {
                    db.query('INSERT INTO department (name) VALUES (?)',[response.department_name], function (err, results){
                        if(results){
                            console.log('department is successfully added')
                        };
                        if(err){
                            console.log(err)
                        }
                    })
                });
                break;
            case "Add a role":
                question.getActiveDepartment((outputQuestion) => {
                    inquirer
                    .prompt(outputQuestion)
                    .then((response) => {
                        const {role_name, salary} = response;
                        db.query('SELECT id FROM department WHERE name = ?',[response.department[0]], function (err, results){
                            if(results){
                                db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)',[role_name, salary, results[0].id], function (err, results){
                                    if(results){
                                        console.log("New role is added");
                                    };
                                    if(err){
                                        console.log(err);
                                    }
                                })
                            };
                            if(err){
                                console.log(err)
                            }
                        })
                    });
                });    
                break;
            case "Add an employee":
                question.addEmployee().then((outputQuestion) => {
                    inquirer
                    .prompt(outputQuestion)
                    .then((response) => {
                        const {employee_first_name, employee_last_name} = response;
                        const employee_role = response.employee_role[0];
                        const employee_manager = response.employee_manager[0];
                        db.query('SELECT id FROM role WHERE title = ?',[employee_role],function (err, results) {
                            if(results){
                                console.log(role_id);
                                db.query('SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = ?',[employee_manager], function (err, results) {
                                    if(results){
                                        const manager_id = results[0].id;
                                        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',[employee_first_name,employee_last_name,role_id,manager_id], function(err,results){
                                            if(results){
                                                console.log(`${employee_first_name} ${employee_last_name} was successfully added`)
                                            };
                                            if(err){
                                                console.log(err);
                                            }
                                        })
                                    }
                                    if(err){
                                        console.log(err)
                                    }
                                })
                            }
                            if(err){
                                console.log(err)
                            }
                        })
                        
                    })
                })
        }
    })
};

init();
  