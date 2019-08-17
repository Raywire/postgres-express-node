import db from '../models';

export const deleteTestUser = async (username) => {
  const user = await db.User.findOne({
    attributes: ['id', 'username'],
    where: {
      username,
    },
  });

  if (user) {
    await user.destroy();
    return null;
  }
};

export const tokenInvalid = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUzNSwidXNlcm5hbWUiOiJyeWFud2lyZTFAb3V0bG9vay5jb20iLCJpYXQiOjE1NjU1MzkzMTYsImV4cCI6MTU2ODEzMTMxNn0._wdtfKOKv4GKsIg7ORPdrtqRATqj5OWcpHqEC_xqwmM';
