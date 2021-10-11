module.exports = (sequelize, DataTypes) => {
  // Define the users table
  const users = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    picture: {
      type: DataTypes.STRING,
    },
  });

  return users;
};
