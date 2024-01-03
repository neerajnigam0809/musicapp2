const express = require("express");
const { Router } = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const route = Router();

// Assuming this is your user schema from the "schema" file
const Signup = require("../models/schema").signup;

route.post("/", async (req, res, next) => {
  const { name, email, mobile, password } = req.body;

  try {
    const existingUser = await Signup.findOne({ email, mobile });

    if (existingUser) {
      return res.status(409).send({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Signup({
      name,
      email,
      mobile,
      password: hashedPassword // Store hashed password
    });

    await newUser.save();

    // Create a JWT token
    const secretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';
    const token = jwt.sign({ email: newUser.email, userId: newUser._id }, secretKey, { expiresIn: '1h' });

    res.status(201).json({ message: "Signup successful", token });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).send({ error: "An error occurred while signing up" });
  }
});

module.exports = route;