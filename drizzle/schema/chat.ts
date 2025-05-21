import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { userTable } from './user';
import type { InferSelectModel } from 'drizzle-orm';

export const conversationTable = pgTable('conversation', {
  id: serial().primaryKey(),
  title: text().notNull(),
  createdAt: timestamp({ mode: 'date', withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp({ mode: 'date', withTimezone: true }),
  userId: integer()
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
});

export const chatTable = pgTable('chat', {
  id: serial().primaryKey(),
  role: text({ enum: ['user', 'ai'] }).notNull(),
  content: text().notNull(),
  createdAt: timestamp({ mode: 'date', withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp({ mode: 'date', withTimezone: true }),
  userId: integer()
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  conversationId: integer()
    .notNull()
    .references(() => conversationTable.id, { onDelete: 'cascade' }),
});

export type Conversation = InferSelectModel<typeof conversationTable>;
export type Chat = InferSelectModel<typeof chatTable>;
