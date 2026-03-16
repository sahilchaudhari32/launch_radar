require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const { Pool } = require('pg');
const { Product, Prediction, Signal, Analytics } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// --- Database Connections ---

// --- FALLBACK DATA (JSON) ---
let fallbackData = { products: [], predictions: [], signals: [], analytics: {} };
try {
  const raw = fs.readFileSync('./data_store.json');
  fallbackData = JSON.parse(raw);
  console.log('Fallback JSON data loaded');
} catch (e) {
  console.warn('Could not load fallback data_store.json');
}

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MONGODB CONNECTION ERROR:', err);
    console.warn('Falling back to JSON data due to MongoDB failure.');
  });

// Supabase (PostgreSQL) Connection
const pool = new Pool({
  connectionString: process.env.SUPABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Create Users table if not exists
const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        plan TEXT DEFAULT 'Free Tier',
        avatar TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Supabase Users table verified');
  } catch (err) {
    console.error('CRITICAL: Error initializing Supabase table:', err);
  }
};
initDb();

// --- Auth Endpoints ---

app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Full name, email, and password are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('SUPABASE SIGNUP FAILED, FALLING BACK TO LOCAL JSON:', err.code || err.message);
    
    if (err.code === '23505') {
       return res.status(400).json({ error: 'An account with this email already exists' });
    }

    // Local JSON Fallback
    try {
      let users = [];
      if (fs.existsSync('./users.json')) {
        const rawUsers = fs.readFileSync('./users.json');
        users = JSON.parse(rawUsers);
      }
      
      if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'An account with this email already exists (Local)' });
      }

      const newUser = { id: Date.now().toString(), name, email, password, plan: 'Free Tier (Local)', avatar: null };
      users.push(newUser);
      fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
      
      return res.status(201).json({ id: newUser.id, name: newUser.name, email: newUser.email });
    } catch (fallbackErr) {
       console.error('Local Auth Fallback failed:', fallbackErr);
       res.status(500).json({ error: 'Internal server error during signup fallback' });
    }
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide both email and password' });
  }

  try {
    // 1. Check if user exists in Supabase
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Account not found. Please sign up or check your email.' });
    }

    const user = userResult.rows[0];

    // 2. Check password
    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password. Please try again.' });
    }

    // Success
    return res.json({ id: user.id, name: user.name, email: user.email, plan: user.plan, avatar: user.avatar });
  } catch (err) {
    console.error('SUPABASE LOGIN FAILED, FALLING BACK TO LOCAL JSON:', err.code || err.message);
    
    // Local JSON Fallback
    try {
      let users = [];
      if (fs.existsSync('./users.json')) {
        const rawUsers = fs.readFileSync('./users.json');
        users = JSON.parse(rawUsers);
      }
      
      const localUser = users.find(u => u.email === email);
      if (!localUser) {
        return res.status(401).json({ error: 'Account not found. Please sign up or check your email.' });
      }
      if (localUser.password !== password) {
        return res.status(401).json({ error: 'Incorrect password. Please try again.' });
      }

      return res.json({ id: localUser.id, name: localUser.name, email: localUser.email, plan: localUser.plan, avatar: localUser.avatar });
    } catch (fallbackErr) {
      console.error('Local login fallback failed:', fallbackErr);
      res.status(500).json({ error: 'Internal server error during login fallback' });
    }
  }
});

// --- Data Endpoints (With Fallback) ---

app.get('/api/user', (req, res) => {
  res.json({
    name: "Alex Rivers",
    plan: "Enterprise Elite",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  });
});

app.get('/api/landing', (req, res) => {
  res.json(fallbackData.landing || { stats: [], startups: [], process: [] });
});
app.get('/api/counts', async (req, res) => {
  res.json({ cartCount: 3, notificationsCount: 3 });
});

app.get('/api/market-intelligence', (req, res) => {
  res.json(fallbackData.marketIntelligence || { momentumItems: [], distribution: [] });
});

app.get('/api/brand-intelligence', (req, res) => {
  res.json(fallbackData.brandIntelligence || { brands: [] });
});

app.get('/api/admin-console', (req, res) => {
  res.json(fallbackData.adminConsole || { revenueData: [], regions: [], products: [] });
});

app.get('/api/notifications', (req, res) => {
  res.json(fallbackData.notifications || []);
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length > 0) return res.json(products);
    res.json(fallbackData.products);
  } catch (err) {
    res.json(fallbackData.products);
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'MongoDB required for saving new products' });
  }
});

