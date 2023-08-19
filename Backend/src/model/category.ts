// category model

import mongoose, { Document, Schema } from "mongoose";

// interface for the category model
export interface ICategory extends Document {
  name: string;
}

// category schema
const categorySchema: Schema<ICategory> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      min: 3,
      max: 50,
    },
  },
  {
    timestamps: true,
  }
);

// export category model
const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
