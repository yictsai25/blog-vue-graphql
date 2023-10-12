module.exports = {
  client: {
    service: {
      name: 'GraphQLZero',
      // URL to the GraphQL API
      url: 'https://graphqlzero.almansi.me/api',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
      'src/**/*.ts',
    ],
  },
}
