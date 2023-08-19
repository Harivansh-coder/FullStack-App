// // order route for buyer to make order

// import express, { Request, Response } from "express";
// import Cart from "../model/cart";
// import Order from "../model/order";

// // place order route for buyer

// export const placeOrder = async (req: Request, res: Response) => {

//     try {

//             // get the cart of the user

//             const cart = await Cart.findOne({ user: req.user.id });

//             // check if cart is empty

//             if (!cart) {

//                 return res.status(404).json({

//                     error: "Cart not found",

//                 });

//             }

//             // check if cart is empty

//             if (cart.items.length === 0) {

//                 return res.status(400).json({

//                     error: "Cart is empty",

//                 });

//             }

//             // create order

//             const order = await Order.create({

//                 user: req.user.id,

//                 items: cart.items,

//                 totalAmount: cart.totalAmount,

//             });

//             // empty the cart

//             await Cart.findOneAndUpdate(

//                 { user: req.user.id },

//                 {

//                     $set: {

//                         items: [],

//                         totalAmount: 0,

//                     },

//                 },

//                 { new: true }

//             );

//             res.status(200).json({

//                 order,

//             });

//         }
