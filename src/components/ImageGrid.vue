<template>


  <v-container>

    <v-row>
      <v-col cols="8">
        <v-card style="float: left; position: fixed; background-color: black; margin: 0 auto; padding: 0; z-index: 9" height="800px" width="80%"
          @click="previewOff()" v-show="preview"
        >
          <v-img :src="previewingImg" contain height="800px" width="100%" style="object-fit: fill"></v-img>
        </v-card>
      </v-col>
    </v-row>

    <!-- 图片网格的顶栏，用于测试数据交互
    <v-row>
      <v-col cols="12">{{selectQuery}}</v-col>
    </v-row> -->

    <!-- 展示网格 -->
    <v-row v-for="(n, rowid) in rows" :key="rowid.id" style="background-color: transparent">
      <v-col :cols="12 / itemsPerRow" v-for="(n, colid) in itemsPerRow" :key="colid.id" style="background-color: transparent">

        <v-card height="150px"
                width="100%"
                elevation="elevation"
                class="mt-0"
                v-show="rowid * itemsPerRow + colid >= imgLst.length? false: true"
                style="background-color: transparent;"

        >
          <v-img height="150px"
                 width="100%"
                 contain :src="imgLst[0]"
                 @click="previewOn(imgLst[0])"
                 style=" cursor: pointer;"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-pagination
            v-model="onPage"
            :length="pages"
            circle
        ></v-pagination>
      </v-col>
    </v-row>


  </v-container>

</template>

<script>
import eventbus from "@/eventbus";
import axios from "axios";
export default {
  name: "ImageGrid",
  data: () => ({
    imgLst: ["https://t7.baidu.com/it/u=727460147,2222092211&fm=193&f=GIF",  "logo.jpg", "logo.jpg", "logo.jpg", "logo.jpg", "logo.jpg", "logo.jpg"],
    itemsPerRow: 4,
    rows: 4,
    onPage: 1,
    pages: 8,
    selectQuery: "",
    preview: false,
    previewingImg: "",
  }),
  methods: {
    previewOn: function (src) {
      this.preview = true
      this.previewingImg = src;
    },

    previewOff: function () {
      this.preview = false
      this.previewingImg = '';
    },

  },

  created() {
    eventbus.$on('selectQueryChange', target => {
      this.selectQuery = target;
    })

    eventbus.$on('findIt', target => {
      this.pages = target.pages;
      this.onPage = target.onPage;
      this.imgLst = target.imgLst;
    })
  },

  mounted() {

  },

  watch: {
    onPage: function () {
      axios.post('/pageChange', {onPage: this.onPage, selectQuery: this.selectQuery}).then(response => {
        let data = response.data;
        let pages = data.pages;
        let onPage = data.onPage;
        let imgLst = data.imgLst;
        this.pages = pages;
        this.onPage = onPage;
        this.imgLst = imgLst;
      })
    }
  }
}
</script>

<style scoped>
.imgitem {
  margin: 0 auto;
  padding: 0;
}

</style>