app.get('/api/predictions', async (req, res) => {
  try {
    const predictions = await Prediction.find();
    if (predictions.length > 0) return res.json(predictions);
    res.json(fallbackData.predictions);
  } catch (err) {
    res.json(fallbackData.predictions);
  }
});

app.get('/api/signals', async (req, res) => {
  try {
    const signals = await Signal.find();
    if (signals.length > 0) return res.json(signals);
    res.json(fallbackData.signals);
  } catch (err) {
    res.json(fallbackData.signals);
  }
});

app.get('/api/analytics', async (req, res) => {
  try {
    const analytics = await Analytics.findOne();
    if (analytics) return res.json(analytics);
    res.json(fallbackData.analytics);
  } catch (err) {
    res.json(fallbackData.analytics);
  }
});

// --- Admin Endpoints ---

// GET all users (admin)
app.get('/api/admin/users', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, plan, avatar, created_at FROM users ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Admin: Failed to fetch users from Supabase, using fallback:', err.message);
    // Fallback: read from local users.json
    try {
      let users = [];
      if (fs.existsSync('./users.json')) {
        users = JSON.parse(fs.readFileSync('./users.json'));
      }
      // Don't send passwords
      res.json(users.map(({ password, ...rest }) => rest));
    } catch (fe) {
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  }
});

// DELETE a user (admin)
app.delete('/api/admin/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted', id: result.rows[0].id });
  } catch (err) {
    console.error('Admin: Failed to delete user from Supabase, using fallback:', err.message);
    try {
      let users = [];
      if (fs.existsSync('./users.json')) {
        users = JSON.parse(fs.readFileSync('./users.json'));
      }
      const idx = users.findIndex(u => String(u.id) === String(id));
      if (idx === -1) return res.status(404).json({ error: 'User not found' });
      users.splice(idx, 1);
      fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
      res.json({ message: 'User deleted (local)', id });
    } catch (fe) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
});

// UPDATE user plan (admin)
app.patch('/api/admin/users/:id', async (req, res) => {
  const { id } = req.params;
  const { plan } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET plan = $1 WHERE id = $2 RETURNING id, name, email, plan',
      [plan, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Admin: Failed to update user in Supabase, using fallback:', err.message);
    try {
      let users = [];
      if (fs.existsSync('./users.json')) {
        users = JSON.parse(fs.readFileSync('./users.json'));
      }
      const user = users.find(u => String(u.id) === String(id));
      if (!user) return res.status(404).json({ error: 'User not found' });
      user.plan = plan;
      fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
      res.json({ id: user.id, name: user.name, email: user.email, plan: user.plan });
    } catch (fe) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  }
});

// DELETE a product (admin)
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted', id });
  } catch (err) {
    // Fallback: remove from JSON data_store
    try {
      const data = JSON.parse(fs.readFileSync('./data_store.json'));
      const idx = data.products ? data.products.findIndex(p => String(p.id) === String(id)) : -1;
      if (idx === -1) return res.status(404).json({ error: 'Product not found' });
      data.products.splice(idx, 1);
      // Also remove from adminConsole.products if present
      if (data.adminConsole && data.adminConsole.products) {
        const ai = data.adminConsole.products.findIndex(p => String(p.id) === String(id));
        if (ai !== -1) data.adminConsole.products.splice(ai, 1);
      }
      fs.writeFileSync('./data_store.json', JSON.stringify(data, null, 2));
      res.json({ message: 'Product deleted (local)', id });
    } catch (fe) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  }
});

// PATCH a product (admin - update status/details)
app.patch('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const result = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!result) return res.status(404).json({ error: 'Product not found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Admin Stats Overview
app.get('/api/admin/stats', async (req, res) => {
  try {
    const userCountResult = await pool.query('SELECT COUNT(*) FROM users');
    const userCount = parseInt(userCountResult.rows[0].count);
    const productCount = await Product.countDocuments();
    res.json({
      totalUsers: userCount,
      totalProducts: productCount,
      activeUsers: Math.floor(userCount * 0.8),
      revenue: '$12,847.00'
    });
  } catch (err) {
    // Fallback
    let userCount = 0;
    try {
      if (fs.existsSync('./users.json')) {
        userCount = JSON.parse(fs.readFileSync('./users.json')).length;
      }
    } catch (e) {}
    const productCount = (fallbackData.products || []).length;
    res.json({
      totalUsers: userCount,
      totalProducts: productCount,
      activeUsers: Math.max(1, Math.floor(userCount * 0.8)),
      revenue: '$12,847.00'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

