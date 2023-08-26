// product controller

import { Request, Response } from "express";
import Product, { IProduct } from "../model/product";
import Category from "../model/category";
import mongoose from "mongoose";

// create product
export const createProduct = async (req: Request, res: Response) => {
  // create product logic
  try {
    const { title, description, price, category, available } = req.body;

    // check if category is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({
        error: "Invalid category id",
      });
    }

    // check if category exists in database
    const categoryExists = await Category.exists({ _id: category });

    if (!categoryExists) {
      return res.status(400).json({
        error: "category does not exist",
      });
    }

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

    return res.status(201).json({
      message: "product created successfully",
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: "product already exists",
      });
    } else {
      return res.status(500).json({
        error: "An error occurred",
        message: error.message,
      });
    }
  }
};

// get all products
export const getAllProducts = async (_req: Request, res: Response) => {
  // get all products logic
  try {
    const products: IProduct[] = await Product.find().populate("category");

    return res.status(200).json({
      products,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "An error occurred",
      message: error.message,
    });
  }
};

// get a product
export const getProduct = async (req: Request, res: Response) => {
  // get a product by id logic
  try {
    const { id } = req.params;

    // check if id is a valid ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid category id",
      });
    }

    const product: IProduct | null =
      await Product.findById(id).populate("category");

    if (!product) {
      return res.status(404).json({
        error: "product not found",
      });
    }

    return res.status(200).json({
      product,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred",
    });
  }
};

// update a product
export const updateProduct = async (req: Request, res: Response) => {
  // update a product logic
  try {
    // get product id from request params
    const { id } = req.params;

    // check if id is a valid ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid product id",
      });
    }

    // check if product exists in database
    const productExists = await Product.exists({ _id: id });

    if (!productExists) {
      return res.status(404).json({
        error: "product not found",
      });
    }

    // now that we know product exists, we can update it
    const { title, description, price, category, available } = req.body;

    // check if category is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({
        error: "Invalid category id",
      });
    }

    // check if category exists in database
    const categoryExists = await Category.exists({ _id: category });

    if (!categoryExists) {
      return res.status(400).json({
        error: "category does not exist",
      });
    }

    // update product
    const product: IProduct | null = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        category,
        available,
      },
      { new: true }
    );

    return res.status(200).json({
      product,
    });
  } catch (error) {
    return res.status(500).json({
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
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
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

    return res.status(204).json({
      message: "product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred",
    });
  }
};
