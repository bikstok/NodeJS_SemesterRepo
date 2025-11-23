import {Router} from 'express'
import db from "../database/connection.js"
const router = Router ();


router.post('/api/users', async (req, res) => {
    const {user_name, user_role} = req.body;
    const  {lastID} = db.run('INSERT INTO users (user_name, user_role) VALUES (?,?);', [user_name, user_role])
    console.log(result)
    res.send({data: {createdId: lastID}})
});




export default router;