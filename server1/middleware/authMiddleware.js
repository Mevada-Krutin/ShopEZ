import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // console.log("Auth header:", req.headers.authorization);
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });

  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    // ✅ Store whatever you signed in the token
    req.user = { id: decoded.id, isAdmin: decoded.isAdmin };
    next();
  } catch (error) {
    return res.status(401).json({ 
      error:error || error.message,
      message: "Invalid token" });
  }
};

export const verifyAdminToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");

    // ✅ Only allow if isAdmin is true
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.admin = decoded; // attach decoded info to req.admin
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
