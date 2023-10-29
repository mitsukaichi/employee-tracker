# employee-tracker
## Acceptance Criteria

```md
- Show these options:  view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
- view all departments: department names and department ids
- view all roles: the job title, role id, the department that role belongs to, and the salary for that role
- view all employees: a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- add a department: prompted to enter the name of the department and that department is added to the database
- add a role: prompted to enter the name, salary, and department for the role and that role is added to the database
- add an employee: prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
- update an employee role: prompted to select an employee to update and their new role and this information is updated in the database 
- Update employee managers.
- View employees by manager.
- View employees by department.
- Delete departments, roles, and employees.
- View the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department.
```

**Important**:  Make your queries asynchronous. MySQL2 exposes a `.promise()` function on Connections to upgrade an existing non-Promise connection to use Promises. To learn more and make your queries asynchronous, refer to the [npm documentation on MySQL2](https://www.npmjs.com/package/mysql2).

Design the database schema as shown in the following image:

![Database schema includes tables labeled “employee,” role,” and “department.”](./Assets/12-sql-homework-demo-01.png)


You might want to use a separate file that contains functions for performing specific SQL queries you'll need to use. A constructor function or class could be helpful for organizing these. You might also want to include a `seeds.sql` file to pre-populate your database, making the development of individual features much easier.

## Resources referred to 
- [console: table() method](https://developer.mozilla.org/en-US/docs/Web/API/console/table)
- [A table name as a variable](https://stackoverflow.com/questions/2838490/a-table-name-as-a-variable)
- [MySQL, Concatenate two columns](https://stackoverflow.com/questions/10346302/mysql-concatenate-two-columns)
