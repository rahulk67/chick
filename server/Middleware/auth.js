import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Get the token from Authorization header in the format "Bearer <token>"
  const token = req.headers['authorization']?.split(" ")[1];
  // console.log(token,"sds")

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  try {
    // Verify and decode the token using your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user info to request for later use
    req.user = decoded;

    // Pass control to the next middleware/route
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
};
