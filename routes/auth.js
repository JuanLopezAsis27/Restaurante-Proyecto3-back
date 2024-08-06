const { Router } = require("express");
const router = Router();
const {login,register,logout,profile,verifyToken,getUsers,deleteUser,disableUser,enableUser,updateUser} = require("../controllers/authController");
const authRequired = require('../middlewares/validateToken')
const validateSchema = require('../middlewares/validator.Middleware')
const {registerSchema,loginSchema} = require('../schemas/authSchema')

router.post("/register",validateSchema(registerSchema), register);
router.post("/login",validateSchema(loginSchema),login);
router.post("/logout", logout);
router.get("/profile",authRequired, profile);
router.get("/getUsers",authRequired, getUsers);
router.get("/verify",verifyToken);
router.delete("/deleteUser/:id",authRequired,deleteUser);
router.put("/disableUser/:id",authRequired, disableUser);
router.put("/enableUser/:id",authRequired,enableUser);
router.put("/updateUser/:id",authRequired,updateUser)

module.exports = router;
