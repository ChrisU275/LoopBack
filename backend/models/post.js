import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./User.js";

export const Post = sequelize.define("Post", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: DataTypes.STRING,
  category: DataTypes.STRING,
  type: DataTypes.ENUM("Trade", "Donate", "Repair"),
  description: DataTypes.TEXT,
  location: DataTypes.STRING,
  imageUrl: DataTypes.STRING,
  status: { type: DataTypes.ENUM("Available", "Requested", "Completed"), defaultValue: "Available" }
});

User.hasMany(Post);
Post.belongsTo(User);
