import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由懒加载方式
const Tabbar = () => import('@/components/app-tabbar.vue')
const Home = () => import('@/views/HomePage')
const Question = () => import('@/views/QuestionPage')
const Video = () => import('@/views/VideoPage')
const User = () => import('@/views/user/UserPage')
const Article = () => import('@/views/article/ArticlePage')
const Login = () => import('@/views/login')
const UserProfile = () => import('@/views/user/profile')
const UserChat = () => import('@/views/user/chat')
const routes = [
  // 路由规则
  { path: '/', components: { default: Home, tabbar: Tabbar } },
  { path: '/question', components: { default: Question, tabbar: Tabbar } },
  { path: '/video', components: { default: Video, tabbar: Tabbar } },
  { path: '/user', components: { default: User, tabbar: Tabbar } },
  { path: '/article', component: Article },
  { path: '/login', component: Login },
  { path: '/user/profile', component: UserProfile },
  { path: '/user/chat', component: UserChat }

]

const router = new VueRouter({
  routes
})
// 导航守卫

export default router
