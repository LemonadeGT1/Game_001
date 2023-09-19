<template>
  <div class="treeBG">
    <div class="container-fluid treeBlur">
      <div class="row">
        <div class="col-12 text-center"><img src="../assets/img/Tree1.svg" class="tree" @click="treeClick()"></div>
      </div>
    </div>
  </div>
  <div class="container-fluid groundBG">
    <div class="row">
      <div class="col-12">
        <h3>Hello</h3>
      </div>
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
.treeBG {
  background-color: #7CE0F6;
  background-image: url("https://images.unsplash.com/photo-1514477917009-389c76a86b68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1967&q=80");
  background-position: bottom;
  background-size: cover;
}

.treeBlur {
  backdrop-filter: blur(5px);
}

.groundBG {
  background-color: var(--bs-dark);
  color: var(--bs-light)
}

.tree {
  height: 200px;
}
</style>