require('dotenv').config()
const express = require('express');
const {
  Pool
} = require('pg'); 
const cors = require('cors');
const app = express();
const port = 3000;


app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
}));



const pool = new Pool({
  connectionString:process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});




app.get('/', (req, res) => {
  res.send('Student Management API is running with Neon DB!');
});

app.post('/students', async (req, res) => {
  const {
    name,
    age,
    email,
    major,
    usn,
    course
  } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO students (name, age, email, major, usn, course) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, age, email, major, usn, course]
    );

    res.status(201).json({
      message: 'Student added!',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(400).json({
      error: error.message,
    });
  }
});





app.get('/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error retrieving students:', error);
    res.status(400).json({
      error: error.message,
    });
  }
});





app.get('/students/:id', async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Student not found',
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error retrieving student:', error);
    res.status(400).json({
      error: error.message,
    });
  }
});





app.put('/students/:id', async (req, res) => {
  const {
    id
  } = req.params;
  const {
    name,
    age,
    email,
    major,
    usn,
    course
  } = req.body;

  try {
    const result = await pool.query(
      'UPDATE students SET name = $1, age = $2, email = $3, major = $4, usn = $5, course = $6 WHERE id = $7 RETURNING *',
      [name, age, email, major, usn, course, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Student not found',
      });
    }

    res.status(200).json({
      message: 'Student updated!',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(400).json({
      error: error.message,
    });
  }
});





app.delete('/students/:id', async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Student not found',
      });
    }

    res.status(200).json({
      message: 'Student deleted!',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(400).json({
      error: error.message,
    });
  }
});




//server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
