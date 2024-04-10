const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser'); // Import body-parser
const cors = require('cors'); // Import CORS
const app = express();
const port = 3001;

// ask for CNU-domain DNS alias for SOMETHING.CNU.edu pointing to ec2-18-191-50-2.us-east-2.compute.amazonaws.com

// Middleware
app.use(bodyParser.json()); // Add JSON parsing middleware
app.use(cors()); // Enable CORS for all routes
// Middleware
//app.use(bodyParser.json());
//app.use(cors());

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
  handleQuery('SELECT * FROM performanceinfo', res, 'Error fetching performance info:');
});
app.get('/showCharacter', (req, res) => {
  handleQuery('SELECT * FROM showcharacter', res, 'Error fetching show characters:');
});

// Function to pull data from RatingQuestion table
app.get('/RatingQuestion', (req, res) => {
  handleQuery('SELECT * FROM ratingquestion', res, 'Error fetching rating questions:');
});

// Function to pull data from CheckboxQuestion table
app.get('/CheckBoxQuestion', (req, res) => {
  handleQuery('SELECT * FROM checkboxquestion', res, 'Error fetching checkbox questions:');
});

// Function to pull data from TrueFalseQuestion table
app.get('/TrueFalseQuestion', (req, res) => {
  handleQuery('SELECT * FROM truefalsequestion', res, 'Error fetching true/false questions:');
});

// Function to pull data from TextboxQuestion table
app.get('/TextboxQuestion', (req, res) => {
  handleQuery('SELECT * FROM textboxquestion', res, 'Error fetching textbox questions:');
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

// Function to get username and password
app.get('/login', async (req, res) => {
  const { username, password } = req.query;

  // Check if username or password is missing
  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required.' });
    return;
  }

  // Fetch the hashed password corresponding to the provided username
  connection.query('SELECT password FROM login WHERE username = ?', [username], async (error, results) => {
    if (error) {
      errorHandler(res, error, 'Error fetching login data:');
      return;
    }

    // Check if the username exists
    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    console.log(results);
    const hashedPassword = results[0].password;

    try {
      // Compare the hashed password with the provided password
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        // Passwords match, login successful
        res.status(200).json({ message: 'Login successful' });
      } else {
        // Incorrect password
        res.status(401).json({ error: 'Incorrect password' });
      }
    } catch (error) {
      errorHandler(res, error, 'Error comparing passwords:');
    }
  });
});

// Function to create a new user
app.post('/createUser', async (req, res) => {
  const { username, password } = req.body;

  // Check if username is too short or too long
  if (username.length < 5 || username.length > 100) {
    res.status(400).json({ error: 'Username length must be between 5 and 100 characters.' });
    return;
  }

  // Check if password is too short or too long
  if (password.length < 5 || password.length > 100) {
    res.status(400).json({ error: 'Password length must be between 5 and 100 characters.' });
    return;
  }

  try {
    // Hash the password 10 salt rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    // Query to insert new user into database
    const query = 'INSERT INTO login (username, password) VALUES (?, ?)';
    connection.query(query, [username, hashedPassword], (error, results) => {
      if (error) {
        // Check if username already exists
        if (error.code === 'ER_DUP_ENTRY') {
          res.status(409).json({ error: 'Username already exists' });
        } else {
          errorHandler(res, error, 'Error creating user:');
        }
        return;
      }
      res.json({ message: 'User created successfully' });
    });
  } catch (error) {
    errorHandler(res, error, 'Error hashing password:');
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});