import jwt from 'jsonwebtoken';
import { logicKey } from '../Middlewares/validateToken.js';
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      logicKey,
      {
        expiresIn: '1d',
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
