// product model

import mongoose, { Document, Schema } from "mongoose";

// interface for the product model
export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

// product schema
const productSchema: Schema<IProduct> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      min: 3,
      max: 50,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 2000,
    },

    price: {
      type: Number,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 50,
    },

    available: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// export product model
const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
