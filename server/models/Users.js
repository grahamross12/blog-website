module.exports = (sequelize, DataTypes) => {
  // Define the vehichles table
  const users = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updatedAt: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
      allowNull: false,
    },
  });

  return users;
};

// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize();
// const users = sequelize.define("users", {
//   username: {
//     type: DataTypes.STRING,
//   },
//   password: {
//     type: DataTypes.STRING,
//   },
//   createdAt: {
//     type: "TIMESTAMP",
//     defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
//     allowNull: false,
//   },
//   updatedAt: {
//     type: "TIMESTAMP",
//     defaultValue: sequelize.literal(
//       "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
//     ),
//     allowNull: false,
//   },
// });
// module.exports.users = users;
