import jwt from 'jsonwebtoken';

export const generateToken = (id: string, role: string): string => {
  const secret = process.env.JWT_SECRET || 'fallback_test_secret';
  return jwt.sign({ id, role }, secret, { expiresIn: '1d' });
};