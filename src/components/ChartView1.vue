<template>
  <div class="chart-box">
    <div id="chart" class="chart"></div>
    <div class="btns">
      <div class="btn" v-for="item in items" :key="item.id" @click="fn(item)">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
import {option} from "../assets/res"
import * as echarts from "echarts"
export default {
  name: "ChartView2",
  data: () => ({
    option: option,
  }),

  mounted() {
    var chartDom = document.getElementById('chart');
    var myChart = echarts.init(chartDom)
    this.option && myChart.setOption(this.option);
  },

}
</script>

<style scoped>
.chart-box {
  position: relative;
  height: 850px;
  width: 1500px;
  margin: 0 auto;
  background-color: red;
}
.chart {
  position: relative;
  height: 850px;
  width: 80%;
  float: left;
  background-color: white;
}

.btns {
  position: relative;
  height: 850px;
  width: 20%;
  float: left;
  background-color: antiquewhite;
  overflow-y: scroll;
}
.btn {
  position: relative;
  height: 30px;
  width: 100%;
  background-color: blue;
  border-radius: 15px;
  font-size: 20px;
  text-align: center;
  margin: 5px 0;
  cursor: pointer;
}
</style>