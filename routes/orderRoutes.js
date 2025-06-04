import express from 'express'
import orderModel from '../models/orderModel.js'

const orderRouter = express.Router()

orderRouter.post("/new", async(req, res)=>{
    const {email,price} = req.body
    const result = await orderModel.insertOne({email, price});
    return res.json(result);
})

orderRouter.get("/:id", async(req, res)=>{
    const email = req.params.id
    const result = await orderModel.findOne({email},{_id:0, price:1});
    return res.json(result);
})


export default orderRouter