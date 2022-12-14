const { model } = require("mongoose");
let userModel = require("../models/userModel");
let orderModel = require("../models/orderModel");
const { find } = require("../models/userModel");


let createUser = async function (req, res) {
    try {
        const requestBody = req.body;

        // Object Destructuring 
        let { userName } = requestBody;

        if (!userName) {
            throw new Error("userName is required")
        }

        const newUser = await userModel.create(requestBody);

        res.status(201).send({ status: true, message: "User created successfully", data: newUser })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


const create_Order = async function(req,res){
    try {
        const order = req.body;

        const oderData = await orderModel.create (order);
        res.status(201).send({ status: true, message: "Order created successfully", data:oderData  })
        
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


const calculateDiscount = async function (req, res){
    try {
        const user_id = req.body;
        const totalPrice = req.body.totalPrice;
        const id = user_id.userId
        if(!user_id){
            throw new Error("user_id is required")
        };

        let data = await orderModel.find({userId : id})
        // console.log(data.length)
        // return false
        let gold1 = "gold";
        let platinum1 = "platinum"
        if(data.length>=10 && data.length<20){
            let caregorydata = await userModel.findOneAndUpdate({ _id: id }, { $set: { category : gold1 } }, { new: true })
            let dis_percent = "10"
            let discount = ((totalPrice * dis_percent)/100);
            let payble_amount =  totalPrice - discount

            const data1 = {};
            data1.category="gold"
            data1.totalPrice = totalPrice;
            data1.discount = discount;
            data1.payble_amount = payble_amount;

        console.log(data1)

            return data1;

        }
        else if(data.length>20){
            let caregorydata = await userModel.findOneAndUpdate({ _id: id }, { $set: { category : platinum1 } }, { new: true });
            let dis_percent = "20"
            let discount = ((totalPrice * dis_percent)/100);
            let payble_amount =  totalPrice - discount

            const data1 = {};
            data1.category = "platinum"
            data1.totalPrice = totalPrice;
            data1.discount = discount;
            data1.payble_amount = payble_amount;

        console.log(data1)

            return data1;
        };

        const data1 = {};
        data1.category = "regular"
        data1.totalPrice = totalPrice;
        data1.discount = "0";
        data1.payble_amount = totalPrice;

        console.log(data1)
        return data1
        
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createUser,create_Order ,calculateDiscount}