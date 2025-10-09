import express from "express";
import path from "path";

const app = express();

console.log(process.PWD);

app.use(express.static("public"));

// ============================PAGES===============================




import { frontpagePage, matchesPage } from "./util/pagesUtil.js";

app.get("/", (req, res) => {
 // res.sendFile(path.resolve("public/pages/frontend/index.html"));
    res.send(frontpagePage)
});

app.get("/matches", (req, res) => {
  // res.sendFile(path.resolve("public/pages/matches/matches.html"));
    res.send(matchesPage)
});

// =============================API=================================

import { getMatches } from "./util/matchesUtil.js";

app.get("/api/matches", async (req, res) => {
  const matches = await getMatches();
  res.send({ data: matches });
});

const env = {
  PORT: 666,
};

const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
  console.log("RUNNING SERVER ON PORT", PORT);
});
