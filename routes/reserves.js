const {Router} = require('express')
const authRequired = require('../middlewares/validateToken')
const router = Router();
const {getReserves,getUserReserves,getReserve,createReserve,updateReserve,deleteReserve}=require('../controllers/reservesController')
const validateSchema = require('../middlewares/validator.Middleware')
const {createReserveSchema} = require('../schemas/reserveSchema')



router.get('/getReserves',authRequired,getReserves)
router.get('/getUserReserves',authRequired,getUserReserves)
router.get('/getOneReserve/:id',authRequired,getReserve)
router.post('/createReserve',authRequired,validateSchema(createReserveSchema),createReserve)
router.delete('/deleteReserve/:id',authRequired,deleteReserve)
router.put('/updateReserve/:id',authRequired,updateReserve)





module.exports = router;
