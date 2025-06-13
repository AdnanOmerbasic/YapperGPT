import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { userTable } from './user';
import type { InferSelectModel } from 'drizzle-orm';

export const conversationTable = pgTable('conversation', {
  id: text().primaryKey(),
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
  id: text().primaryKey(),
  role: text({ enum: ['user', 'ai'] }).notNull(),
  content: text().notNull(),
  createdAt: timestamp({ mode: 'date', withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp({ mode: 'date', withTimezone: true }),
  userId: integer()
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  conversationId: text()
    .notNull()
    .references(() => conversationTable.id, { onDelete: 'cascade' }),
});

export type Conversation = InferSelectModel<typeof conversationTable>;
export type Chat = InferSelectModel<typeof chatTable>;
