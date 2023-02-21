<template>
  <v-app>

        <top-nav-bar></top-nav-bar>

        <router-view></router-view>

  </v-app>
</template>

<script>
import TopNavBar from "@/components/TopNavBar.vue";
export default {
  name: 'App',
  components: {TopNavBar},

  data: () => ({
    //
  }),
};
</script>
