// order route for buyer to make order

import express, { Request, Response } from "express";
import Cart, { ICart } from "../model/cart";
import Order from "../model/order";
import mongoose from "mongoose";

// place order route for buyer

export const placeOrder = async (req: Request, res: Response) => {
  try {
    // get the cart of the user
    const cart = await Cart.findOne({ user: req.user.id });

    // check if cart is exist and not empty
    if (!cart) {
      return res.status(404).json({
        error: "Cart not found",
      });
    }

    // check if cart is empty
    if (cart.items.length === 0) {
      return res.status(400).json({
        error: "Cart is empty",
      });
    }

    // create order
    const order = await Order.create({
      user: req.user.id,
      items: cart.items,
      totalAmount: cart.totalAmount,
    });

    // empty the cart
    await Cart.findOneAndUpdate(
      { user: req.user.id },
      {
        $set: {
          items: [],
          totalAmount: 0,
        },
      },
      { new: true }
    );

    res.status(200).json({
      order,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred",
    });
  }
};

// get all orders for a buyer
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "items.product"
    );

    res.status(200).json({
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred",
      message: error.message,
    });
  }
};

// get a single order detail for a buyer
export const getOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid order id",
      });
    }

    const order = await Order.findOne({
      _id: id,
      user: req.user.id,
    }).populate("items.product");

    if (!order) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    res.status(200).json({
      order,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred",
    });
  }
};
