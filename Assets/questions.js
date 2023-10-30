const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'people_db'
    }
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

const getActiveRoles = new Promise((resolve, reject) => {
    db.query("SELECT *, CONCAT(first_name, ' ', last_name) AS full_name  FROM role LEFT JOIN employee ON role.id = employee.role_id", function (err, results) {
        if(results){
            let output = {roles: [], employees: []};
            let activeRoles = [];
            let activeEmployees = [];
            for (i = 0; i < results.length; i++) {
                if (!activeRoles.includes(results[i].title)){
                    activeRoles.push(results[i].title);
                }
            };
            for (i = 0; i < results.length; i++) {
                if (results[i].full_name){ // Not add null to the array when there is no employee in the database
                    activeEmployees.push(results[i].full_name);
                }
            };
            output.roles = activeRoles;
            output.employees = activeEmployees;
            resolve(output);
        } else {
            reject (err);
        }; 
    });
});

function addEmployee() {
    return getActiveRoles
        .then((result) => {
            result.employees.push("None");
            const addEmployeeQuestions = [
                {
                    type: "input",
                    name: "employee_first_name",
                    message: "Provide a first name of a new employee" 
                },
                {
                    type: "input",
                    name: "employee_last_name",
                    message: "Provide a last name of a new employee" 
                },
                {
                    type: "checkbox",
                    name: "employee_role",
                    message: "Select a role of the new employee",
                    choices: result.roles
                },
                {
                    type: "checkbox",
                    name: "employee_manager",
                    message: "Select a manager of the new employee",
                    choices: result.employees
                },
            ];
            return addEmployeeQuestions;
            
        }) 
};

module.exports = {main_question, add_department, addRole, getActiveDepartment, addEmployee};