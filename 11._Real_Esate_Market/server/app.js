import 'dotenv/config'
import express from 'express';
const app = express ();

app.use(express.json());

/* import cors from 'cors'
app.use(cors({
  origin: true,
  credentials: true
}));
*/ 

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


import session from 'express-session'

console.log(process.env.SESSION_SECRET)

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


// routers: real estate agents
import realEstateAgentsRouter from "./routers/realEstateAgentsRouter.js"
app.use(realEstateAgentsRouter)
import housesRouter from "./routers/housesRouter.js"
app.use(housesRouter)

const PORT = Number(process.env.PORT) || 9090;

app.listen(PORT, () => {
    console.log("server is running on ", PORT)
})



