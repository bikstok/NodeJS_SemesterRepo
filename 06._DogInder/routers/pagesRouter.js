import { Router } from "express";
import { frontpagePage, matchesPage, contactPage } from "../util/pagesUtil.js";


const router = Router();


router.get("/", (req, res) => {
 // res.sendFile(path.resolve("public/pages/frontend/index.html"));
    res.send(frontpagePage)
});

router.get("/matches", (req, res) => {
  // res.sendFile(path.resolve("public/pages/matches/matches.html"));
    res.send(matchesPage)
});

router.get("/contact", (req,res) => {
    res.send(contactPage)
})


console.log(router)


export default router;