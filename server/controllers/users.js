const jwt = require('jsonwebtoken');
const User = require('../models').User;

const secretKey = process.env.SECRET_KEY;

module.exports = {
  create(req, res) {
    return User.create({
      username: req.body.username,
      password: req.body.password,
    })
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(console.log(error)));
  },
  login(req, res) {
    return User.findOne({
      attributes: ['id', 'password', 'username'],
      where: {
        username: req.body.username
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          message: 'Authentication failed. User not found',
        });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          const token = jwt.sign(JSON.parse(JSON.stringify({userId: user.id, username: user.username})), secretKey, {expiresIn: 86400 * 30});
          res.json({success: true, token: token, user: { id: user.id, username: user.username }});
        } else {
          res.status(401).send({success: false, message: 'Authentication failed. Wrong password'});
        }
      })
    })
    .catch((error) => res.status(400).send(error));
  },
};