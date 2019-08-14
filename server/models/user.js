const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.beforeSave(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  async function comparePassword(password, cb) {
    const match = await bcrypt.compare(password, this.password);
    if (match) {
      return cb(match);
    }
    return cb(false);
  }

  User.prototype.comparePassword = comparePassword;

  User.associate = (models) => {
    User.hasMany(models.Todo);
  };
  return User;
};
