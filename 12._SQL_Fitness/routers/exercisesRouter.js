import { Router } from "express";
import db from "../database/connection.js"


const router = Router();



const result = await db.all('SELECT * FROM exercises;')

console.log("result")

router.get('/api/exercises/:userId', async (req, res) => {
    const result = await db.all('SELECT * FROM exercises WHERE user_id = ?;', req.params.userId)
    res.send({data: result})
});

export default router;