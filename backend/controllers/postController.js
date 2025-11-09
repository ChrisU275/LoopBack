import { Post } from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { title, category, type, description, location, userId } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const post = await Post.create({ title, category, type, description, location, imageUrl, UserId: userId });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
};
