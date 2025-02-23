import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { env } from './env'

import { accessInviteLinkRoutes } from './routes/access-invite-link-routes'
import { getRankingRoutes } from './routes/get-ranking-routes'
import { getSubscriberInviteLinksRoutes } from './routes/get-subscriber-invite-links-routes'
import { getSubscriberInvitesCountRoutes } from './routes/get-subscriber-invites-count-routes'
import { getSubscriberRankingPositionRoutes } from './routes/get-subscriber-ranking-position-routes'
import { subscribeToEventRoutes } from './routes/subscribe-to-event-routes'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: true,
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(subscribeToEventRoutes)
app.register(accessInviteLinkRoutes)
app.register(getSubscriberInviteLinksRoutes)
app.register(getSubscriberInvitesCountRoutes)
app.register(getSubscriberRankingPositionRoutes)
app.register(getRankingRoutes)

app
  .listen({
    port: env.PORT,
  })
  .then(() => console.log('HTTP server running!'))
