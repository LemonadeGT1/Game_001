<template>
  <div class="container-fluid mmBody">
    <div class="row text-center p-3">
      <h3>Welcome to Moon Miner II</h3>
      <div class="col-12"></div>
    </div>
    <div class="row justify-content-around">
      <div class="col-3 text-center">
        <button class="btn btn-dark" @click="startInterval()">Start</button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12 text-center p-3">
        <img v-if="moon.interval_started == true" src="../assets/img/moonSM_v2.png" @click="mineMoon()">
        <img v-else src="../assets/img/moonSM_v2.png" class="disabled">
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="text-dark">Mining Tools</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-12" id="readOut">
        <p>Interval Started: {{ moon.interval_started }}</p>
        <p>Max Health: {{ moon.max_health }}</p>
        <p>Current Health: {{ moon.current_health }}</p>
        <p>Deterioration Amount: {{ moon.deteriorationAmount }}</p>
        <p>Deterioration Rate: {{ moon.deteriorationRate }} (1000 = every 1 second)</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  setup() {
    let moon = {
      interval_started: false,
      max_health: 5000,
      current_health: 5000,
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
      if (moon.current_health <= 0) {
        stopInterval()
        moon.current_health = 0
        console.log("Game Over: ", player)
        // FIXME Disable each tool (no more purchases after game end)
      }
    }

    function drawStats() {
      // FIXME Write player Statistics to page
      // console.log("drawStats", moon, player)

    }
    return {
      moon: computed(() => moon),

      startInterval() {
        console.log("startInterval")
        let moonInterval = setInterval(() => {
          moon.current_health -= (moon.deteriorationAmount + player.extraction_amount_passive)
          player.resources_available += player.extraction_amount_passive
          player.resources_extracted += player.extraction_amount_passive
          drawStats()
        }, moon.deteriorationRate)
      },


      stopInterval() {
        console.log("stopInterval")
        // FIXME Figure out how to set up moonInterval so it is accessible here
        clearInterval(moonInterval);
      },

      mineMoon() {
        if (moon.current_health > 0) {
          moon.current_health -= player.extraction_amount_click
          player.resources_available += player.extraction_amount_click
          player.resources_extracted += player.extraction_amount_click
          player.totalClicks++
          // console.log('mineMoon: ', moon, player)
          const readOutElem = document.getElementById('readOut')
          readOutElem.innerHTML = "<p>Max Health: " + moon.max_health + "</p>" + "<p>Current Health: " + moon.current_health + "</p>" + "<p>Deterioration Amount: " + moon.deteriorationAmount + "</p>" + "</p>" + "<p>Deterioration Rate: " + moon.deteriorationRate + "</p>" + "</p>" + "<p>Interval Started: " + moon.interval_started + "</p>"
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