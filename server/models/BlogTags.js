module.exports = (sequelize, DataTypes) => {
  // Define the users table
  const blogTags = sequelize.define("blogTags", {
    blogId: {
      type: DataTypes.INTEGER,
    },
    tagId: {
      type: DataTypes.INTEGER,
    },
  });

  return blogTags;
};
