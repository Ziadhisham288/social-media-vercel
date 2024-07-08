import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import userModel from "./usersModel.js";

const postsModel = sequelize.define("Posts", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

postsModel.belongsTo(userModel, {
  foreignKey: {
    name: "Author",
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

userModel.hasMany(postsModel, {
  foreignKey: "Author",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default postsModel;
