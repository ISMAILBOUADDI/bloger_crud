CREATE TABLE IF NOT EXISTS "blogs" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"user_id" text NOT NULL
);
