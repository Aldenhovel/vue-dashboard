import Vue from 'vue'
import VueRouter from 'vue-router'


import ChartView2 from "@/components/ChartView1.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ChartView2
  },

]

const router = new VueRouter({
  routes
})

export default router
