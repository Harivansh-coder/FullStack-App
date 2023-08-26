// category controller

import { Request, Response } from "express";
import Category, { ICategory } from "../model/category";
import mongoose from "mongoose";

// create category
export const createCategory = async (req: Request, res: Response) => {
  // create category logic
  try {
    const { name } = req.body;

    // create category instance
    const category = new Category({
      name,
    });

    // save category to database
    await category.save();

    return res.status(201).json({
      message: "Category created successfully",
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: "Category already exists",
      });
    } else {
      return res.status(500).json({
        error: "An error occurred",
      });
    }
  }
};

// get all categories
export const getAllCategory = async (_req: Request, res: Response) => {
  // get all categories logic
  try {
    const categories: ICategory[] = await Category.find();

    return res.status(200).json({
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred",
    });
  }
};

// get a category
export const getCategory = async (req: Request, res: Response) => {
  // get a category by id logic
  try {
    const id = req.params.id;

    // check if id is a valid ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid category id",
      });
    }

    // find category by id
    const category: ICategory | null = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    return res.status(200).json({
      category,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "An error occurred",
      message: error.message,
    });
  }
};

// update a category
export const updateCategory = async (req: Request, res: Response) => {
  // update a category logic
  try {
    const { id } = req.params;

    // check if id is a valid ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid category id",
      });
    }

    const { name } = req.body;

    // find category by id or name
    const category: ICategory | null = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    return res.status(200).json({
      category,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred",
    });
  }
};

// delete a category
export const deleteCategory = async (req: Request, res: Response) => {
  // delete a category logic
  try {
    const { id } = req.params;

    // check if id is a valid ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid category id",
      });
    }

    // find category by id or name
    const category: ICategory | null = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    return res.status(204).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred",
    });
  }
};
