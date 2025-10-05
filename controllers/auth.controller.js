import { userModel } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../Libs/jwt.js';
import jwt from 'jsonwebtoken';
import { logicKey } from '../Middlewares/validateToken.js';
import { welcomeN8N } from '../utilities/welcomeN8N.js';

// Cookie options centralization
// In production we need SameSite=None and Secure=true for cross-site cookies.
// In development (localhost) Secure must be false so the browser accepts the cookie over HTTP.
const cookieOptions = {
  httpOnly: true,
  path: '/',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  secure: process.env.NODE_ENV === 'production',
  // maxAge set to 1 day; adjust as needed
  maxAge: 24 * 60 * 60 * 1000,
  // domain can be set when you want to share cookie across subdomains, e.g. '.midominio.com'
  domain: process.env.COOKIE_DOMAIN || undefined,
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const userFound = await userModel.findOne({ email });
  if (userFound) {
    return res.status(400).json(['El usuario ya está registrado']);
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: passwordHash,
    });

    const saveUser = await newUser.save();
    const token = await createAccessToken({ id: saveUser._id });
    res.cookie('token', token, cookieOptions);

    try {
      await welcomeN8N({
        name: saveUser.name,
        email: saveUser.email,
      });
      console.log('Correo de bienvenida enviado correctamente');
    } catch (error) {
      console.error('Error al enviar correo de bienvenida:', error);
      // Continuamos aunque falle el envío del correo
    }

    res.json({
      id: saveUser._id,
      name: saveUser.name,
      email: saveUser.email,
    });
  } catch (err) {
    res.status(500).send(['Error al registrar al usuario']);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await userModel.findOne({ email });
    if (!userFound) return res.status(400).json(['User not found']);
    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) return res.status(400).json(['Incorrect password']);

    const token = await createAccessToken({ id: userFound._id });
    res.cookie('token', token, cookieOptions);

    res.json({
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
    });
  } catch (err) {
    res.send(err);
  }
};

export const profile = async (req, res) => {
  const userFound = await userModel.findById(req.user.id);
  if (!userFound) return res.status(400).json(['User not found']);
  return res.json({
    name: userFound.name,
    id: userFound._id,
    email: userFound.email,
  });
};

export const logout = (req, res) => {
  // Use clearCookie with same options so the browser recognises and removes it
  res.clearCookie('token', { ...cookieOptions, maxAge: 0 });
  return res.sendStatus(200);
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, logicKey, async (err, user) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });

    const userFound = await userModel.findById(user.id);

    if (!userFound) return res.status(401).json({ message: 'Unauthorized' });

    return res.json({
      id: userFound._id,
      email: userFound.email,
      name: userFound.name,
    });
  });
};
