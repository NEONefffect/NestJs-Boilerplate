import { relations } from "drizzle-orm";
import {
  serial,
  text,
  pgTable,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  email: varchar("email"),
  isActive: varchar("is_active"),
  password: varchar("password"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));
export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; //

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  authorId: integer("author_id").notNull(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
}));

export const databaseSchema = {
  users,
  posts,
};
