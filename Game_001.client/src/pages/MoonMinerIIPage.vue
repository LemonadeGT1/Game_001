<template>
  <div class="container-fluid mmBody">
    <div class="row col-12 text-center p-3">
      <h3>This is the Moon Miner II page</h3>
    </div>
    <div class="row">
      <div class="col-12 text-center p-3">
        <img src="../assets/img/moonSM_v2.png" @click="mineMoon()">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    let moon = {
      health: 4875 + (Math.ceil(Math.random() * 250)),
      deteriorationAmount: 3,
      deteriorationRate: 1000
    }

    let player = {
      resources_available: 0,
      resources_extracted: 0,
      extraction_amount_click: 1,
      extraction_amount_passive: 0,
      totalClicks: 0
    }

    function checkEndGame() {
      if (moon.health <= 0) {
        stopInterval()
        moon.health = 0
        console.log("Game Over: ", player)
        // FIXME Disable each tool (no more purchases after game end)
      }
    }

    function drawStats() {
      // FIXME Write player Statistics to page
      // console.log("drawStats", moon, player)

    }

    let moonInterval = setInterval(() => {
      moon.health -= (moon.deteriorationAmount + player.extraction_amount_passive)
      player.resources_available += player.extraction_amount_passive
      player.resources_extracted += player.extraction_amount_passive
      drawStats()
    }, moon.deteriorationRate)

    function stopInterval() {
      clearInterval(moonInterval);
    }
    return {

      mineMoon() {
        if (moon.health > 0) {
          moon.health -= player.extraction_amount_click
          player.resources_available += player.extraction_amount_click
          player.resources_extracted += player.extraction_amount_click
          player.totalClicks++
          console.log('mineMoon: ', moon, player)
        } else {
          checkEndGame()
        }
      }
    };
  },
};
</script>

<style>
.mmBody {
  background-color: #111111;
  color: var(--bs-body-bg);
  font-family: 'IM Fell DW Pica SC', serif;
  min-height: 45vh;
}
</style>