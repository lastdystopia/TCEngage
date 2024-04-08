
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const passportConfig = require('./Passport');
var crypto = require('crypto'); 
const app = express();
const port = 3000;
// Everything below this line is for loi
// Everything below this line is for rds connection
const connection = mysql.createConnection({
  host: 'database-1.c72asiuys3dv.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'B00mShakaLaka',
  database: 'TCE'  
});
// make an error handler that catches error and console.logs so it wont fall just because it doesnt work
// Connect to MySQL database


  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
  
    console.log('Connected to MySQL database');
  });
// Error handler function
function errorHandler(res, error, errorMessage) {
  console.error(errorMessage, error);
  res.status(500).send(errorMessage);
}

// Function to handle database queries
function handleQuery(query, res, errorMessage) {
  connection.query(query, (error, results) => {
    if (error) {
      errorHandler(res, error, errorMessage);
      return;
    }
    res.json(results);
  });
}
// Function to pull data from PerformanceInfo table
app.get('/performanceInfo', (req, res) => {
  handleQuery('SELECT * FROM PerformanceInfo', res, 'Error fetching performance info:');
});
app.get('/showCharacter', (req, res) => {
  handleQuery('SELECT * FROM ShowCharacter', res, 'Error fetching show characters:');
});

// Function to pull data from RatingQuestion table
app.get('/RatingQuestion', (req, res) => {
  handleQuery('SELECT * FROM RatingQuestion', res, 'Error fetching rating questions:');
});

// Function to pull data from CheckboxQuestion table
app.get('/CheckBoxQuestion', (req, res) => {
  handleQuery('SELECT * FROM CheckboxQuestion', res, 'Error fetching checkbox questions:');
});

// Function to pull data from TrueFalseQuestion table
app.get('/TrueFalseQuestion', (req, res) => {
  handleQuery('SELECT * FROM TrueFalseQuestion', res, 'Error fetching true/false questions:');
});

// Function to pull data from TextboxQuestion table
app.get('/TextboxQuestion', (req, res) => {
  handleQuery('SELECT * FROM TextboxQuestion', res, 'Error fetching textbox questions:');
});

// Function to pull data from MultChoiceQuestion table
app.get('/multchoicequestion', (req, res) => {
  handleQuery('SELECT * FROM multchoicequestion', res, 'Error fetching multichoice questions:');
});

// Function to push data to EngagementInfo table
app.post('/engagementInfo', (req, res) => {
  const { title, question, response } = req.body;
  const query = 'INSERT INTO engagementinfo (Title, Question, Response) VALUES (?, ?, ?)';
  connection.query(query, [title, question, response], (error, results, fields) => {
    if (error) {
      errorHandler(res, error, 'Error inserting data:');
      return;
    }
    res.json({ message: 'Data inserted successfully' });
  });
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
