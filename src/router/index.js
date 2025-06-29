import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventDetail from '@/views/EventDetail.vue'
import ForumView from '@/views/ForumView.vue'
import EventCart from '@/views/EventCart.vue'
import Cart from "../views/Cart.vue"
import CreateEventView from '@/views/CreateEventView.vue'
import MyEvent from '@/views/MyEvent.vue';
import LoginPage from '@/views/LoginView.vue'
import RegisterPage from '@/views/RegisterView.vue'
import MyOrdersPage from '@/views/orderView.vue'
import UpdateEventView from '@/views/UpdateEventView.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/update-event/:id',
    name: 'UpdateEvent',
    component: UpdateEventView,
  },
  {
    path: '/event/:id',
    name: 'EventDetail',
    component: EventDetail,
  },

  {
    path: '/forum',
    name: 'forum',
    component: ForumView
  },
  {
    path: '/create-event',
    name: 'CreateEvent',
    component: CreateEventView
  },
  {
    path: '/myevent',
    name: 'MyEvent',
    component: MyEvent
  },
  {
    path: '/myorder',
    name: 'MyOrder',
    component: MyOrdersPage
  },
  {path: "/event-cart", name: "EventCart", component: EventCart},
  { path: '/MerchCart', component: Cart },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
