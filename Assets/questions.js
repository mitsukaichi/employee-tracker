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

module.exports = {main_question, add_department};