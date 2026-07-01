import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access token missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ success: false, message: "Invalid access token" });
  }
}

//check if the user is admin
export function authorizeAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Forbidden: Admins only" });
  }
  next();
}
//check if the user is librarian
export function authorizeLibrarian(req, res, next) {
  if (req.user.role !== "librarian") {
    return res
      .status(403)
      .json({ success: false, message: "Forbidden: Librarians only" });
  }
  next();
}

//check if the user is student
export function authorizeStudent(req, res, next) {
  if (req.user.role !== "student") {
    return res
      .status(403)
      .json({ success: false, message: "Forbidden: Students only" });
  }
  next();
}
