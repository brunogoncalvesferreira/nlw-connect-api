import { redis } from '../redis/client'

interface GetSubscriberRankingPositionParams {
  subcriberId: string
}

export async function getSubscriberRankingPosition({
  subcriberId,
}: GetSubscriberRankingPositionParams) {
  const rank = await redis.zrevrank('referral:ranking', subcriberId)

  if (rank === null) {
    return { position: null }
  }

  return { position: rank + 1 }
}
