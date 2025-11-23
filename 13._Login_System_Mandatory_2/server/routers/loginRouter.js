import { Router } from "express";
import { comparePasswords } from "../util/passwordHashUtil.js";
import supabase from "../util/supabaseUtil.js";

const router = Router(); 

router.post("/api/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .limit(1);

    if (error) {
      console.error(error);
      return res.status(500).send({ error: "Database error" });
    }

    const user = users[0];
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    const isValid = await comparePasswords(password, user.password);
    if (!isValid) {
      return res.status(401).send({ error: "Wrong password" });
    }

    req.session.userId = user.id;

    res.status(200).send({
      data: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

export default router;
