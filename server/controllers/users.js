const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secretKey = process.env.SECRET_KEY;

async function signup(req, res) {
  const user = await User.findOne({
    attributes: ['username'],
    where: {
      username: req.body.username,
    },
  });

  if (user) {
    return res.status(400).send({
      success: false,
      message: 'Email address already exists',
    });
  }
  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
  });

  return res.status(201).send({
    success: true,
    user: { id: newUser.id, username: newUser.username, createdAt: newUser.createdAt },
  });
}

async function login(req, res) {
  const user = await User.findOne({
    attributes: ['id', 'password', 'username'],
    where: {
      username: req.body.username,
    },
  });

  if (!user) {
    return res.status(401).send({
      success: false,
      message: 'Authentication failed. User not found',
    });
  }

  return user.comparePassword(req.body.password, (match) => {
    if (match) {
      const token = jwt.sign(JSON.parse(JSON.stringify(
        { userId: user.id, username: user.username },
      )), secretKey, { expiresIn: 86400 * 30 });
      res.json({ success: true, token, user: { id: user.id, username: user.username } });
    } else {
      res.status(401).send({ success: false, message: 'Authentication failed. Wrong password' });
    }
  });
}

module.exports = {
  signup,
  login,
};
