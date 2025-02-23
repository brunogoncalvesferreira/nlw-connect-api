import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInvitesCount } from '../functions/get-subscriber-invites-count'
import { getSubscriberRankingPosition } from '../functions/get-subscriber-ranking-positions'

export const getSubscriberRankingPositionRoutes: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subcriberId/ranking/position',
      {
        schema: {
          tags: ['referral'],
          description: 'Get subscriber ranking position',
          params: z.object({
            subcriberId: z.string(),
          }),

          response: {
            200: z.object({
              position: z.number().nullable(),
            }),
          },
        },
      },
      async request => {
        const { subcriberId } = request.params

        const { position } = await getSubscriberRankingPosition({
          subcriberId,
        })

        return { position }
      }
    )
  }
