import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(), // create id unique and random
  name: text('name').notNull(), // create name not null
  email: text('email').notNull().unique(), // create email not null and unique
  createdAt: timestamp('created_at').notNull().defaultNow(), // create created_at not null and default now
})
