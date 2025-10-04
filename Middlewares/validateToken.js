import { secretkey } from '../config.js';
import jwt from 'jsonwebtoken';

export const logicKey = secretkey || process.env.secretkey;

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);

  if (!token) return res.status(401).json({ message: 'Not token unathorized' });

  jwt.verify(
    token,
    logicKey,
    {
      maxAge: 24 * 60 * 60 * 1000,
    },
    (err, user) => {
      if (err) return res.status(400).json({ message: 'Token error' });

      req.user = user;
      next();
    }
  );
};
