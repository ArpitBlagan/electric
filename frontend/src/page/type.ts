import * as z from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "*Name should be alteast 2 characters long"),
  email: z.string().email("*Email is not valid"),
  password: z.string().min(6, "*Password should be 6 character longs"),
});
export type Register = z.infer<typeof userSchema>;
export const loginSchema = z.object({
  email: z.string().email("Email is not valid"),
  password: z.string(),
});
export type Loginn = z.infer<typeof loginSchema>;

export const vechileSchema = z.object({
  model: z.string(),
  total_miles_driven: z.string(),
  date_of_purchase: z.string(),
  license_plate: z.string(),
  cost: z.string(),
  energy_consumption_per_hour: z.string(),
});
export type Vechile = z.infer<typeof vechileSchema>;
