# employee-tracker

## About this project

This project was done as an assignment in the UC Berkeley coding bootcamp full stack engineering class. This application was built from scratch to meet the following criteria:

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
- View the total utilized budget of a department, in other words, the combined salaries of all employees in that department.

## Installment

1. Download all the files in this reposotory
2. Open the terminal, move to the directory the downloaded files are stored
3. Install npm packages
4. Type node server.js in Terminal and answer the prompted questions.

## Demo

- [Video](https://drive.google.com/file/d/1VZIE8kwH7rbJQc7YAYFeokD5KEnFIM-3/view)
- [Screenshot](https://github.com/mitsukaichi/employee-tracker/assets/45612744/e0910712-3b1a-4416-9350-6922da883517)

## Resources referred to 

- [console: table() method](https://developer.mozilla.org/en-US/docs/Web/API/console/table)
- [A table name as a variable](https://stackoverflow.com/questions/2838490/a-table-name-as-a-variable)
- [MySQL, Concatenate two columns](https://stackoverflow.com/questions/10346302/mysql-concatenate-two-columns)

## Thigs I learnt from this challange

- Different ways to handle the object returned from the SQL - use the call back function or create a new Promise object
- How to query, insert, update and delete data in the database using SQL
- Query or modify database by joining multiple tables or a single table that contains the id field that references the id in the same table 
- How to use the promise object imported from another file or used within another function

## License

MIT License

Copyright (c) [2023] [Minami Mukai]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
