import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middlewares/error-middleware.js";
import userRoutes from "./api/users/index.js";
import competitorRoutes from "./api/competitors/index.js";
import positionRoutes from "./api/positions/index.js";
import memberRoutes from "./api/members/index.js";
import financeRoutes from "./api/finances/index.js";
import cors from "cors";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({}));
// Middleware
app.use(express.json());

// Routes
app.use("/api/positions", positionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/competitors", competitorRoutes);
app.use("/api/members", memberRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/finances", financeRoutes);

// Error handler middleware
app.use(errorHandler);

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
