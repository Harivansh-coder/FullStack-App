// validation functions

import * as yup from "yup";

// validate the request body of the register route
export const validateRegister = yup.object({
  body: yup.object({
    name: yup
      .string()
      .required("name is required")
      .min(3, "name is too short")
      .max(50, "name is too long"),

    email: yup
      .string()
      .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "invalid email")
      .required("email is required"),
    password: yup
      .string()
      .required("password is required")
      .min(8, "password is too short")
      .max(50, "password is too long"),
    type: yup.string().oneOf(["buyer", "seller"]).default("buyer"),
  }),
});

// validate the request body of the login route
export const validateLogin = yup.object({
  body: yup.object({
    email: yup
      .string()
      .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "invalid email")
      .required("email is required"),
    password: yup.string().required("password is required"),
  }),
});

// validate the request body of the create category route
export const validateCategory = yup.object({
  body: yup.object({
    name: yup
      .string()
      .required("category name is required")
      .min(3, "name is too short")
      .max(50, "name is too long"),
  }),
});

// validate the request body of the create product route

export const validateProduct = yup.object({
  body: yup.object({
    title: yup
      .string()
      .required("title is required")
      .min(3, "title is too short")
      .max(50, "title is too long"),
    description: yup
      .string()
      .required("description is required")
      .min(3, "description is too short")
      .max(2000, "description is too long"),
    price: yup
      .number()
      .required("price is required")
      .min(0, "price must be a non negative number"),
    category: yup.string().required("category ID is required"),

    available: yup.boolean().default(true),
  }),
});

// validate the request body of the update product route
export const validateUpdateProduct = yup.object({
  body: yup.object({
    title: yup
      .string()
      .min(3, "title is too short")
      .max(50, "title is too long"),
    description: yup
      .string()
      .min(3, "description is too short")
      .max(2000, "description is too long"),
    price: yup.number().min(0, "price must be a non negative number"),
    category: yup.string(),
    available: yup.boolean(),
  }),
});

// validate the request body of the create cart route
export const validateCart = yup.object({
  body: yup.object({
    product: yup.string().required("product ID is required"),
    quantity: yup
      .number()
      .required("quantity is required")
      .min(1, "quantity must be a positive number"),
  }),
});
