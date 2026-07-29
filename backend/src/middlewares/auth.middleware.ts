import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Adjust this path if your User model is located elsewhere

// Extend the Express Request interface to include the user object
export interface AuthRequest extends Request {
  user?: any; // Replace 'any' with your actual User interface if you have one exported from the model
}

interface DecodedToken {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

// PROTECT: Verifies the JWT and attaches the user to the request
export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  // Check for the token in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

    // Fetch the user from the database (excluding the password)
    const currentUser = await User.findById(decoded.id).select('-password');

    if (!currentUser) {
      return res.status(401).json({ message: 'The user belonging to this token no longer exists.' });
    }

    // Attach user to the request object
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed or expired' });
  }
};

// AUTHORIZE ADMIN: Role-Based Access Control (RBAC)
export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Ensure the user exists and has the 'admin' role
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied: Admin privileges required' });
  }
};