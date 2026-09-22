import { z } from "zod";

export const createBlog = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  author: z.string(),
  content: z.string(),
  thumbnail: z.instanceof(File),
});

export type CreateBlog = z.infer<typeof createBlog>;
