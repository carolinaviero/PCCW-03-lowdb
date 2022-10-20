const bcrypt = require('bcrypt');
const User = require('../model/User');

const createUser = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    User.createUser(req.body.email, hashedPassword);

    res.sendStatus(201);
}   

const loginUser = async (req, res, next) => {
    const user = User.loginUser(req.body.email);
    const validPassword = await bcrypt.compare(req.body.password, user.password);
   
    if (req.body.email === user.email && validPassword) {
      res.status(200).cookie('login', true).send('Welcome!');
    } else {
      res.status(401).send('Wrong password or email');
    }
}

const accessSecretRoute = (req, res) => {
    if (req.cookies.login === 'true') {
        res.send('Welcome to the secret route');
      } else {
        res.status(403).send('Unauthorized');
      }
}
   
module.exports = { createUser, loginUser, accessSecretRoute };