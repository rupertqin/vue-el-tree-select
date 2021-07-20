import TreeSelect from './tree-select.vue';

/* istanbul ignore next */
TreeSelect.install = function(Vue) {
  Vue.component(TreeSelect.name, Tree);
};

export default TreeSelect;

export interface CommonOption {
  label: string;
  value: number | string;
}

export interface TreeNode extends CommonOption {
  children?: CommonOption[];
}
