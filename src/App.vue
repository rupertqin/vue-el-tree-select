<template>
  <div id="app">
    <HelloWorld />
    <TreeSelect 
      v-model="value"
      style="width: 70%;"
      placeholder="请选择内容"
      clearable
      :filterable="false"
      :multiple="true"
      :remote="true"
      :keyword="keyword"
      :tree-props="{
        value: 'id',
        children: 'child',
        label: 'name',
        disabled(data, node) {
          return data.authority === false
        },
      }"
      @input="onInput"
      @visible-change="onVisibleChange"
      :tree-data="treeData"
      :disabled-values="disabledValues"
      :is-check-on-leaf="false"
    />
  </div>
</template>

<script lang="ts">
import HelloWorld from "./components/HelloWorld.vue"
import TreeSelect from "./components"
import "element-ui/lib/theme-chalk/index.css"


export default {
  components: {
    HelloWorld,
    TreeSelect
  },
  data () {
    return {
      value   : [1,3],
      keyword: "",
      treeData: [
        {
          id   : 1,
          name : "text1",
          authority  : true,
          child: [
            { id: 5, name: "text5" },
            { id: 6,
              name: "text6",
              child: [
                { id: 7, name: "text7" },
                { id: 8, name: "text8"},
                { id: 9, name: "text9"},
                { id: 10, name: "text10"}
              ],
            }
          ],
        },
        { id: 2, name: "text2", authority: false },
        { id: 3, name: "text3", authority: true },
        { id: 4, name: "text4" },
      ],
      disabledValues: [3],
    };
  },
  methods: {
    onInput(keyword) {
      this.keyword = keyword;
    },
    onVisibleChange (visible) {
      if (!visible) {
        this.keyword = "";
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
