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
                db.query('SELECT * FROM department', function (err, results) {
                    if(results){
                        console.table(results);
                    };
                    if(err){
                        console.log(err)
                    }
                });
                break;
            case "View all roles":
                db.query('SELECT * FROM role', function (err, results) {
                    if(results){
                        console.table(results);
                    };
                    if(err){
                        console.log(err)
                    }
                });
                break;
            case "View all employees":
                db.query('SELECT * FROM employees', function (err, results) {
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
        }
    })    
};

init();
  