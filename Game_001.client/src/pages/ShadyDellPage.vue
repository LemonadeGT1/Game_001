<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 text-center"><img src="../assets/img/Tree1.svg" class="tree" @click="treeClick()"></div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {
      treeClick() {
        console.log('Tree Clicked')
      }
    };
  },
};
</script>

<style>
.tree {
  height: 200px;
}
</style>