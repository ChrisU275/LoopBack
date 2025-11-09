import express from "express";
import multer from "multer";
import { createPost, getAllPosts } from "../controllers/postController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), createPost);
router.get("/", getAllPosts);

export default router;
