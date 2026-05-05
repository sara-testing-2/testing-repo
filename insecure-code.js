const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const app = express();

app.use(express.json());

// Hardcoded credentials
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'users'
});

// 1. SQL Injection vulnerability
app.get('/user', (req, res) => {
  const query = `SELECT * FROM users WHERE username = '${req.query.username}'`;
  db.query(query, (err, results) => {
    res.json(results);
  });
});

// 2. Path Traversal vulnerability
app.get('/file', (req, res) => {
  const filename = req.query.name;
  fs.readFile('./uploads/' + filename, 'utf8', (err, data) => {
    res.send(data);
  });
});

// 3. Cross-Site Scripting (XSS)
app.get('/greet', (req, res) => {
  res.send(`<h1>Hello, ${req.query.name}!</h1>`);
});

// 4. Command Injection
app.get('/ping', (req, res) => {
  const { exec } = require('child_process');
  exec(`ping -c 1 ${req.query.host}`, (err, stdout) => {
    res.send(stdout);
  });
});

// 5. Insecure authentication — plaintext password comparison, no rate limiting
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`,
    (err, results) => {
      if (results.length > 0) {
        res.cookie('session', username); // No httpOnly, no secure, no signing
        res.send('Logged in');
      } else {
        res.send('Invalid credentials');
      }
    });
});

// 6. Exposing stack traces and verbose errors
app.use((err, req, res, next) => {
  res.status(500).send(err.stack);
});

// 7. No HTTPS, no helmet, no CORS config, listening on all interfaces
app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});