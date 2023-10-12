import antfu from '@antfu/eslint-config'
import cypress from 'eslint-plugin-cypress'

const antfuConfig = antfu({
  typescript: true,
  vue: true,
})
export default [
  ...antfuConfig,
  {
    files: [
      'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
    ],
    plugins: {
      cypress,
    },
  },
]
