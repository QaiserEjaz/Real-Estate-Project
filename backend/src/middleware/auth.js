const jwt = require("jsonwebtoken");

function auth(requiredRoles) {
  return (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      if (requiredRoles) {
        // Allow string or array
        const allowed = Array.isArray(requiredRoles)
          ? requiredRoles
          : [requiredRoles];
        if (!allowed.includes(decoded.role)) {
          return res
            .status(403)
            .json({ message: "Forbidden: insufficient role" });
        }
      }
      next();
    } catch (err) {
      res.status(401).json({ message: "Token is not valid" });
    }
  };
}

module.exports = auth;
