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
                        results.forEach(function(name){
                        console.log(name)
                        })
                    };
                    if(err){
                        console.log(err)
                    }
                });
                break;
        }
    });
};

init();


// // Query database
// db.query('SELECT * FROM students', function (err, results) {

//     if(results){
//       results.forEach(function(student){
//       console.log(student)
//     })
//     }
    
//   });
  