module.exports = (sequelize, DataTypes) => {
  // Define the blogs table
  const blogs = sequelize.define("blogs", {
    userid: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
  });

  return blogs;
};
