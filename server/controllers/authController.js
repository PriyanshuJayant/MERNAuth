const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require('jsonwebtoken');

const test = (req, res) => {
  res.json("Test is working");
};

//  Register Endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //  Check if name was entered
    if (!name) {
      return res.json({ error: "name is required" });
    }
    if (!email) {
      return res.json({ error: "Email is Required" });
    }

    //  Check if password is good
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be at least 6 characters long",
      });
    }
    //Check email
    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({ error: "Email already taken" });
    }

    const hashedPassword = await hashPassword(password);
    //  Create user in Database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login Endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "No user found" });
    }
    //  Check id passwords match
    const match = await comparePassword(password, user.password)
    if (match) {
      res.json('Password Matched');
      // jwt.sign({email: user.email, id: user._id, user.name}, )
    }
    if(!match){
      res.json({
        error: 'Passwords do not match'
      })
    }
  } catch (error) {console.log(error)}
};

module.exports = {
  test,
  registerUser,
  loginUser,
};
