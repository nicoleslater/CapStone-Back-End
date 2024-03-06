const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/dbConfig");
require("dotenv").config();

const users = express.Router();
const { getUserByEmail, createUser } = require("../queries/users");

// registration Endpoint
users.post("/register", async (req, res) => {
    const { email, password, serviceBranch, yearsOfService } = req.body;
    if (!email || !password || !serviceBranch || !yearsOfService) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const existingUser = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser) {
            return res.status(409).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.one('INSERT INTO users (email, password, service_branch, years_of_service) VALUES ($1, $2, $3, $4) RETURNING id, email', [email, hashedPassword, serviceBranch, yearsOfService]);
        console.log("Registration successful for:", email);
        res.status(201).json({ message: "Registration successful!", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering user." });
    }
});

//login
users.post("/login", async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;
  if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
  }

  try {
      const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
      if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ message: "Invalid credentials." });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log("Login successful for:", email);
      res.status(200).json({ message: "Login successful", token, email: user.email });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error logging in." });
  }
});


module.exports = users;