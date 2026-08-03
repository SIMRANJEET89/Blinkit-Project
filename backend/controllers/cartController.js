import CartProductModel from '../models/cartproductModel.js'
import UserModel from '../models/userModel.js'

export const addToCartItemController = async(req,res) => {
    try {
        const userId = req.userId

        const { productId } = req.body

        if (!productId) {
            return res.status(402).json({
                message : "Provide productId",
                error : true,
                success : false
            })
        }

        const checkItemCart = await CartProductModel.findOne({
            userId : userId,
            productId : productId
        })

        if (checkItemCart) {
            return res.status(400).json({
                message : "item already in cart"
            })
            
        }
        const cartItem = new CartProductModel({
            quantity :  1,
            userId : userId,
            productId : productId
        })

        const save = await cartItem.save()

        const updateCartUser = await UserModel.updateOne({_id : userId}, {
            $push : {
                shopping_cart : productId
            }
        })

        return res.json({
            data : save,
            message : "Item added successfully",
            error : false,
            success : true

        })
        
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
        
    }
}

export const getCartItemController = async (req,res) => {
    try {
        const userId = req.userId

        const cartItem = await CartProductModel.find({
            userId : userId
        }).populate('productId')

        return res.json({
            data : cartItem,
            error : false,
            success : true
        })
        
    } catch (error) {
         return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
        
    }
}