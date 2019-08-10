const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secretKey = process.env.SECRET_KEY;

module.exports = {
  signup(req, res) {
    return User.findOne({
      attributes: ['username'],
      where: {
        username: req.body.username,
      },
    })
      .then((user) => {
        if (user) {
          return res.status(400).send({
            success: false,
            message: 'Email address already exists',
          });
        }
        return User.create({
          username: req.body.username,
          password: req.body.password,
        })
          .then((newUser) => res.status(201).send({
            success: true,
            user: { id: newUser.id, username: newUser.username, createdAt: newUser.createdAt },
          }));
      });
  },
  login(req, res) {
    return User.findOne({
      attributes: ['id', 'password', 'username'],
      where: {
        username: req.body.username,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            success: false,
            message: 'Authentication failed. User not found',
          });
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            const token = jwt.sign(JSON.parse(JSON.stringify(
              { userId: user.id, username: user.username },
            )), secretKey, { expiresIn: 86400 * 30 });
            res.json({ success: true, token, user: { id: user.id, username: user.username } });
          } else {
            res.status(401).send({ success: false, message: 'Authentication failed. Wrong password' });
          }
        });
      });
  },
};
