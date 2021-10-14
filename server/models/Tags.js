module.exports = (sequelize, DataTypes) => {
  // Define the users table
  const tags = sequelize.define("tags", {
    tag: {
      type: DataTypes.STRING,
    },
  });

  return tags;
};
