import Stripe from "../config/stripe.js";
import CartProductModel from "../models/cartproductModel.js";
import OrderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import mongoose from "mongoose";

export async function CODController(req, res) {
  try {
    const userId = req.userId; //auth middleware
    const { list_items, totalAmt, addressId, subTotalAmt } = req.body;

    const payload = list_items.map((el) => {
      return {
        userId: userId,
        orderId: `ORD-${new mongoose.Types.ObjectId()}`,
        productId: el.productId._id,
        product_details: {
          name: el.productId.name,
          image: el.productId.image,
        },
        paymentId: "",
        payment_status: "CASH ON DELIVERY",
        delivery_address: addressId,
        subTotalAmt: subTotalAmt,
        totalAmt: totalAmt,
      };
    });

    const generatedOrder = await OrderModel.insertMany(payload);

    // remove from cart
    const removeCartItems = await CartProductModel.deleteMany({
      userId: userId,
    });
    const updateInUser = await UserModel.updateOne(
      { _id: userId },
      { shopping_cart: [] },
    );

    return res.json({
      message: "Order Successful",
      success: true,
      error: false,
      data: generatedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export const priceWithDiscount = (price, dis = 1) => {
  const discountAmount = Math.ceil((Number(price) * Number(dis)) / 100);
  const actualPrice = Number(price) - Number(discountAmount);
  return actualPrice;
};

export async function paymentController(req, res) {
  try {
    const userId = req.userId; //auth middleware
    const { list_items, totalAmt, addressId, subTotalAmt } = req.body;

    const user = await UserModel.findById(userId);

    const line_items = list_items.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.productId.name,
            images: item.productId.images,
            metadata: {
              productId: item.productId._id,
            },
          },
          unit_amount: priceWithDiscount(
            item.productId.price,
            item.productId.discount,
          ),
        },
        adjustable_quantity: {
          encoded: true,
          minimum: 1,
        },
        quantity: item.quantity,
      };
    });
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,
      metadata: {
        userId: userId,
        addressId: addressId,
      },
      line_items: line_items,
      success_url: `${process.env.FRONTEND_UR}/success`,
      cancel_url: `${process.env.FRONTEND_UR}/cancel`,
    };
    const session = await Stripe.checkout.session.create(params);

    return res.status(303).json(session);
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
