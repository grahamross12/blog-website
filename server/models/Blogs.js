module.exports = (sequelize, DataTypes) => {
  // Define the blogs table
  const blogs = sequelize.define("blogs", {
    userid: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.TEXT,
    },
    content: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
    },
    saves: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return blogs;
};
