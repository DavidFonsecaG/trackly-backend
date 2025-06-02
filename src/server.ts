require('dotenv').config();
import express from "express";
import dbConnection from "./config/database";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./config/passport";
import routes from "./routes";

dbConnection();

const app = express();
app.use(cors({ origin: 'https://localhost:5137', credentials: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
app.use('/api', routes);
app.listen(process.env.PORT, () => {
    console.log(`Listening at http://localhost:${process.env.PORT}`)
});
