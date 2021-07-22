<template>
  <el-select
    ref="select"
    :value="value"
    popper-class="er-tree-select"
    clearable
    filterable
    :remote="remote"
    :multiple="multiple"
    :placeholder="placeholder"
    :remote-method="onInput"
    :loading="loading"
    :disabled="disabled"
    :popperAppendToBody="popperAppendToBody"
    :reserve-keyword="reserveKeyword"
    @clear="onClear"
    @remove-tag="onRemoveTag"
    @visible-change="onVisibleChange"
  >
    <el-option
      v-for="option in valueOptions"
      :key="getPropValue(option, 'value')"
      :value="getPropValue(option, 'value')"
      :label="getPropValue(option, 'label')"
    ></el-option>

    <el-tree
      ref="tree"
      empty-text="无数据"
      :data="treeData"
      :props="locTreeProps"
      :node-key="locTreeProps.value"
      :highlight-current="true"
      :lazy="lazy"
      :load="load"
      :checkStrictly="checkStrictly"
      :current-node-key=" !multiple && value && value.length > 0 ? value : '' "
      :expand-on-click-node="false"
      :default-expanded-keys="locDefaultExpandedKeys"
      :show-checkbox="multiple"
      :filter-node-method="filterNode"
      @node-click="onNodeClick"
      @check="onTreeCheck"
      @node-expand="onNodeExpand"
    >
      <template #default="{ data }">
        <div
          :class="treeItemClass(data)"
          v-html="highlight(getPropValue(data, 'label'))"
        >
        </div>
      </template>
    </el-tree>
  </el-select>
</template>

<script lang="ts">
import { Option, Select, Tree } from "element-ui";
import type { PropType } from "vue";
import Vue from "vue";
import difference from "lodash/difference";
import { getNodeByKey } from "./utils";

Vue.component(Tree.name, Tree);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);

const DEFAULT_DATA_KEY = {
  value   : "value",
  label   : "label",
  children: "children",
  disabled: "disabled",
  isLeaf  : "isLeaf",
};

function getAllKeys(valueKey, isLeafKey, childKey, treeData, rv = []) {
  for (const tData of treeData) {
    if (tData[childKey]?.length && !tData[isLeafKey]) {
      rv.push(tData[valueKey])
      rv.push(...getAllKeys(valueKey, isLeafKey, childKey, tData[childKey], []))
    }
  }
  return rv;
}

