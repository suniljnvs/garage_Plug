const express = require('express');

const router = express.Router();


const { createUser,create_Order,calculateDiscount } = require('../controllers/controller');



router.post("/create-user", createUser)
// router.post("/login-user", login_User)
router.post("/create-order", create_Order)
router.post("/calculate-discount", calculateDiscount)





module.exports = router;