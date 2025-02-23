import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'
import { redis } from '../redis/client'

export const accessInviteLinkRoutes: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subcriberId',
    {
      schema: {
        tags: ['referral'],
        description: 'Access invite link and redirects users',
        params: z.object({
          subcriberId: z.string(),
        }),

        response: {
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { subcriberId } = request.params

      await accessInviteLink({ subcriberId })

      console.log(await redis.hgetall('referral:access-count')) // DEBUG to see the link being accessed and increment the access number using Redis' hgetall

      const redirectUrl = new URL(env.WEB_URL)

      redirectUrl.searchParams.set('referrer', subcriberId)

      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}
