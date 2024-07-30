const { Router } = require("express");
const router = Router();
const {login,register,logout,profile,verifyToken} = require("../controllers/authController");
const authRequired = require('../middlewares/validateToken')
const validateSchema = require('../middlewares/validator.Middleware')
const {registerSchema,loginSchema} = require('../schemas/authSchema')

router.post("/register",validateSchema(registerSchema), register);
router.post("/login",validateSchema(loginSchema),login);
router.post("/logout", logout);
router.get("/profile",authRequired, profile);
router.get("/verify",verifyToken);


module.exports = router;
