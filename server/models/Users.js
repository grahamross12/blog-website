module.exports = (sequelize, DataTypes) => {
  // Define the users table
  const users = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  });

  return users;
};
