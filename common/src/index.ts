import { z } from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string().optional(),
});

export type SignupType = z.infer<typeof signupInput>

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type SigninType = z.infer<typeof signinInput>

export const createPost = z.object({
  title: z.string(),
  content: z.string()
});

export type CreatePost = z.infer<typeof createPost>

export const updatePost = z.object({
  title: z.string().optional(),
  content: z.string().optional()
})

export type upDatePost = z.infer<typeof updatePost>


