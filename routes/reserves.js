const {Router} = require('express');
const authRequired = require('../middlewares/validateToken');
const router = Router();
const {getReserves,getUserReserves,getReserve,createReserve,updateReserve,deleteReserve}=require('../controllers/reservesController');
const validateSchema = require('../middlewares/validator.Middleware');
const {createReserveSchema} = require('../schemas/reserveSchema');


router.get('/reserves',authRequired,getReserves);
router.get('/userReserves',authRequired,getUserReserves);
router.get('/reserve/:id',authRequired,getReserve);
router.post('/reserve',authRequired,validateSchema(createReserveSchema),createReserve);
router.delete('/reserve/:id',authRequired,deleteReserve);
router.put('/reserve/:id',authRequired,authRequired,validateSchema(createReserveSchema),updateReserve);





module.exports = router;
