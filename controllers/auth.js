const { response, request } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

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
      const userDB = new User(req.body);

      // Hash password
      const salt = bcrypt.genSaltSync();
      userDB.password = bcrypt.hashSync(password, salt);

      // Generate JWT
      const token = await generateJWT(userDB.id, name);

      // Create DB user
      await userDB.save();

      // Generate response successfully
      return res.status(201).json({
         ok: true,
         // uid: userDB._id, or
         uid: userDB.id,
         name,
         email,
         token,
      });
   } catch (error) {
      return res.status(500).json({
         ok: false,
         msg: 'Talk to the administrator',
      });
   }
};

const loginUser = async (req = request, res = response) => {
   const { email, password } = req.body;

   try {
      const userDB = await User.findOne({ email });

      if (!userDB) {
         return res.status(400).json({
            ok: false,
            msg: 'Email does not exist',
         });
      }

      // Confirm password
      const validPassword = bcrypt.compareSync(password, userDB.password);
      if (!validPassword) {
         return res.status(400).json({
            ok: false,
            msg: 'Password invalid',
         });
      }

      // Generate JWT
      const token = await generateJWT(userDB.id, userDB.name);

      // Response service
      return res.json({
         ok: true,
         uid: userDB.id,
         name: userDB.name,
         email: dbUser,
         token,
      });
   } catch (error) {
      return res.status(500).json({
         ok: false,
         msg: 'Talk to the administrator',
      });
   }
};

const revalidateToken = async (req = request, res = response) => {
   const { uid } = req;

   // Read user from DB
   const userDB = await User.findById(uid);

   // Generate JWT
   const token = await generateJWT(uid, userDB.name);

   return res.json({
      ok: true,
      uid,
      name: userDB.name,
      email: userDB.email,
      token,
   });
};

module.exports = {
   createUser,
   loginUser,
   revalidateToken,
};
