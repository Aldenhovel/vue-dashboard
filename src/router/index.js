import Vue from 'vue'
import VueRouter from 'vue-router'


//import ChartView1 from "@/components/ChartView1.vue";
import ChartView2 from "@/components/ChartView2.vue";
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
