const jwt = require('jsonwebtoken');
const User = require('../models').User;

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
          const token = jwt.sign(JSON.parse(JSON.stringify({username: user.username})), 'nodeauthsecret', {expiresIn: 86400 * 30});
          jwt.verify(token, 'nodeauthsecret', function(err, data){
            console.log(err, data);
          })
          res.json({success: true, token: token});
        } else {
          res.status(401).send({success: false, message: 'Authentication failed. Wrong password'});
        }
      })
    })
    .catch((error) => res.status(400).send(error));
  },
};