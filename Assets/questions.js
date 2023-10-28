const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'people_db'
    },
    console.log(`Connected to the classlist_db database.`)
);


const main_question = [
    {
        type: "checkbox",
        name: "action_type",
        message: "What would you like to do?",
        choices: ["View all departments","View all roles","View all employees","Add a department","Add a role","Add an employee","Update an employee role","Update employee manager","View employees by manager","View employees by department","Delete department", "Delete role", "Delete employee", "View total utilized budget of a department"]
      }
];

const add_department = [
    {
        type: "input",
        name: "department_name",
        message: "Provide a new deparment name"
    }
];



function addRole(deparments) {
    const addRoleQuestions = [
        {
            type: "input",
            name: "role_name",
            message: "Provide a new role name"
        },
        {
            type: "input",
            name: "salary",
            message: "Provide a salary for the role"
        },
        {
            type: "checkbox",
            name: "department",
            message:"Select the department this role belongs to",
            choices: deparments
        }
    ];
    return addRoleQuestions;
};

function getActiveDepartment(cb) {
    db.query('SELECT * FROM department', function (err, results) {
        if(results){
            let activeDepartments = [];
            for (i = 0; i < results.length; i++) {
                activeDepartments.push(results[i].name);
            };
            cb (addRole(activeDepartments));
        } else {
            return (err);
        }; 
    });
};


module.exports = {main_question, add_department, addRole, getActiveDepartment};