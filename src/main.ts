import './assets/main.css'

import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'

import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './graphql/apolloClient'
import App from './App.vue'
import router from './router'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.use(createPinia())
app.use(router)

app.mount('#app')
