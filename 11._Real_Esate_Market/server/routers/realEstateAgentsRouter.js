import { Router } from "express";


const router = Router();

const realestateagents = ["John Doe", "Jane Doe", "Jimmy Doe"]

router.get("/realestateagents", (req, res) => {
    res.send({ data: [] })
})



export default router;
