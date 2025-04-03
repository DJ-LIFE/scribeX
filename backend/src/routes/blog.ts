import { Hono } from "hono";
import { decode, verify } from "hono/jwt";
import { getPrisma } from "../prismaFunction";
import { createPost, updatePost } from "@jarvis22719/common-app";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  if (!authHeader) {
    c.status(403);
    return c.json({ message: "Not Authorized" });
  }
  const user = await verify(
    authHeader.replace("Bearer ", ""),
    c.env.JWT_SECRET
  );
  if (!user) {
    c.status(403);
    return c.json({ message: "Not Authorized" });
  }

  // Store user in context
  c.set("userId", user.id as string);

  return await next();
});
blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createPost.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid Input" });
  }
  const authorId = c.get("userId");
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId, // Replace with actual user ID from your authentication system
      },
    });
    c.status(200);
    return c.json({ message: "post Created SuccessFully", post });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ message: "Internal Server Error" });
  }
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updatePost.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid Input" });
  }
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);

    const updatedPost = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    c.status(200);
    return c.json({ message: "post Updated SuccessFully", updatedPost });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ message: "Internal Server Error" });
  }
});

blogRouter.get("/bulk", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const authorId = c.get("userId");
    const blogs = await prisma.post.findMany({
      where: {
        authorId: authorId,
      },
    });
    return c.json({
      blogs,
    });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ message: "Internal Server Error" });
  }
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const selectedPost = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return c.json({
      selectedPost,
    });
  } catch (error) {
    c.status(500);
    return c.json({ message: "Internal Server Error" });
  }
});
