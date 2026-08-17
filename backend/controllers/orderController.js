import CartProductModel from '../models/cartproductModel.js'
import OrderModel from '../models/orderModel.js'
import UserModel from '../models/userModel.js'
import mongoose from 'mongoose'


export async function CODController (req,res) {
    try {
        const userId = req.userId //auth middleware
        const {list_items, totalAmt,addressId, subTotalAmt} = req.body

        const payload = list_items.map(el => {
            return({
               userId : userId,
               orderId : `ORD-${new mongoose.Types.ObjectId()}`,
               productId : el.productId._id,
               product_details : {
                   name : el.productId.name,
                   image : el.productId.image
               },
               paymentId : "",
               payment_status : "CASH ON DELIVERY",
               delivery_address : addressId,
               subTotalAmt :subTotalAmt,
               totalAmt : totalAmt
            })
        })

        const generatedOrder = await OrderModel.insertMany(payload)

        // remove from cart
        const removeCartItems = await CartProductModel.deleteMany({userId : userId})
        const updateInUser = await
         UserModel.updateOne({_id : userId}, {shopping_cart : []})

        return res.json({
            message : "Order Successful",
            success : true,
            error : false,
            data : generatedOrder
        })
             
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
        
    }
}