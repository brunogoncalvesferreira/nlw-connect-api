import { redis } from '../redis/client'

interface AccessInviteLinkParams {
  subcriberId: string
}

export async function accessInviteLink({
  subcriberId,
}: AccessInviteLinkParams) {
  await redis.hincrby('referral:access-count', subcriberId, 1)
}
