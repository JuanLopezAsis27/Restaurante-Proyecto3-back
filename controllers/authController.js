const User = require("../models/user");
const Reserve = require("../models/reserves");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createAccesToken = require("../utils/jwt");

const register = async (req, res) => {
  try {

  let { username, email, password, admin, fotoPerfil } = req.body;
  const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json(["Ya hay un usuario registrado con este email"],);

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: passwordHash, admin, fotoPerfil });

    userSaved = await newUser.save();

    const token = await createAccesToken({ id: userSaved._id });

    res.cookie("token", token,{
      expires: new Date(Date.now() + 900000),
      sameSite:'none',
      secure:true,
      httpOnly:false,
      priority:"high",

    });
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

    if(!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    if (userFound.state==false) return res.status(400).json({ message: "Su cuenta se encuentra suspendida" }) ; 


    const token = await createAccesToken({ id: userFound._id });

    res.cookie("token", token,{
      expires: new Date(Date.now() + 900000),
      sameSite:'none',
      secure:true,
      httpOnly:false,
      priority:"high",
    });
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
  sameSite:'none',
  secure:true,
  httpOnly:false,
  priority:"high",
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

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    return res.status(404).json({ message: "Surgio un error y no se pudo encontrar los usuarios" });
    
  }
};


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    const reserve = await Reserve.deleteMany({user:id})
    
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
};

const disableUser = async (req,res)=>{
  let {id} =req.params;
  const usuario = await User.findById(id)
  if (!usuario.state) {
      return res.json({msg:"El usuario ya esta inactivo"})
  }
  const usuarioInactivo = await User.findByIdAndUpdate(id,{state:false},{new:true})

  return res.sendStatus(204);
}

const enableUser = async (req,res)=>{
  let {id} =req.params;
  const usuario = await User.findById(id)

  if (usuario.state) {
      return res.json({msg:"El usuario ya esta activo"})
  }

  let usuarioActivo = await User.findByIdAndUpdate(id,{state:true},{new:true})

  return res.sendStatus(204);
}

const updateUser = async (req,res)=>{
  try {
    let {id} = req.params
  let resto = req.body
  let {email} = resto
  const userFound = await User.find({ email });
  const sameEmail=userFound.find((user)=>user.email==email && user._id!=id)
  console.log(sameEmail);
  
  if(sameEmail) return res.status(400).json(["Ya hay un usuario registrado con este email"],);

  // if (resto?.password) {
  //     resto.password = bcryptjs.hashSync(resto.password,10)
  //     const usuario = await Usuario.findByIdAndUpdate(id,resto,{new:true})
  //     res.status(203).json({usuario})
  // }else{
      const user = await User.findByIdAndUpdate(id,resto,{new:true})
      res.status(203).json({
        id: user._id,
        username: user.username,
        email: user.email,
        admin: user.admin
      });
  // }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
  register,
  login,
  logout,
  profile,
  verifyToken,
  getUsers,
  disableUser,
  enableUser,
  deleteUser,
  updateUser
  };
