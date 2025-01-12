const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Setting up the database connection
// I hope this config works correctly; had some trouble with it earlier
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_databsae_password',
  database: 'crypto_portfolio',
});

// Check if the database connection is working
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database.');
  }
});

// Fetch all cryptocurrencies from the database
// Not sure if this is efficient, but it gets the job done for now
app.get('/cryptos', (req, res) => {
  db.query('SELECT * FROM portfolio', (err, results) => {
    if (err) {
      res.status(500).send('Database error.');
    } else {
      const formattedResults = results.map(crypto => ({
        ...crypto,
        amount: parseFloat(crypto.amount),
        purchasePrice: parseFloat(crypto.purchasePrice),
      }));
      res.json(formattedResults);
    }
  });
});

// Add a new cryptocurrency or update an existing one
// This function turned out longer than I expected 😅
app.post('/cryptos', (req, res) => {
  const { name, amount, purchasePrice } = req.body;

  if (!name || !amount || !purchasePrice) {
    return res.status(400).send('All fields are required.');
  }

  db.query('SELECT * FROM portfolio WHERE name = ?', [name], (err, results) => {
    if (err) return res.status(500).send('Database error.');

    if (results.length > 0) {
      const current = results[0];
      const totalAmount = parseFloat(current.amount) + parseFloat(amount);
      const totalCost = (current.amount * current.purchasePrice) + (amount * purchasePrice);
      const avgPrice = totalCost / totalAmount;

      // Updating the existing entry
      db.query(
        'UPDATE portfolio SET amount = ?, purchasePrice = ? WHERE id = ?',
        [totalAmount, avgPrice.toFixed(8), current.id],
        (err) => {
          if (err) return res.status(500).send('Database update error.');
          res.send('Cryptocurrency updated.');
        }
      );
    } else {
      // Inserting a new entry
      db.query(
        'INSERT INTO portfolio (name, amount, purchasePrice) VALUES (?, ?, ?)',
        [name, amount, purchasePrice.toFixed(8)],
        (err) => {
          if (err) return res.status(500).send('Database insert error.');
          res.status(201).send('Cryptocurrency added.');
        }
      );
    }
  });
});

// Update a cryptocurrency
// This is for when I want to fix something I entered wrong
app.put('/cryptos/:id', (req, res) => {
  const { id } = req.params;
  const { amount, purchasePrice } = req.body;

  if (!amount || !purchasePrice) {
    return res.status(400).send('Both amount and purchasePrice are required.');
  }

  db.query(
    'UPDATE portfolio SET amount = ?, purchasePrice = ? WHERE id = ?',
    [amount, purchasePrice.toFixed(8), id],
    (err) => {
      if (err) {
        res.status(500).send('Database update error.');
      } else {
        res.send('Cryptocurrency updated.');
      }
    }
  );
});

// Delete a cryptocurrency
// I haven’t tested this much yet, but it seems to work
app.delete('/cryptos/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM portfolio WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).send('Database delete error.');
    } else {
      res.send('Cryptocurrency deleted.');
    }
  });
});

// Start the server
// Let’s hope the port doesn’t conflict with anything else 😅
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
