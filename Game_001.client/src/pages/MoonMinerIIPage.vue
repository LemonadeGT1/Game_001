<template>
  <div class="mmBody">
    <div class="container-fluid mmBlur">
      <div class="row text-center p-3">
        <h3 class="text-shadow">Welcome to Moon Miner II</h3>
        <div class="col-12"></div>
      </div>
      <div class="row justify-content-around">
        <div class="col-3 text-center">
          <button v-if="moon.interval_started != true" class="btn btn-dark"
            @click="startInterval(); moon.interval_started = true;">Start</button>
          <button v-else class="btn btn-dark" disabled>Start</button>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-12 text-center p-3">
          <img v-if="moon.interval_started == true" src="../assets/img/moonSM_v2.png" @click="mineMoon()"
            class="rounded-circle">
          <img v-else src="../assets/img/moonSM_v2.png" disabled onclick="window.alert('Click Start button to begin');">
        </div>
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
      <div class="col-12">
        <h4 class="text-center">Moon</h4>
        <p>Interval Started: <span>{{ moon.interval_started }}</span>
          <br>Max Health: <span>{{ moon.max_health }}</span>
          <br>Current Health: <span>{{ moon.current_health }}</span>
          <br>Deterioration Amount: <span>{{ moon.deteriorationAmount }}</span>
          <br>Deterioration Rate: <span>{{ moon.deteriorationRate }}</span> (1000 = every 1 second)
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h4 class="text-center">Player</h4>
        <p>Resources Available: <span>{{ player.resources_available }}</span>
          <br>Resources Extracted: <span>{{ player.resources_extracted }}</span>
          <br>Extraction Amount (per click): <span>{{ player.extraction_amount_click }}</span>
          <br>Extraction Amount (passive): <span>{{ player.extraction_amount_passive }}</span>
          <br>Total Clicks: <span>{{ player.totalClicks }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from 'vue';
import { AppState } from '../AppState.js';

export default {
  setup() {
    AppState.moon = {
      interval_started: false,
      max_health: 5000,
      current_health: 5000,
      deteriorationAmount: 3,
      deteriorationRate: 1000
    }

    AppState.player = {
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
      // console.log("drawStats", AppState.moon, AppState.player)
    }

    // watchEffect(() => {
    //   console.log('watchEffect triggered!', moon)
    //   moon.value = { ...moon }
    // })

    return {
      moon: computed(() => AppState.moon),

      player: computed(() => AppState.player),

      startInterval() {
        console.log("startInterval")
        AppState.moon.interval_started = true
        let moonInterval = setInterval(() => {
          AppState.moon.current_health -= (AppState.moon.deteriorationAmount + AppState.player.extraction_amount_passive)
          AppState.player.resources_available += AppState.player.extraction_amount_passive
          AppState.player.resources_extracted += AppState.player.extraction_amount_passive
          drawStats()
        }, AppState.moon.deteriorationRate)
      },


      stopInterval() {
        console.log("stopInterval")
        // FIXME Figure out how to set up moonInterval so it is accessible here
        clearInterval(moonInterval);
      },

      mineMoon() {
        if (AppState.moon.current_health > 0) {
          AppState.moon.current_health -= AppState.player.extraction_amount_click
          AppState.player.resources_available += AppState.player.extraction_amount_click
          AppState.player.resources_extracted += AppState.player.extraction_amount_click
          AppState.player.totalClicks++
        } else {
          checkEndGame()
        }
      }
    };
  },
};
</script>

<style>
span {
  border: none !important;
  background-color: var(--bs-body-bg);
  border-radius: 5px;
  color: var(--bs-heading-color);
}

.mmBody {
  background-color: #111111;
  color: var(--bs-body-bg);
  font-family: 'IM Fell DW Pica SC', serif;
  /* min-height: 35vh; */
  background-image: url('https://apod.nasa.gov/apod/image/2308/Pacman_Stocks_2560.jpg');
  background-size: cover;
  background-position: center;
}

.mmBlur {
  backdrop-filter: blur(5px);
}

.text-shadow {
  text-shadow: 2px 2px 4px #000000;
}
</style>