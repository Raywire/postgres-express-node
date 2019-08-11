const { User } = require('../models');

const deleteTestUser = async (username) => {
  await User.findOne({
    attributes: ['id', 'username'],
    where: {
      username,
    },
  })
    .then(((user) => {
      if (user) {
        user.destroy();
        return null;
      }
    }));
}

const tokenInvalid = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUzNSwidXNlcm5hbWUiOiJyeWFud2lyZTFAb3V0bG9vay5jb20iLCJpYXQiOjE1NjU1MzkzMTYsImV4cCI6MTU2ODEzMTMxNn0._wdtfKOKv4GKsIg7ORPdrtqRATqj5OWcpHqEC_xqwmM';

module.exports = {
  deleteTestUser,
  tokenInvalid
}
