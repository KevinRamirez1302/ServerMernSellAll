import { secretkey } from '../config.js';
import jwt from 'jsonwebtoken';

export const logicKey = secretkey || process.env.secretkey;

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: 'Not token unathorized' });

  jwt.verify(token, logicKey, (err, user) => {
    if (err) return res.status(400).json({ message: 'Token error' });

    req.user = user;
    next();
  });
};
