import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由懒加载方式
const Tabbar = () => import('@/components/app-tabbar.vue')
const Home = () => import('@/views/HomePage')
const Question = () => import('@/views/QuestionPage')
const Video = () => import('@/views/VideoPage')
const User = () => import('@/views/UserPage')
const Article = () => import('@/views/ArticlePage')

const routes = [
  // 路由规则
  { path: '/', components: { default: Home, tabbar: Tabbar } },
  { path: '/question', components: { default: Question, tabbar: Tabbar } },
  { path: '/video', components: { default: Video, tabbar: Tabbar } },
  { path: '/user', components: { default: User, tabbar: Tabbar } },
  { path: '/article', component: Article }
]

const router = new VueRouter({
  routes
})

export default router
