let mongoose = require('mongoose');
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


const create_Order = async function (req, res) {
    try {
        const order = req.body;

        const oderData = await orderModel.create(order);
        res.status(201).send({ status: true, message: "Order created successfully", data: oderData })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


const calculateDiscount = async function (req, res) {
    try {
        const user_id = req.body.userId;
        const totalPrice = req.body.totalPrice;

        if (!user_id) {
            throw new Error("user_id is required")
        };

        let data = await orderModel.find({ userId: user_id })

        if (data.length >= 10 && data.length < 20) {
            let caregorydata = await userModel.findOneAndUpdate({ _id: user_id }, { $set: { category: "gold" } }, { new: true })

            let dis_percent = "10"
            let discount = ((totalPrice * dis_percent) / 100);
            let payble_amount = totalPrice - discount

            const data1 = {};
            data1.category = "gold"
            data1.totalPrice = totalPrice;
            data1.discount = discount;
            data1.payble_amount = payble_amount;

            console.log(data1)

            return data1;

        }
        else if (data.length > 20) {
            let caregorydata = await userModel.findOneAndUpdate({ _id: id }, { $set: { category: "platinum" } }, { new: true });
            let dis_percent = "20"
            let discount = ((totalPrice * dis_percent) / 100);
            let payble_amount = totalPrice - discount

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


const check_Total_Discount = async function (req, res) {
    try {
        const user_id = req.body.userId;

        let data = await orderModel.find({ userId: user_id });

        if (data.length > 9) {

            let data1 = await orderModel.find({ userId: user_id }).skip(9).limit(19);
            // console.log(data1);
            let sum1 = 0;
            data1.forEach(element => {
                sum1 += element.price;
            });
            // console.log(sum1);
            var dis_percent = "10"
            discount1 = ((sum1 * dis_percent) / 100);

            let data2 = await orderModel.find({ userId: user_id }).skip(19);
            let sum2 = 0;
            data2.forEach(element => {
                sum2 += element.price;
            });
            // console.log(sum2);
            var dis_percent = "20"
            discount2 = ((sum2 * dis_percent) / 100);
            
            total_discount = discount1 + discount2

            console.log(total_discount);
            return total_discount

        } else {
            (res.send({ status: true, message: "This is regular user", discount: ["0.00"] }));
        }

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createUser, create_Order, calculateDiscount, check_Total_Discount }