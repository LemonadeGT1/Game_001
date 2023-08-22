<template>
  <div class="container pt-3 bg-white elevation-3 rounded mt-3">
    <div class="row p-2 align-items-center justify-content-center">
      <div class="col-12">
        <h4>Featured Games:</h4>
      </div>
      <div class="col-sm-3 col-12 text-center"><img src="../assets/img/Shady Dell-logos_black.png" alt="Shady Dell Logo"
          class="rounded-circle p-1 gameLogo"></div>
      <div class="col-sm-3 col-12 text-center"><img src="../assets/img/Shady Dell-logos.jpeg" alt="Shady Dell Logo"
          class="rounded-circle p-1 gameLogo"></div>
      <div class="col-sm-3 col-12 text-center">
        <router-link :to="{ name: 'MoonMinerII' }" class="btn text-light selectable text-uppercase">
          <img src="../assets/img/MoonMinerLogo_001.png" alt="Moon Miner II Logo" class="rounded-circle p-1 gameLogo">
        </router-link>
      </div>
    </div>
    <div class="row p-2 px-3">
      <h1 class="my-2 bg-success text-white p-3 rounded text-center">
        Would you like to play a game?
      </h1>
    </div>
    <div class="row pt-3">
      <div class="col-12">
        <h4>Other games that can be played on this site:</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.gameLogo {
  max-width: 200px;
}
</style>
