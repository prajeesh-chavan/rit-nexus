const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

const User = require("../models/User");

// const isAdmin = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);

//     if (user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied. Admins only." });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Authentication failed." });
//   }
// };

// module.exports = { isAdmin };
