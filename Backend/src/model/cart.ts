// contains all the cart related model functions

import mongoose, { Schema, Document } from "mongoose";

// cart item interface
export interface ICartItem extends Document {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

// cart interface
export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
  totalAmount: number;
}

// cart item schema
const cartItemSchema: Schema = new Schema<ICartItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

// cart schema
const cartSchema: Schema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// create cart model
const Cart = mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
