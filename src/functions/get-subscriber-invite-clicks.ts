import { redis } from '../redis/client'

interface GetSubscriberInviteClicksParams {
  subcriberId: string
}

export async function getSubscriberInviteClicks({
  subcriberId,
}: GetSubscriberInviteClicksParams) {
  const count = await redis.hget('referral:access-count', subcriberId)

  return { count: count ? Number.parseInt(count) : 0 }
}
