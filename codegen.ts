import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/graphql/schema.graphql',
  documents: ['src/**/*.vue', 'src/graphql/queries/*.ts'],
  emitLegacyCommonJSImports: false,
  generates: {
    'src/graphql/generated/': {
      preset: 'client',
      config: {
        useTypeImports: true,
      },
    },
  },
}

export default config
