import { createRouter, createWebHistory } from 'vue-router'
import DisplayData from '@/views/DisplayData.vue'
import ViewSong from '@/views/SongInfo/ViewSong.vue'
import UpdateSong from '@/views/SongInfo/UpdateSong.vue'
import AddSong from '@/views/SongInfo/AddSong.vue'
import DeleteSong from '@/views/SongInfo/DeleteSong.vue'
import NotFoundComponent from '@/views/NotFoundComponent.vue'

import StatLayout from '@/views/stats/StatLayout.vue'
import Top10 from '@/views/Top10.vue'
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'

const routes = [
  
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/addSong',
    name: 'AddSong',
    component: AddSong
  },
  {
    path: '/displayData',
    name: 'DisplayData',
    component: DisplayData
  },
  {
    path: '/updateSong/:id',
    name: 'UpdateSong',
    component: UpdateSong
  },
  {
    path: '/viewSong',
    name: 'ViewSong',
    component: ViewSong
  },
  {
    path: '/viewSong/:id',
    name: 'ViewSong',
    component: ViewSong
  },
  {
    path: '/deleteSong/:id',
    name: 'DeleteSong',
    component: DeleteSong
  },
  {
    path: '/top10',
    name: 'Top10',
    component: Top10,
  },
  {
    path: '/stat',
    name: 'StatLayout',
    props: true,
    component: StatLayout
  },
  {
    path: '/:catchAll(.*)',
    component: NotFoundComponent
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router