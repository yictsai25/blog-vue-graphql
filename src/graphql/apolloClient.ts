import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import type { NormalizedCacheObject } from '@apollo/client/core'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://graphqlzero.almansi.me/api',
})

// Cache implementation
const cache: InMemoryCache = new InMemoryCache()

// Create the apollo client
export const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: httpLink,
  cache,
})
