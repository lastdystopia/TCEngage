const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// MySQL connection pool for AWS RDS
const pool = mysql.createPool({
  host: 'theatercnuengage.c72asiuys3dv.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'CapstonePr0j',
  database: 'TheaterCNUEngage',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
// API endpoint to get data from PerformanceInfo table
app.get('/api/performanceinfo', async (req, res) => {
  try {
    console.log('Received request for /api/performanceinfo');

    // Get data from PerformanceInfo table
    const [rows, fields] = await pool.execute('SELECT * FROM PerformanceInfo');
    
    console.log('Query result:', rows);

    // Send the data as JSON response
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    // Send an error response with status code 500
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to get data from EngagementQuestions table
app.get('/api/engagementquestions', async (req, res) => {
  try {
    console.log('Received request for /api/engagementquestions');

    // Get data from EngagementQuestions table
    const [rows, fields] = await pool.execute('SELECT * FROM EngagementQuestions');
    
    console.log('Query result:', rows); // Log the result

    // Send the data as JSON response
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    // Send an error response with status code 500
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get("/", (request, response) => {
  return response.send(`
      <br />
      <br />
      <center>
          <h1>
              Hello 👋 from AWS EC2
          </h1>
      </center>
  `);
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on Port:${PORT}`);
  //console.log(`Connecting to database at host: ${pool.config.connectionConfig.host}`);

  // Fetch data from EngagementQuestions table and log the result
  pool.execute('SELECT * FROM PerformanceInfo')
    .then(([rows, fields]) => {
      console.log('PerformanceInfo data:', rows);
    })
    .catch((error) => {
      console.error('Error fetching PerformanceInfo data:', error);
    });
});