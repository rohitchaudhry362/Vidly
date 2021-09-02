const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user')
const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

//get the current user info
router.get('/me', auth, async(req,res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user); 
});

//register a new user
router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email});
  
  if(user) return res.status(400).send("User already registered");

  user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
  })

  /* The other way using lodash package 
  user = new User(_.pick(req.body, ['name','email','password']));
  */

  // hashing the password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  /* The first approach to return only certain 
    properties of object in the response
  res.send({
      name: user.name,
      email: user.email
  });
  */

  // And the other option is, using lodash package.
  // Before -> only the user info was sent back in response 
  // After -> token is also send in response header 

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id','name','email']));
  });

module.exports = router;