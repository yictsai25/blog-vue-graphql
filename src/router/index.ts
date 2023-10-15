import { createRouter, createWebHistory } from 'vue-router'
import BlogListView from '@/views/BlogListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'blog-list',
      component: BlogListView,
    },
    {
      path: '/:id(\\d+)',
      name: 'blog-detail',
      component: () => import('@/views/BlogDetailView.vue'),
    },
    {
      path: '/search',
      name: 'search-results',
      component: () => import('@/views/BlogSearchView.vue'),
      props: route => ({ keyword: route.query.keyword }),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
