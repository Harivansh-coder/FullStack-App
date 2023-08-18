// validation functions

import * as yup from "yup";

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
    type: yup.string().oneOf(["customer", "seller"]).default("customer"),
  }),
});

export const validateLogin = yup.object({
  body: yup.object({
    email: yup
      .string()
      .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "invalid email")
      .required("email is required"),
    password: yup.string().required("password is required"),
  }),
});
