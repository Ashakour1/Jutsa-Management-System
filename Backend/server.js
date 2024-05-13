import express from 'express';
import dotenv from "dotenv"
import errorHandler from './middlewares/error-middleware.js';
dotenv.config();
const app = express();

const PORT = 5000;
app.use(express.json());
app.use(errorHandler)

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
})