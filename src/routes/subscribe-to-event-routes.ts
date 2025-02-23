import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

export const subscribeToEventRoutes: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        tags: ['subscribers'],
        description: 'Subscribe to an event',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          referrer: z.string().nullish(),
        }),

        response: {
          201: z.object({
            subcriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, referrer } = request.body

      const { subcriberId } = await subscribeToEvent({
        name,
        email,
        referrerId: referrer,
      })

      return reply.status(201).send({ subcriberId })
    }
  )
}
