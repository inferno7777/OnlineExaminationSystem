const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());

// ✅ FIXED CORS
app.use(cors({
  origin: "http://localhost:3000"
}));

const db = new sqlite3.Database('./db.sqlite');

const SECRET = "secret123";

// ✅ ROOT ROUTE
app.get('/', (req, res) => {
  res.send("Online Examination System");
});

// ===== INIT DB =====
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT,
  password TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS exams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT,
  answer TEXT
)`);

// ✅ INSERT SAMPLE QUESTIONS ONLY ONCE
db.get(`SELECT COUNT(*) as count FROM exams`, (err, row) => {
  if (row.count === 0) {
    db.run(`INSERT INTO exams (question, answer) VALUES 
      ('2+2?', '4'),
      ('Capital of India?', 'Delhi'),
      ('5*3?', '15')
    `);
    console.log("Sample questions inserted");
  }
});

// ===== AUTH =====
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  db.run(`INSERT INTO users (email,password) VALUES (?,?)`,
    [email, password],
    function(err) {
      if (err) return res.status(500).json({ msg: "Error" });
      res.json({ msg: "Registered" });
    }
  );
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email=? AND password=?`,
    [email, password],
    (err, user) => {
      if (!user) return res.status(401).json({ msg: "Invalid" });

      const token = jwt.sign({ id: user.id }, SECRET);
      res.json({ token });
    }
  );
});

// ===== GET QUESTIONS =====
app.get('/exam', (req, res) => {
  db.all(`SELECT * FROM exams`, [], (err, rows) => {
    res.json(rows);
  });
});

// ===== SUBMIT =====
app.post('/submit', (req, res) => {
  const { answers } = req.body;

  db.all(`SELECT * FROM exams`, [], (err, questions) => {
    let score = 0;

    questions.forEach((q, i) => {
      if (answers[i] === q.answer) score++;
    });

    res.json({ score, total: questions.length });
  });
});

// ===== START =====
app.listen(5000, () => console.log("Server running on http://localhost:5000"));