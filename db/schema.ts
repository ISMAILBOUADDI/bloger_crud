import { pgTable,text,serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod"
import { createId } from "@paralleldrive/cuid2";
export const blogsTable = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: text("user_id").notNull(),
});

export const insertBlogsSchema = createInsertSchema(blogsTable)