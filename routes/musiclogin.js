const express = require("express");
const mongoose = require("mongoose");
const { Router } = require("express");
const schema = require("../models/schema");
const { restart } = require("nodemon");
const route = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var Signup = schema.signup;


route.post('/', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    if (isEmail) {
        user = await Signup.findOne({ email: email });
    } else {
        user = await Signup.findOne({ mobile: email });
    }

    if (!user) {
        return res.status(401).json({ error: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({ error: "Authentication failed" });
    }

    // Create a JWT token for authenticated user
    const token = jwt.sign({ email: user.email, userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({ message: "Authentication successful", token });
} catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ error: "An error occurred during login" });
}

});
  
module.exports = route;

