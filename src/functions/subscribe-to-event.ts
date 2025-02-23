import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

interface SubscribeToEventParams {
  name: string
  email: string
  referrerId?: string | null
}

export async function subscribeToEvent({
  name,
  email,
  referrerId,
}: SubscribeToEventParams) {
  const subcribers = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, email))

  /**
   * If the subcriber already exists, return the id
   */
  if (subcribers.length > 0) {
    return {
      subcriberId: subcribers[0].id,
    }
  }

  const result = await db
    .insert(subscriptions)
    .values({ name, email })
    .returning()

  if (referrerId) {
    await redis.zincrby('referral:ranking', 1, referrerId)
  }

  const subcriber = result[0]

  return {
    subcriberId: subcriber.id,
  }
}
