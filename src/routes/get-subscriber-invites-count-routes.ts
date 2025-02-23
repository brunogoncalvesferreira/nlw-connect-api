import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInvitesCount } from '../functions/get-subscriber-invites-count'

export const getSubscriberInvitesCountRoutes: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subcriberId/ranking/count',
      {
        schema: {
          tags: ['referral'],
          description: 'Get subscriber invite clicks count',
          params: z.object({
            subcriberId: z.string(),
          }),

          response: {
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async request => {
        const { subcriberId } = request.params

        const { count } = await getSubscriberInvitesCount({
          subcriberId,
        })

        return { count }
      }
    )
  }
