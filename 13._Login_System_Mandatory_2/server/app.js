import "dotenv/config";
import express from "express";
import session from "express-session";

const app = express();

app.use(express.json());

import registerRouter from "./routers/registerRouter.js";
app.use(registerRouter);



const PORT = Number(process.env.PORT) | 8080;

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "fitness-client/index.html"));
});

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
