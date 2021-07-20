var e=Object.defineProperty,t=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,a=(t,l,r)=>l in t?e(t,l,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[l]=r,o=(e,o)=>{for(var n in o||(o={}))l.call(o,n)&&a(e,n,o[n]);if(t)for(var n of t(o))r.call(o,n)&&a(e,n,o[n]);return e};import{V as n,e as i,d as s}from"./vendor.fd9207b3.js";function d(e,t,l,r,a,o,n,i){var s,d="function"==typeof e?e.options:e;if(t&&(d.render=t,d.staticRenderFns=l,d._compiled=!0),r&&(d.functional=!0),o&&(d._scopeId="data-v-"+o),n?(s=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),a&&a.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(n)},d._ssrRegister=s):a&&(s=i?function(){a.call(this,(d.functional?this.parent:this).$root.$options.shadowRoot)}:a),s)if(d.functional){d._injectStyles=s;var u=d.render;d.render=function(e,t){return s.call(t),u(e,t)}}else{var c=d.beforeCreate;d.beforeCreate=c?[].concat(c,s):[s]}return{exports:e,options:d}}const u={};var c=d({props:{msg:String},data:()=>({count:89})},(function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",[e._v(" el tree select "+e._s(e.count)+" ")])}),[],!1,(function(e){for(let t in u)this[t]=u[t]}),"42b08416",null,null).exports;function p(e,t,l,r){var a,o;if((null==r?void 0:r.getNode)&&t)return null==(a=r.getNode(t))?void 0:a.data;for(const n of e){if(n[l.value]===t)return n;if(null==(o=n[l.children])?void 0:o.length){const e=p(n[l.children],t,l);if(e)return e}}}const h={value:"value",label:"label",children:"children",disabled:"disabled",isLeaf:"isLeaf"};function f(e,t,l,r,a=[]){var o;for(const n of r)(null==(o=n[l])?void 0:o.length)&&!n[t]&&(a.push(n[e]),a.push(...f(e,t,l,n[l],[])));return a}var v=n.extend({name:"er-tree-select",components:{Tree:i.exports.Tree,Select:i.exports.Select,Option:i.exports.Option},model:{prop:"value",event:"change"},props:{disabled:{default:!1,type:Boolean},multiple:{default:!1,type:Boolean},remote:{default:!1,type:Boolean},filterable:{default:!1,type:Boolean},checkStrictly:{default:!1,type:Boolean},reserveKeyword:{default:!1,type:Boolean},popperAppendToBody:{default:!0,type:Boolean},isCheckOnLeaf:{default:!1,type:Boolean},keyword:{default:"",type:String},lazy:{default:!1,type:Boolean},load:{default:()=>()=>!0,type:Function},loading:{default:!1,type:Boolean},expandAll:{default:!1,type:Boolean},placeholder:{default:"请选择",type:String},treeData:{default:()=>[],type:Array},treeProps:{default:()=>h,type:Object},defaultExpandedKeys:{default:()=>[],type:Array},value:{default:null,type:[String,Number,Array]}},data:()=>({}),computed:{locTreeProps(){return o(o({},h),this.treeProps)},locDefaultExpandedKeys(){return this.expandAll?f(this.treeProps.value,this.treeProps.isLeaf,this.treeProps.children,this.treeData,[]):this.defaultExpandedKeys},valueOptions(){var e;return this.multiple?(null==(e=this.value)?void 0:e.length)?this.value.map((e=>p(this.treeData,e,this.locTreeProps,this.$refs.tree))):[{}]:[p(this.treeData,this.value,this.locTreeProps,this.$refs.tree)]}},created(){this.$watch((()=>[this.value,this.treeData]),(async([e])=>{![null,void 0].includes(e)&&this.$refs.tree&&this.setSelected(e)}),{immediate:!0})},async mounted(){await this.$nextTick(),this.$refs.tree&&this.setSelected(this.value)},methods:{onNodeClick(e,t,l){const r=e[this.locTreeProps.children],a=e[this.locTreeProps.value],o=e[this.locTreeProps.isLeaf];e[this.locTreeProps.label];const n=this.getPropValue(e,"disabled");if(((null==r?void 0:r.length)||this.lazy&&!o)&&this.isCheckOnLeaf||n||this.multiple)return l.handleExpandIconClick();a!==this.value&&this.$emit("change",a),this.$refs.select.blur()},onTreeCheck(e,t){let l=[];if(this.checkStrictly)l=t.checkedKeys;else{let e=[];for(let l of t.checkedNodes){const t=this.getPropValue(l,"children");(null==t?void 0:t.length)&&e.push(...t.map((e=>this.getPropValue(e,"value"))))}e=Array.from(new Set(e)),l=s(t.checkedKeys,e)}this.$emit("change",l),this.$emit("check",e,t)},onNodeExpand(...e){this.$emit("node-expand",...e)},onInput(e){this.filterable&&this.$refs.tree.filter(e),this.$emit("input",e)},onClear(){const e=this.multiple?[]:"";this.$emit("change",e),this.$emit("clear")},onRemoveTag(e){const t=this.value.findIndex((t=>t===e));t>=0&&(this.value.splice(t,1),this.value=this.value)},onVisibleChange(e){this.$emit("visible-change",e)},filterNode(e,t){var l;return!e||-1!==(null==(l=this.getPropValue(t,"label"))?void 0:l.indexOf(e))},setSelected(e){e&&(this.multiple?this.$refs.tree.setCheckedKeys(e):this.$refs.tree.setCurrentKey(e))},treeItemClass(e){const t=this.getPropValue(e,"disabled");return{"is-selected":e[this.locTreeProps.value]===this.value,"is-disabled":t,"item-text":!0}},highlight(e){return this.keyword&&e?e.replace(new RegExp(`(${this.keyword})`,"giu"),"<span class='highlight'>$1</span>"):e},getPropValue(e={},t){return"function"==typeof this.locTreeProps[t]?this.locTreeProps[t](e):e[this.locTreeProps[t]]}}});const y={};var m=d(v,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("Select",{ref:"select",attrs:{value:e.value,"popper-class":"er-tree-select",clearable:"",filterable:"",remote:e.remote,multiple:e.multiple,placeholder:e.placeholder,"remote-method":e.onInput,loading:e.loading,disabled:e.disabled,popperAppendToBody:e.popperAppendToBody,"reserve-keyword":e.reserveKeyword},on:{clear:e.onClear,"remove-tag":e.onRemoveTag,"visible-change":e.onVisibleChange}},[e._l(e.valueOptions,(function(t){return l("Option",{key:e.getPropValue(t,"value"),attrs:{value:e.getPropValue(t,"value"),label:e.getPropValue(t,"label")}})})),l("Tree",{ref:"tree",attrs:{"empty-text":"无数据",data:e.treeData,props:e.locTreeProps,"node-key":e.locTreeProps.value,"highlight-current":!0,lazy:e.lazy,load:e.load,checkStrictly:e.checkStrictly,"current-node-key":!e.multiple&&e.value&&e.value.length>0?e.value:"","expand-on-click-node":!1,"default-expanded-keys":e.locDefaultExpandedKeys,"show-checkbox":e.multiple,"filter-node-method":e.filterNode},on:{"node-click":e.onNodeClick,check:e.onTreeCheck,"node-expand":e.onNodeExpand},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.data;return[l("div",{class:e.treeItemClass(r),domProps:{innerHTML:e._s(e.highlight(e.getPropValue(r,"label")))}})]}}])})],2)}),[],!1,(function(e){for(let t in y)this[t]=y[t]}),null,null,null).exports;m.install=function(e){e.component(m.name,Tree)};const g={};var b=d({components:{HelloWorld:c,TreeSelect:m},data:()=>({value:[1,3],keyword:"",treeData:[{id:1,name:"text1",authority:!0,child:[{id:5,name:"text5"},{id:6,name:"text6",child:[{id:7,name:"text7"},{id:8,name:"text8"},{id:9,name:"text9"},{id:10,name:"text10"}]}]},{id:2,name:"text2",authority:!1},{id:3,name:"text3",authority:!0},{id:4,name:"text4"}],disabledValues:[3]}),methods:{onInput(e){this.keyword=e},onVisibleChange(e){e||(this.keyword="")}}},(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{attrs:{id:"app"}},[l("TreeSelect",{staticStyle:{width:"70%"},attrs:{placeholder:"请选择内容",clearable:"",filterable:!1,multiple:!0,remote:!0,keyword:e.keyword,"tree-props":{value:"id",children:"child",label:"name",disabled:function(e,t){return!1===e.authority}},"tree-data":e.treeData,"disabled-values":e.disabledValues,"is-check-on-leaf":!1},on:{input:e.onInput,"visible-change":e.onVisibleChange},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1)}),[],!1,(function(e){for(let t in g)this[t]=g[t]}),null,null,null).exports;new n({render:e=>e(b)}).$mount("#app");
