<template>
  <div>
    el tree select {{ count }}
  </div>
</template>

<script lang="ts">
const a: number = 89;

export default {
  props: {
    msg: String,
  },
  data() {
    return {
      count: <number> a,
    };
  },
};
</script>

<style scoped>
div {
  color: #42b983;
}
</style>