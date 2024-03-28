import * as z from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "name should be alteast 2 characters long"),
  email: z.string().email("Email is not valid"),
  password: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email("Email is not valid"),
  password: z.string(),
});

export const vechileSchema=z.object({
  model:z.string(),
  total_miles_driven:z.string(),
  date_of_purchase:z.date(),
  type:z.string(),
  license_plate:z.string(),
  cost:z.string(),
  energy_consumption_per_hour:z.string(),
  owner:z.string()
})