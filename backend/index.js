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
        const id = req.query.id
        var result
        if(id)
        {
          result = await pool.query(`SELECT * FROM public.player WHERE playerid = ${id}`);
        }
        else 
        {
          result = await pool.query(`SELECT * FROM public.player`);
        }
        
        res.status(200).json(result.rows)
    } catch(err) {
        console.error(err)
        res.status(500).json({ error: 'Database Error' })
    }
})


app.get('/api/managers', async (req, res) => {
  try {
      const id = req.query.id
      var result
      if(id)
      {
        result = await pool.query(`SELECT * FROM public.manager WHERE managerid = ${id}`);
      }
      else 
      {
        result = await pool.query(`SELECT * FROM public.manager`);
      }
      
      res.status(200).json(result.rows)
  } catch(err) {
      console.error(err)
      res.status(500).json({ error: 'Database Error' })
  }
})

app.get('/api/stats', async (req, res) => {
  try {
      const id = req.query.id
      var result
      if(id)
      {
        result = await pool.query(`SELECT * FROM public.stat WHERE playerid = ${id}`);
      }
      else 
      {
        result = await pool.query(`SELECT * FROM public.stat`);
      }
      
      res.status(200).json(result.rows)
  } catch(err) {
      console.error(err)
      res.status(500).json({ error: 'Database Error' })
  }
})

app.get('/api/teams', async (req, res) => {
  try {
      const id = req.query.id
      var result
      if(id)
      {
        result = await pool.query(`SELECT * FROM public.team WHERE teamid = ${id}`);
      }
      else 
      {
        result = await pool.query(`SELECT * FROM public.team`);
      }
      
      res.status(200).json(result.rows)
  } catch(err) {
      console.error(err)
      res.status(500).json({ error: 'Database Error' })
  }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})