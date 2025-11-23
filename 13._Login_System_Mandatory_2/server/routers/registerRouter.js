import { Router } from "express";
import { comparePasswords } from "../util/passwordHashUtil.js"; 
import supabase from "../util/supabaseUtil.js";

const router = Router();

router.post("/api/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send({ error: "Email and password are required" });
  }

  try {
    // Get the user by email
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .limit(1);

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).send({ error: "Database error" });
    }

    const user = users[0];

    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    // Compare the password with the hashed password in DB
    const isValid = await comparePasswords(password, user.password);

    if (!isValid) {
      return res.status(401).send({ error: "Incorrect password" });
    }

    
    // Return user info
    return res.status(200).send({
      data: {
        id: user.id,
        username: user.user_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
});

export default router;
