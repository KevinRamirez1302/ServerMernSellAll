import { userModel } from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../Libs/jwt.js'
import jwt from 'jsonwebtoken'
import { secretkey } from '../config.js'

export const register = async (req, res) => {
  const { name, email, password } = req.body
  const userFound = await userModel.findOne({ email })
  if (userFound) {
    return res.status(400).json(['El usuario ya está registrado'])
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new userModel({
      name,
      email,
      password: passwordHash
    })

    const saveUser = await newUser.save()
    const token = await createAccessToken({ id: saveUser._id })
    res.cookie('token', token)

    res.json({
      id: saveUser._id,
      name: saveUser.name,
      email: saveUser.email
    })
  } catch (err) {
    res.status(500).send(['Error al registrar al usuario'])
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const userFound = await userModel.findOne({ email })
    if (!userFound) return res.status(400).json(['User not found'])
    const isMatch = await bcrypt.compare(password, userFound.password)

    if (!isMatch) return res.status(400).json(['Incorrect password'])

    const token = await createAccessToken({ id: userFound._id })
    res.cookie('token', token)

    res.json({
      id: userFound._id,
      name: userFound.name,
      email: userFound.email
    })
  } catch (err) {
    res.send(err)
  }
}

export const profile = async (req, res) => {
  const userFound = await userModel.findById(req.user.id)
  if (!userFound) return res.status(400).json(['User not found'])
  return res.json({
    name: userFound.name,
    id: userFound._id,
    email: userFound.email
  })
}

export const logout = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0)
  })

  return res.sendStatus(200)
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookies

  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  jwt.verify(token, secretkey, async (err, user) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' })

    const userFound = await userModel.findById(user.id)

    if (!userFound) return res.status(401).json({ message: 'Unauthorized' })

    return res.json({
      id: userFound._id,
      email: userFound.email,
      name: userFound.name
    })
  })
}
