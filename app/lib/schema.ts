import { data } from "react-router";
import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password is required"),
});

export const signUpSchema = z
  .object({
    name: z.string().min(4, "Name mjust be atleast 4 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "New Password must be atleast 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be atleast 8 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const workspaceSchema = z.object({
  name: z.string().min(3, "Name of workspace must be atleast 3 characters long"),
  color: z.string().min(3, "Color must be atleast 3 characters"),
  description: z.string().optional(),
  
})