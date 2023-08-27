// cart management controller

import { Request, Response } from "express";
import Cart, { ICart } from "../model/cart";
import mongoose from "mongoose";
import Product, { IProduct } from "../model/product";

// add item to cart
export const addItemToCart = async (req: Request, res: Response) => {
  //  add item to cart logic
  try {
    const { product: productID, quantity } = req.body;
    const userID = req.user.id;

    // check if productID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productID)) {
      return res.status(400).json({
        error: "Invalid product id",
      });
    }

    // check if product exists in database
    const productExists: IProduct | null = await Product.findById(productID);

    if (!productExists) {
      return res.status(404).json({
        error: "product not found",
      });
    }

    // insert item into cart or update quantity if item already exists in cart
    const cart = await Cart.findOneAndUpdate(
      { user: userID },
      {
        $addToSet: {
          items: {
            product: productID,
            quantity,
          },
        },
      },
      { upsert: true, new: true }
    );

    // calculate total amount and update cart
    const totalAmount = cart?.items.reduce(
      (acc, item) => acc + item.quantity * productExists.price,
      0
    );

    await Cart.findByIdAndUpdate(cart?._id, {
      totalAmount,
    });

    const updatedCart = await Cart.findById(cart?._id).populate(
      "items.product"
    );

    return res.status(200).json({
      cart: updatedCart,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "An error occurred",
      message: error.message,
    });
  }
};

// view cart for a user
export const viewCart = async (req: Request, res: Response) => {
  // view cart logic
  try {
    const userID = req.user.id;

    // find cart for user
    const cart: ICart | null = await Cart.findOne({ user: userID }).populate(
      "items.product"
    );

    return res.status(200).json({
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred",
    });
  }
};

// remove item from the cart by product

export const removeItemFromCart = async (req: Request, res: Response) => {
  // remove item from the cart
  try {
    const productID = req.body.product;

    // check if productID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productID)) {
      return res.status(400).json({
        error: "Invalid product id",
      });
    }

    // check if product exists in cart
    const productExists = await Cart.exists({
      user: req.user.id,
      "items.product": productID,
    });

    if (!productExists) {
      return res.status(404).json({
        error: "product not found",
      });
    }

    // remove item from cart
    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      {
        $pull: {
          items: {
            product: productID,
          },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred",
    });
  }
};

// update item quantity in cart
export const updateItemQuantity = async (req: Request, res: Response) => {
  // update item quantity logic
  try {
    const productID = req.body.product;
    const { quantity } = req.body.quantity;

    // check if productID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productID)) {
      return res.status(400).json({
        error: "Invalid product id",
      });
    }

    // check if product exists in cart
    const productExists = await Cart.exists({
      user: req.user.id,
      "items.product": productID,
    });

    if (!productExists) {
      return res.status(404).json({
        error: "product not found",
      });
    }

    // update item quantity in cart
    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id, "items.product": productID },
      {
        $set: {
          "items.$.quantity": quantity,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred",
    });
  }
};
