const { response, request } = require('express');
const { validationResult } = require('express-validator');

const createUser = (req = request, res = response) => {
   const { name, email, password } = req.body;
   console.log(name, email, password);

   return res.json({
      ok: true,
      msg: 'Create user /new',
   });
};

const loginUser = (req = request, res = response) => {
   const { email, password } = req.body;
   console.log(email, password);

   return res.json({
      ok: true,
      msg: 'Create login user /',
   });
};

const revalidateToken = (req, res) => {
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
