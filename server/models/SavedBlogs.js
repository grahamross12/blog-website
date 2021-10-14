module.exports = (sequelize, DataTypes) => {
  // Define the table to store blog favourites
  const savedBlogs = sequelize.define("savedBlogs", {
    userid: {
      type: DataTypes.INTEGER,
    },
    blogid: {
      type: DataTypes.INTEGER,
    },
  });

  return savedBlogs;
};
