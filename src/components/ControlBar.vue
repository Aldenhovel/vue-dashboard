<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-form>

          <!-- 条件搜索输入框 -->
          <v-text-field
              v-model="selectQuery"
              label="what image do you want? tell me."
          ></v-text-field>

          <!-- 勾选框，备用 -->
          <v-checkbox
              class="tight-checkbox"
              v-model="allowPeople"
              label="allow people"
          ></v-checkbox>

          <!-- 勾选框，备用 -->
          <v-checkbox
              class="tight-checkbox"
              v-model="allowPeople"
              label="allow people"
          ></v-checkbox>

          <!-- 提交按钮，将触发组件数据同步和 axios -->
          <v-btn color="success" class="ma-1" @click="findIt()">
            Find it!
          </v-btn>

          <!-- 清除所有选择 -->
          <v-btn color="warning" class="ma-1" @click="clearQuery()">
            Clear
          </v-btn>

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
    allowPeople: false
  }),
  methods:{
    clearQuery() {
      eventbus.$emit('selectQueryChange', this.selectQuery)
      this.allowPeople = false;
      this.selectQuery = '';
      this.findIt();
    },
    findIt() {
      eventbus.$emit('selectQueryChange', this.selectQuery)
      axios.post('/findIt', {selectQuery: this.selectQuery}).then(response => {
        let data = response.data;
        let pages = data.pages;
        let onPage = 1;
        let imgLst = data.imgLst;
        eventbus.$emit('findIt', {pages: pages, onPage: onPage, imgLst: imgLst})
      })
    }
  },
  mounted() {
  },
  created() {
    this.findIt();
  },
  watch: {



  }
}
</script>

<style scoped>
.tight-checkbox {
  margin: 0;
  padding: 0;
}
</style>