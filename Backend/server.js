import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middlewares/error-middleware.js";
import userRoutes from "./routes/user-routes.js";
import competitorRoutes from "./routes/competitor-routes.js";
import positionRoutes from "./routes/position-routes.js";
import memberRoutes from "./routes/member-routes.js";
import financeRoutes from "./routes/finance-routes.js";
import SportRoutes from "./routes/sport-routes.js";
import CaawiyeRoutes from "./routes/caawiye-routes.js";
import FormRoutes from "./routes/form-status.js";
import cors from "cors";

dotenv.config();
const app = express();

const PORT = 5000;

app.use(
  cors({
    origin: "*",
  })
);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/positions", positionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/competitors", competitorRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/sports", SportRoutes);
app.use("/api/caawiye", CaawiyeRoutes);
app.use("/api", FormRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/finances", financeRoutes);

let formVisibility = { showForm: true };

// Route to get form visibility status
app.get("/api/form", (req, res) => {
  res.json(formVisibility); // Return current visibility status
});

// Route to update form visibility status
app.post("/api/form", (req, res) => {
  const { showForm } = req.body;

  if (typeof showForm !== "boolean") {
    return res.status(400).json({ message: "showForm should be a boolean" });
  }

  // Update the in-memory form visibility status
  formVisibility = { showForm };

  res.json({ message: "Form visibility updated successfully" });
});
// Error handler middleware
app.use(errorHandler);

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
