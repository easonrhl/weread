import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const BookCase = () => import('views/bookcase/BookCase')
const User = () => import('views/user/User')
const CategoryRank = () => import('views/category/CategoryRank')
const SearchInfo = () => import('views/search/SearchInfo')
const BookInfo = () => import('views/book/BookInfo')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/bookcase',
    component: BookCase
  },
  {
    path: '/user',
    component: User
  },
  {
    name: 'category',
    path: '/category/:id',
    component: CategoryRank
  },
  {
    path: '/search',
    component: SearchInfo
  },
  {
    name: 'bookinfo',
    path: '/book/:id',
    component: BookInfo
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
