import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());


import cors from "cors";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);


import session from "express-session";

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
      secure: false,
      sameSite: "none"
    }
}));

import helmet from 'helmet';
app.use(helmet());


// Routers
import registerRouter from "./routers/registerRouter.js";
app.use(registerRouter);

import loginRouter from "./routers/loginRouter.js";
app.use(loginRouter);

import logoutRouter from "./routers/logoutRouter.js";
app.use(logoutRouter);

import sessionRouter from "./routers/sessionRouter.js";
app.use(sessionRouter);


const PORT = Number(process.env.PORT) | 8080;

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});