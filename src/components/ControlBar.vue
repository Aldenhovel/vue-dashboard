<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-form>

          <!-- 标题区域 -->
          <v-card width="100%" elevation="5" :loading="loading">
            <v-card-title><i class="iconfont ma-1" style="font-size: 30px;">&#xe8f3;</i>Control Bar</v-card-title>
            <v-card-text>Find image with caption here.<br/>e.g. "a cat and a dog."</v-card-text>
          </v-card>
          <div class="ma-5"></div>


          <!-- 条件搜索输入框 -->
          <v-card elevation="0" width="100%" class="ma-auto pa-1" style="background-color: transparent">
            <v-text-field
                v-model="selectQuery"
                label="What image do you want?"
                @keyup.enter="findIt()"
            ></v-text-field>
          </v-card>


          <div class="ma-5"></div>

          <!-- 是否采用阈值限制 -->
          <v-card elevation="0" width="100%" class="ma-auto pa-1" style="background-color: lightgray">
            <v-checkbox
                v-model="needThreshold"
                label="Hard mode"
            ></v-checkbox>

            <v-slider
                :hint="'threshold: ' + threshold"
                max="100"
                min="0"
                v-model="threshold"
                v-show="needThreshold"
                :persistent-hint="needThreshold"
            ></v-slider>
          </v-card>


          <v-card elevation="0" width="100%" class="ma-auto mt-2 mb-2" style="background-color: transparent">
            <!-- 提交按钮，将触发组件数据同步和 axios -->
            <v-btn color="success" class="ma-1" @click="findIt()" width="30%"><i class="iconfont icon-pading">&#xea1d;</i>Find it!</v-btn>

            <!-- 清除所有选择 -->
            <v-btn color="warning" class="ma-1" @click="clearQuery()" width="30%"><i class="iconfont icon-pading">&#xe9e1;</i>Clear</v-btn>
          </v-card>



        </v-form>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import eventbus from "@/eventbus";
import axios from 'axios'

export default {
  name: "ControlBar",
  data: () => ({
    selectQuery: "",
    needThreshold: false,
    threshold: 0,
    loading: true,
  }),
  methods:{
    loadingOn() {
      this.loading = true;
    },
    loadingOff() {
      this.loading = false;
    },
    clearQuery() {
      eventbus.$emit('selectQueryChange', this.selectQuery)
      this.needThreshold = false;
      this.threshold = 0;
      this.selectQuery = '';
      this.findIt();
    },
    findIt() {
      eventbus.$emit('loadingOn');
      eventbus.$emit('selectQueryChange', this.selectQuery);
      eventbus.$emit('needThresholdChange', this.needThreshold);
      eventbus.$emit('thresholdChange', this.threshold);
      axios.post('/findIt', {
        selectQuery: this.selectQuery,
        needThreshold: this.needThreshold,
        threshold: this.threshold,
      }).then(response => {
        let data = response.data;
        let pages = data.pages;
        let onPage = 1;
        let imgLst = data.imgLst;
        eventbus.$emit('findIt', {pages: pages, onPage: onPage, imgLst: imgLst});
        eventbus.$emit('loadingOff');
      })

    }
  },
  mounted() {
  },
  created() {
    this.findIt();
    eventbus.$on('loadingOn', () => {
      this.loadingOn();
    })
    eventbus.$on('loadingOff', () => {
      this.loadingOff();
    })
  },
  watch: {

  }
}
</script>

<style scoped>
.icon-pading {
  margin-right: 0.5em;
}

</style>