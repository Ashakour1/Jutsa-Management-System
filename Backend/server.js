import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middlewares/error-middleware.js";
import userRoutes from "./routes/user-routes.js";
dotenv.config();
const app = express();

const PORT = 5000;

// Middleware 
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
