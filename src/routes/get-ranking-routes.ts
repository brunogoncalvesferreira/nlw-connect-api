import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getRanking } from '../functions/get-ranking'

export const getRankingRoutes: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ranking',
    {
      schema: {
        tags: ['referral'],
        description: 'Get ranking',

        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string(),
                score: z.number(),
                name: z.string(),
              })
            ),
          }),
        },
      },
    },
    async request => {
      const { rankingWithScore } = await getRanking()

      return { ranking: rankingWithScore }
    }
  )
}