export default Vue.extend({
  name      : "er-tree-select",
  model: {
    prop : "value",
    event: "change",
  },
  props: {
    disabled: { default: false, type: Boolean },
    multiple: { default: false, type: Boolean },
    remote: { default: false, type: Boolean },
    filterable: { default: false, type: Boolean },
    checkStrictly: { default: false, type: Boolean },
    reserveKeyword: { default: false, type: Boolean },
    popperAppendToBody: { default: true, type: Boolean },
    isCheckOnLeaf: {
      default: false,
      type   : <PropType<boolean>> Boolean,
    },
    keyword: {
      default: "",
      type   : <PropType<string>> String,
    },
    lazy: {
      default: false,
      type   : <PropType<boolean>> Boolean,
    },
    load: {
      default () {
        return () => true;
      },
      type: <PropType<() => true>> Function,
    },
    loading: {
      default: false,
      type   : <PropType<boolean>> Boolean,
    },
    expandAll: { default: false, type: Boolean },
    placeholder: { default: "请选择", type: String },
    treeData   : {
      default () {
        return [];
      },
      type: <PropType<unknown[]>> Array,
    },
    treeProps: {
      default () {
        return DEFAULT_DATA_KEY;
      },
      type: <PropType<Record<string, string>>> Object,
    },
    defaultExpandedKeys: {
      default () {
        return [];
      },
      type: Array,
    },
    value: {
      default: null,
      type   : <PropType<number | string | number[] | string[]>> [String, Number, Array],
    },
  },
  data () {
    return {
    };
  },
  computed: {
    locTreeProps (): Record<string, string> {
      return {
        ...DEFAULT_DATA_KEY,
        ...this.treeProps,
      };
    },
    locDefaultExpandedKeys () {
      if (this.expandAll) {
        return getAllKeys(this.treeProps.value, this.treeProps.isLeaf, this.treeProps.children, this.treeData, [])
      }
      return this.defaultExpandedKeys;
    },
    valueOptions () {
      if (this.multiple) {

        // hack: 至少返回一个 OPTION，不然下拉框不出来
        if (!this.value?.length) {
          return [{}]
        }
        return this.value.map(id => {
          return  getNodeByKey(this.treeData, id, this.locTreeProps, this.$refs.tree);
        })
      }
      return [getNodeByKey(this.treeData, this.value, this.locTreeProps, this.$refs.tree)]
    },
  },
  created (): void {
    // 观察数组
    this.$watch(
      () => [this.value, this.treeData],
      async ([val]) => {
        if (![null, undefined].includes(val) && this.$refs.tree) {
          this.setSelected(val);
        }
      },
      {
        immediate: true,
      }
    )
  },
  async mounted (): Promise<void> {
    await this.$nextTick();
    if (this.$refs.tree) {
      // mounted 里设置，确保能设置成功，watch 里并不能确保
      this.setSelected(this.value);
    }
  },
  methods: {
    onNodeClick (data, node, component): void {
      const children = data[this.locTreeProps.children];
      const value = data[this.locTreeProps.value];
      const isLeaf = data[this.locTreeProps.isLeaf];
      const label = data[this.locTreeProps.label];
      const disabledRV = this.getPropValue(data, 'disabled');
      if (((children?.length || this.lazy && !isLeaf) && this.isCheckOnLeaf) || disabledRV || this.multiple) {
        return component.handleExpandIconClick();
      }
      if (value !== this.value) {
        this.$emit("change", value)
      }
      this.$refs.select.blur();
    },

    /**
     * on tree checkbox change.
     * @param {object} node - 传递给 data 属性的数组中该节点所对应的对象.
     * @param {object} data - 树目前的选中状态对象.
     */
    onTreeCheck(node, data) {
      let checked = []
      if (this.checkStrictly) {
        checked = data.checkedKeys;
      } else {
        let redundance = []
        for (let cNode of data.checkedNodes) {
          const children = this.getPropValue(cNode, 'children');
          if (children?.length) {
            redundance.push(...children.map(d => this.getPropValue(d, 'value')))
          }
        }

        // unique
        redundance = Array.from(new Set(redundance))

        // 去掉多余的子节点
        checked = difference(data.checkedKeys, redundance)
      }

      this.$emit("change", checked)
      this.$emit("check", node, data)
    },

    onNodeExpand(...args) {
      this.$emit('node-expand', ...args)
    },
    onInput (val) {
      if (this.filterable) {
        this.$refs.tree.filter(val)
      }
      this.$emit("input", val);
    },
    onClear () {
      const value = this.multiple ? [] : "";
      this.$emit("change", value)
      this.$emit("clear")
    },
    onRemoveTag (value) {
      const index = this.value.findIndex(d => d === value);
      if (index >= 0) {
        this.value.splice(index, 1);
        this.value = this.value;
      }
    },
    onVisibleChange (visible: boolean) {
      // if (!visible) {
      //   this.onInput("");
      // }
      this.$emit("visible-change", visible);
    },
    filterNode(value, data) {
      if (!value) return true;
      return this.getPropValue(data, 'label')?.indexOf(value) !== -1;
    },
    setSelected (value: number | string | number[] | string[]): void {
      if (!value || !this.$refs || !this.$refs.tree || !this.$refs.tree.setCheckedKeys) return;
      if (this.multiple) {
        this.$refs.tree.setCheckedKeys(value)
      } else {
        this.$refs.tree.setCurrentKey(value)
      }
    },
    treeItemClass (data): { "is-selected": boolean; "is-disabled": boolean; "item-text": boolean; } {
      const disabledRV = this.getPropValue(data, 'disabled');
      return {
        "is-selected": data[this.locTreeProps.value] === this.value,
        "is-disabled": disabledRV,
        "item-text"  : true,
      };
    },
    highlight (name: string): string {
      if (!this.keyword || !name) {
        return name;
      }
      return name.replace(new RegExp(`(${ this.keyword })`, "giu"), "<span class='highlight'>$1</span>");
    },
    getPropValue (data = {}, type: string) {
      return typeof this.locTreeProps[type] === "function"
        ? this.locTreeProps[type](data)
        : data[this.locTreeProps[type]];

    },
  },
});
</script>

<style lang="scss">
.er-tree-select.el-popper {
  .el-select-dropdown__item {
    display: none;
  }

  .el-tree {
    .el-tree__empty-block {
      // display: none;
    }

    .el-tree-node {
      &.is-checked {
        .el-tree-node__content {
          background: init;
          padding-right: 1em;
        }
      }

      &:focus > .el-tree-node__content {
        background: inherit;
      }

      .el-tree-node__content {
        padding-right: 1em;
        user-select: none;

        .is-selected {
          color: rgb(70, 172, 255);
        }

        .is-disabled {
          color: #ccc;
          cursor: not-allowed;
        }

        .item-text {
          max-width: 500px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .highlight {
          color: rgb(70, 172, 255);
        }
      }
    }
  }
}
</style>
