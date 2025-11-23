import "dotenv/config";
import express from "express";

const app = express();

app.use(express.json());


import session from "express-session";

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

import registerRouter from "./routers/registerRouter.js";
app.use(registerRouter);

import loginRouter from "./routers/loginRouter.js";
app.use(loginRouter);



const PORT = Number(process.env.PORT) | 8080;

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "fitness-client/index.html"));
});

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
