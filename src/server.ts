import express from "express";
import dbConnection from "./config/database";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import routes from "./routes";

dotenv.config();
dbConnection();

const app = express();
app.use(cors({ origin: 'https://localhost:5137', credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);
app.listen(process.env.PORT, () => {
    console.log(`Listening at http://localhost:${process.env.PORT}`)
});
