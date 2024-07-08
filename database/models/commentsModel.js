import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import postsModel from "./postsModel.js";
import userModel from "./usersModel.js";

const commentsModel = sequelize.define("Comments", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});


commentsModel.belongsTo(postsModel, {
  foreignKey: {
    name: "PostId",
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

postsModel.hasMany(commentsModel, {
  foreignKey: "PostId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

commentsModel.belongsTo(userModel, {
  foreignKey: {
    name: "UserId",
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

userModel.hasMany(commentsModel, {
  foreignKey: "UserId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default commentsModel;