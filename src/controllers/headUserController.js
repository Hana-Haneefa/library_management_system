import { addHeadUser, loginAuth } from "../services/headUserService.js";

// controller for add head user
export async function addHeadUserController(req, res) {
  const { name, email, password, role } = req.body;
  if (!name.trim() || !email.trim() || !password.trim() || !role.trim()) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const newUser = await addHeadUser({ name, email, password, role });
    res
      .status(201)
      .json({ message: "Head user added successfully", data: { id: newUser } });
  } catch (err) {
    res.status(500).json({ error: "Error adding head user" });
  }
}

// controller for login head user
export async function loginAuthController(req, res) {
  const { email, password } = req.body;
  if (!email.trim() || !password.trim()) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const userAuth = await loginAuth(email);
    if (!userAuth) {
      return res.status(404).json({ error: "User not found" });
    }
    if (userAuth.hPassword !== password && userAuth.hEmail === email) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    return res
      .status(200)
      .json({ message: "Login successful", data: userAuth });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error logging in head user", msg: err.message });
  }
}
