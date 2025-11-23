import { Router } from 'express';

const router = Router();


function isAdmin(req, res, next) {
    const isAdmin = true;
    if (isAdmin) {
        req.isAdmin = isAdmin
        // simulates username from the database
        req.usename = "Johnnie"
        return next();
    } 
        res.status(403).send({data: "you need to be an admin to acces this route"});
    }


router.get("/auth/secretroute", isAdmin, (req, res) => {
    console.log(req.isAdmin, req.usename);
    res.send({ data: "Some secret data" });
});


export default router;