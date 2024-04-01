const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser'); // Import body-parser

const app = express();
const port = 3002;

// Middleware
app.use(bodyParser.json()); // Add JSON parsing middleware
// Middleware
//app.use(bodyParser.json());
//app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  //password: 'CapstonePr0j',
  database: 'TempTCE'  
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Function to pull data from PerformanceInfo table
app.get('/performanceInfo', (req, res) => {
  console.log("Trynna getch");
  connection.query('SELECT * FROM PerformanceInfo', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Function to pull data from ShowCharacter table
app.get('/showCharacter', (req, res) => {
  connection.query('SELECT * FROM ShowCharacter', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Function to pull data from RatingQuestion table
app.get('/RatingQuestion', (req, res) => {
  connection.query('SELECT * FROM RatingQuestion', (error, results) => {
    if (error) {
      console.error('Error fetching rating questions:', error);
      res.status(500).send('Error fetching rating questions');
      return;
    }
    res.json(results);
  });
});

// Function to pull data from CheckboxQuestion table
app.get('/CheckBoxQuestion', (req, res) => {
  connection.query('SELECT * FROM CheckboxQuestion', (error, results) => {
    if (error) {
      console.error('Error fetching checkbox questions:', error);
      res.status(500).send('Error fetching checkbox questions');
      return;
    }
    res.json(results);
  });
});

// Function to pull data from TrueFalseQuestion table
app.get('/TrueFalseQuestion', (req, res) => {
  connection.query('SELECT * FROM TrueFalseQuestion', (error, results) => {
    if (error) {
      console.error('Error fetching true/false questions:', error);
      res.status(500).send('Error fetching true/false questions');
      return;
    }
    res.json(results);
  });
});

// Function to pull data from TextboxQuestion table
app.get('/TextboxQuestion', (req, res) => {
  connection.query('SELECT * FROM TextboxQuestion', (error, results) => {
    if (error) {
      console.error('Error fetching textbox questions:', error);
      res.status(500).send('Error fetching textbox questions');
      return;
    }
    res.json(results);
  });
});

// Function to pull data from MultChoiceQuestion table
app.get('/MultChoiceQuestion', (req, res) => {
  connection.query('SELECT * FROM MultChoiceQuestion', (error, results) => {
    if (error) {
      console.error('Error fetching multichoice questions:', error);
      res.status(500).send('Error fetching multichoice questions');
      return;
    }
    res.json(results);
  });
});

// Function to push data to EngagementInfo table
app.post('/engagementInfo', (req, res) => {
  const { title, question, response } = req.body;
  const query = 'INSERT INTO EngagementInfo (Title, Question, Response) VALUES (?, ?, ?)';
  connection.query(query, [title, question, response], (error, results, fields) => {
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).send('Error inserting data');
      return;
    }
    res.json({ message: 'Data inserted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
