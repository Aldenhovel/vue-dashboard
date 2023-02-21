<template>

  <v-container>
    <v-row>
      <v-col cols="8" class="tight-card">
          <v-card height="800px"
                  width="100%"
                  elevation="5"
                  style="background-color: wheat; overflow: auto">
            <image-grid></image-grid>
          </v-card>
      </v-col>

      <v-col cols="4" class="tight-card">
        <v-card height="600px" width="100%" elevation="5" style="background-color: transparent">
          <control-bar></control-bar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ImageGrid from "@/components/ImageGrid.vue";
import ControlBar from "@/components/ControlBar.vue";
export default {
  name: "ChartView2",
  components: {ImageGrid, ControlBar}
}
</script>

<style scoped>
.tight-card {
  margin: 0px;
  padding: 10px;
}
</style>