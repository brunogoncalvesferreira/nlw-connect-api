import { redis } from '../redis/client'

interface GetSubscriberInvitesCountParams {
  subcriberId: string
}

export async function getSubscriberInvitesCount({
  subcriberId,
}: GetSubscriberInvitesCountParams) {
  const count = await redis.zscore('referral:ranking', subcriberId)

  return { count: count ? Number.parseInt(count) : 0 }
}
