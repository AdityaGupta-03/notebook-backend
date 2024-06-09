const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  // 1. Extract the token from the request headers
  const token = req.header('auth-token');

  // 2. Check if the token is present
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    // 3. Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach the decoded user data to the request object
    req.user = decoded;

    // 5. Call the next middleware or route handler
    next();
  } catch (e) {
    // 6. Handle token verification errors
    res.status(400).send("Invalid Token");
  }
};

module.exports = fetchUser;