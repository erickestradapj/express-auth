const { response, request } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createUser = async (req = request, res = response) => {
   const { name, email, password } = req.body;

   try {
      // Verify email
      // let user = await User.findOne({ email: email });
      const user = await User.findOne({ email });
      if (user) {
         return res.status(400).json({
            ok: false,
            msg: 'Email already exist',
         });
      }

      // Create user with model
      const dbUser = new User(req.body);

      // Hash password
      const salt = bcrypt.genSaltSync();
      dbUser.password = bcrypt.hashSync(password, salt);

      // Generate JWT02{}

      // Create DB user
      await dbUser.save();

      // Generate response successfully
      return res.status(201).json({
         ok: true,
         // uid: dbUser._id, or
         uid: dbUser.id,
         name,
      });
   } catch (error) {
      console.log(error);

      return res.status(500).json({
         ok: false,
         msg: 'Talk to the administrator',
      });
   }
};

const loginUser = (req = request, res = response) => {
   const { email, password } = req.body;
   console.log(email, password);

   return res.json({
      ok: true,
      msg: 'Create login user /',
   });
};

const revalidateToken = (req = request, res = response) => {
   return res.json({
      ok: true,
      msg: 'Renew',
   });
};

module.exports = {
   createUser,
   loginUser,
   revalidateToken,
};
