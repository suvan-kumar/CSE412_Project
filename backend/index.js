const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 5000;
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
      release();
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      console.log('Connected to PostgreSQL:', result.rows);
    });
});

app.get('/api/players', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Players');
        res.status(200).json(result.rows)
    } catch(err) {
        console.error(err)
        res.status(500).json({ error: 'Database Error' })
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})