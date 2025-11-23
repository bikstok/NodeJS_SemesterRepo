import { Router } from "express";
import { getMatches } from "../util/matchesUtil.js";

const router = Router();


router.get("/api/matches", async (req, res) => {
  const matches = await getMatches();
  res.send({ data: matches });
});

console.log(router)


export default router;