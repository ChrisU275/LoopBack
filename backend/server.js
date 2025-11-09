import express from "express";
import cors from "cors";
import { connectDB, sequelize } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

await connectDB();
await sequelize.sync();

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    console.log("🟡 Connecting to database...");
    await connectDB();
    await sequelize.sync();
    console.log("✅ Database connected and synced!");

    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();
