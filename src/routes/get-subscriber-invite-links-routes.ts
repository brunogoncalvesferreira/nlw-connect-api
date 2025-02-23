import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInviteClicks } from '../functions/get-subscriber-invite-clicks'

export const getSubscriberInviteLinksRoutes: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subcriberId/ranking/clicks',
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

        const { count } = await getSubscriberInviteClicks({
          subcriberId,
        })

        return { count }
      }
    )
  }
