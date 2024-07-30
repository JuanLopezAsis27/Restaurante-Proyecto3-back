const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createAccesToken = require("../utils/jwt");

const register = async (req, res) => {
  try {

  let { username, email, password } = req.body;
  const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json(["Ya hay un usuario registrado con este email"],);

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: passwordHash });

    userSaved = await newUser.save();

    const token = await createAccesToken({ id: userSaved._id });

    res.cookie("token", token);
    res.status(201).json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      admin: userSaved.admin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  let { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccesToken({ id: userFound._id });

    res.cookie("token", token);
    res.status(201).json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      admin: userFound.admin
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound)
    return res.status(400).json({ message: "usuario no encontrado" });

  return res.json({
    id: userFound.id,
    username: userFound.username,
    email: userFound.email,
  });
};

const verifyToken = async (req, res) =>{
    const {token} = req.cookies;

    if (!token) return res.send(false);

    jwt.verify(token,process.env.SECRET_KEY,async(err,user)=>{
      if (err) return res.status(401).json({message:'no autorizado'});

      const userFound = await User.findById(user.id)

      if(!userFound) res.status(401).json({message:'no autorizado'});

      return res.json({
        id:userFound._id,
        username:userFound.username,
        email:userFound.email,
        admin:userFound.admin
      });
    })
}

module.exports = {
  register,
  login,
  logout,
  profile,
  verifyToken
};
