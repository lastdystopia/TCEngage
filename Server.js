const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

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
  connection.query('SELECT * FROM PerformanceInfo', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

// Function to pull data from ShowCharacter table
app.get('/showCharacter', (req, res) => {
  connection.query('SELECT * FROM ShowCharacter', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

// Function to pull data from Question table
app.get('/question', (req, res) => {
  connection.query('SELECT * FROM Question', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

// Function to push data to EngagementInfo table
app.post('/engagementInfo', (req, res) => {
  const { title, question, response } = req.body;
  const query = 'INSERT INTO EngagementInfo (Title, Question, Response) VALUES (?, ?, ?)';
  connection.query(query, [title, question, response], (error, results, fields) => {
    if (error) throw error;
    res.json({ message: 'Data inserted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
