const express = require('express');

const router = express.Router();


const { createUser,create_Order,calculateDiscount,check_Total_Discount } = require('../controllers/controller');



router.post("/create-user", createUser);

router.post("/create-order", create_Order);

router.post("/calculate-discount", calculateDiscount);

router.post("/total-discount", check_Total_Discount);





module.exports = router;