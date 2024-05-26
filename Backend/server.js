import express from "express";
// import dotenv from "dotenv";
// import errorHandler from "./middlewares/error-middleware.js";
// import userRoutes from "./routes/user-routes.js";
// import competitorRoutes from "./routes/competitor-routes.js";
// import cors from "cors";
// dotenv.config();
const app = express();

const PORT = 5000;

// app.use(
//   cors({
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     origin: "https://jutsa-management-system.vercel.app/",
//   })
// );
// // Middleware
// app.use(express.json());

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/competitors", competitorRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

// // Error handler middleware
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
