// product controller

import { Request, Response } from "express";
import Product, { IProduct } from "../model/product";
import mongoose from "mongoose";
// create product
export const createProduct = async (req: Request, res: Response) => {
  // create product logic
  try {
    const { title, description, price, category, available } = req.body;

    // create product instance
    const product = new Product({
      title,
      description,
      price,
      category,
      available,
    });

    // save product to database
    await product.save();

    res.status(201).json({
      message: "product created successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        error: "product already exists",
      });
    } else {
      res.status(500).json({
        error: "An error occurred",
      });
    }
  }
};

// get all products
export const getAllProducts = async (req: Request, res: Response) => {
  // get all products logic
  try {
    const products: IProduct[] = await Product.find();

    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred",
    });
  }
};

// get a product
export const getProduct = async (req: Request, res: Response) => {
  // get a product by id logic
  try {
    const { id } = req.params;

    // check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid category id",
      });
    }

    const product: IProduct | null = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        error: "product not found",
      });
    }

    res.status(200).json({
      product,
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred",
    });
  }
};

// update a product
export const updateUpdate = async (req: Request, res: Response) => {
  // update a product logic
  try {
    const { id } = req.params;

    // check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid category id",
      });
    }

    const { name } = req.body;

    // find product by id or name
    const product: IProduct | null = await Product.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        error: "product not found",
      });
    }

    res.status(200).json({
      product,
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred",
    });
  }
};

// delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  // delete a product logic
  try {
    const { id } = req.params;

    // check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid category id",
      });
    }

    // find product by id or name
    const product: IProduct | null = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        error: "product not found",
      });
    }

    res.status(204).json({
      message: "product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred",
    });
  }
};
