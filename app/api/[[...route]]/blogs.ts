import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { and, eq, inArray } from "drizzle-orm";
import { blogsTable, insertBlogsSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { string, z } from "zod";
import { title } from "process";
import { log } from "console";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const data = await db
      .select({
        id: blogsTable.id,
        title: blogsTable.title,
        content: blogsTable.content,
      })
      .from(blogsTable)
      .where(eq(blogsTable.userId, auth.userId));

    return c.json({ data });
  })
  .get(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.any().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      if (!auth?.userId) {
        c.json({ error: "Unauthorized" }, 401);
      }

      const userId = auth?.userId as string;

      const [data] = await db
        .select({
            id: blogsTable.id,
            title: blogsTable.title,
            content: blogsTable.content,
        })
        .from(blogsTable)
        .where(and(eq(blogsTable.userId, userId), eq(blogsTable.id, id)));

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertBlogsSchema.pick({
        title: true,
        content: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .insert(blogsTable)
        .values({
          userId: auth.userId,
          ...values,
        })
        .returning();
          console.log("dattaaaa",data);
      return c.json({ data });
    }
  )
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.number()),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .delete(blogsTable)
        .where(
          and(
            eq(blogsTable.userId, auth.userId),
            inArray(blogsTable.id, values.ids)
          )
        )
        .returning({
          id: blogsTable.id,
        });

      return c.json({ data });
    }
  )
  .patch(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.any().optional(),
      })
    ),
    zValidator(
      "json",
      insertBlogsSchema.pick({
        title: true,
        content: true
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .update(blogsTable)
        .set(values)
        .where(and(eq(blogsTable.userId, auth.userId), eq(blogsTable.id, id)))
        .returning();

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )
  .delete(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.any().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .delete(blogsTable)
        .where(and(eq(blogsTable.userId, auth.userId), eq(blogsTable.id, id)))
        .returning({
          id: blogsTable.id
        } );

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  );

export default app;