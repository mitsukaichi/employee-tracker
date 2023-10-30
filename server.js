const inquirer = require('inquirer');
const mysql = require('mysql2');
const question = require('./Assets/questions.js');

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
        selectedAction = response.action_type[0];
        switch (selectedAction) {
            case "View all departments":
                db.query('SELECT id,name FROM department', function (err, result) {
                    if(result){
                        console.log("");
                        console.table(result);
                        init();
                    };
                    if(err){
                        console.log(err)
                    }
                });
                break;
            case "View all roles":
                db.query('SELECT role.id, title, salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id', function (err, result) {
                    if(result){
                        console.log("");
                        console.table(result);
                        init();
                    };
                    if(err){
                        console.log(err)
                    }
                });
                break;
            case "View all employees":
                db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN (SELECT id, first_name, last_name from employee) AS manager ON employee.manager_id = manager.id', function (err, result) {
                    if(result){
                        console.log("");
                        console.table(result);
                        init();
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
                    db.query('INSERT INTO department (name) VALUES (?)',[response.department_name], function (err, result){
                        if(result){
                            return(result);
                        };
                        if(err){
                            console.log(err)
                        }
                    })
                })
                .then((result) => {
                    console.log('department is successfully added');
                    init();
                })
                break;
            case "Add a role":
                question.getActiveDepartment((outputQuestion) => {
                    inquirer
                    .prompt(outputQuestion)
                    .then((response) => {
                        const {role_name, salary} = response;
                        db.query('SELECT id FROM department WHERE name = ?',[response.department[0]], function (err, results){
                            if(results){
                                db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)',[role_name, salary, results[0].id], function (err, result){
                                    if(result) {
                                        return(result);
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
                    })
                    .then((result) => {
                        console.log("New role is added");
                        init();
                    })
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
                                const role_id = results[0].id;
                                if (employee_manager === "None") {
                                    db.query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)',[employee_first_name,employee_last_name,role_id], function(err,result){
                                        if(result){
                                            return(result);
                                        };
                                        if(err){
                                            console.log(err);
                                        }
                                    })
                                } else {
                                    db.query('SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = ?',[employee_manager], function (err, results) {
                                        if(results){
                                            const manager_id = results[0].id;
                                            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',[employee_first_name,employee_last_name,role_id,manager_id], function(err,result){
                                                if(result){
                                                    return(result);
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
                            }
                            if(err){
                                console.log(err)
                            }
                        })
                        
                    })
                    .then((result) => {
                        console.log(`A new employee was successfully added`);
                        init();
                    });
                });
                break;
            case "Update an employee role":
                question.updateEmployeeRole().then((outputQuestion) => {
                    inquirer
                    .prompt(outputQuestion)
                    .then((response) => {
                        const {employee, employee_role} = response;
                        const employee_first_name = employee[0].split(' ')[0];
                        const employee_last_name = employee[0].split(' ')[1];
                        db.query('SELECT id FROM role WHERE title = ?',[employee_role], function(err, results) {
                            if (results) {
                                const role_id = results[0].id;
                                db.query('UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?;',[role_id, employee_first_name, employee_last_name], function(err, results){
                                    if(results){
                                        return(results);
                                    };
                                    if(err){
                                        console.log(err);
                                    }
                                })
                            }
                            if(err){
                                console.log(err);
                            }
                        })
                    })
                    .then((results) => {
                        console.log('The employee role was successfully updated');
                        init();
                    })
                });
                break;
            case "View employees by department":
                db.query('SELECT id, name FROM department', function(err, results) {
                    if(results) {
                        let activeDepartments = [];
                        for (i = 0; i < results.length; i++) {
                            activeDepartments.push(results[i].name);
                        };
                        inquirer
                        .prompt(
                            [
                                {
                                    type: "checkbox",
                                    name: "department",
                                    message: "Select the department to see the employees",
                                    choices: activeDepartments
                                }
                            ]
                        )
                        .then((response) => {
                            db.query('SELECT department.name AS department, CONCAT(first_name, " ", last_name) AS employee_name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.name = ?;',[response.department[0]],function(err,result){
                                if(result){
                                    console.log("");
                                    console.table(result);
                                    init();
                                }
                                if(err){
                                    console.log(err)
                                }
                            })
                        })
                    }
                    if(err){
                        console.log(err)
                    }
                });
                break;
            case "Update employee manager":
                db.query('SELECT CONCAT(first_name, " ", last_name) AS name FROM employee',function(err,results){
                    if(results){
                        let employeeList = [];
                        for (i = 0; i < results.length; i++) {
                            employeeList.push(results[i].name);
                        };
                        inquirer
                        .prompt(
                            {
                                type: "checkbox",
                                name: "employee",
                                message: "Select the employee you want to update its manager",
                                choices: employeeList
                            }
                        )
                        .then((response) => {
                            const selectedEmployeeName = response.employee[0];
                            db.query('SELECT manager.name FROM employee LEFT JOIN (SELECT id, CONCAT (first_name, " ", last_name) AS name FROM employee) AS manager ON employee.manager_id = manager.id WHERE CONCAT (employee.first_name, " ", employee.last_name) = ?;',[response.employee[0]],function(err, result){
                                if(result){
                                    const managerName = result[0].name;
                                    const filteredEmployeeList = employeeList.filter((employee) => (employee !== selectedEmployeeName && employee !== managerName));
                                    inquirer
                                    .prompt(
                                        {
                                            type: "checkbox",
                                            name: "new_manager",
                                            message: "Select the new manager of the employee",
                                            choices: filteredEmployeeList
                                        }
                                    )
                                    .then((response) => {
                                        const newManager = response.new_manager[0];
                                        db.query('SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = ?;',[newManager], function(err,results){
                                            if (results) {
                                                const newManagerId = results[0].id;
                                                db.query('UPDATE employee SET manager_id = ? WHERE CONCAT(first_name, " ", last_name) = ?;',[newManagerId, selectedEmployeeName], function (err, result) {
                                                    if(result){
                                                        return(result);
                                                    }
                                                    if(err){
                                                        console.log(err);
                                                    }
                                                })
                                            }
                                            if (err) {
                                                console.log(err);
                                            }
                                        })
                                    })
                                    .then((result) => {
                                        console.log(`manager was successfully updated`);
                                        init();
                                    })
                                }
                                if(err){
                                    console.log(err);
                                }
                            } )
                        })
                    }
                    if(err){
                        console.log(err);
                    }
                })
        }
    })    
};

init();
  