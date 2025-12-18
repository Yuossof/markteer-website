import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const serviceModuleSchema = z.object({
  title: z.string().min(1, "Module title is required"),
  description: z.string().min(1, "Module description is required"),
});

export const serviceCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  shortDescription: z.string().min(1, "Short Description is required"),
  modules: z.array(serviceModuleSchema).optional(),
});

export const serviceUpdateSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  modules: z.array(serviceModuleSchema).optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update",
});

export const projectCreateSchema = z.object({
  name: z.string().optional(),
  client: z.string().optional(),
  clientImage: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  isFeature: z.boolean().optional(),
  services: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
});

export const projectUpdateSchema = z.object({
  name: z.string().optional(),
  client: z.string().optional(),
  clientImage: z.string().optional(),
  description: z.string().optional(),
  isFeature: z.boolean().optional(),
  services: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update",
});

export const contactSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  title: z.string().min(1, "Title is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  market: z.string().min(1, "Market name is required"),
  email: z.string().min(4, "Email must be at least 4 characters"),
  company: z.string().min(1, "Company is required"),
  phoneNumber: z.string().min(3, "Phone number is too short"),
  message: z.string().min(1, "Message name is required"),
})