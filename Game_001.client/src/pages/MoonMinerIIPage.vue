<template>
  <div class="mmBody">
    <div class="container-fluid mmBlur">
      <div class="row text-center p-3">
        <h3 class="header">Welcome to Moon Miner II</h3>
        <div class="col-12"></div>
      </div>
      <div class="row justify-content-around">
        <div class="col-3 text-center">
          <button v-if="moon.interval_started != true" class="btn btn-dark"
            @click="startInterval(); moon.interval_started = true;">Start</button>
          <!-- <button v-else class="btn btn-dark" disabled>Start</button> -->
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-12 text-center p-3">
          <img v-if="moon.interval_started == true" src="../assets/img/moonSM_v2.png" @click="mineMoon()"
            class="moon rounded-circle">
          <img v-else src="../assets/img/moonSM_v2.png" disabled onclick="window.alert('Click Start button to begin');">
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="text-dark pt-3">Mining Tools</h4>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-4 text-center p-1 d-none d-md-block">
        <h6>Click</h6> Additional slices per click
      </div>
      <div class="col-md-4 text-center p-1 d-none d-md-block">
        <h6>Passive</h6> Gain slices without clicking
      </div>
      <div class="col-md-4 text-center p-1 d-none d-md-block">
        <h6>Stasis</h6> Slow the molding process
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12 col-md-4 text-center p-1">
        <button v-if="player.resources_available >= cheeseSlicer.price && moon.interval_started == true"
          class="btn btn-danger" @click="buyEquipment(cheeseSlicer)">Cheese Slicer +{{ cheeseSlicer.power }} slice/click
          (${{ cheeseSlicer.price }})</button>
        <button v-else class="btn btn-dark disabled">Cheese Slicer +{{ cheeseSlicer.power }} slice/click (${{
          cheeseSlicer.price }})</button>
      </div>
      <div class="col-12 col-md-4 text-center p-1">
        <button v-if="player.resources_available >= cheeseStraw.price && moon.interval_started == true"
          class="btn btn-danger" @click="buyEquipment(cheeseStraw)">Cheese Straw +{{ cheeseStraw.power }} slice/tick
          (${{ cheeseStraw.price }})</button>
        <button v-else class="btn btn-dark disabled">Cheese Straw +{{ cheeseStraw.power }} slice/tick (${{
          cheeseStraw.price }})</button>
      </div>
      <div class="col-12 col-md-4 text-center p-1">
        <button class="btn btn-dark disabled">Tool</button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12 col-md-4 text-center p-1">
        <button v-if="player.resources_available >= cheeseKnife.price && moon.interval_started == true"
          class="btn btn-danger" @click="buyEquipment(cheeseKnife)">Cheese Knife +{{ cheeseKnife.power }} slice/click (${{
            cheeseKnife.price
          }})</button>
        <button v-else class="btn btn-dark disabled">Cheese Knife +{{ cheeseKnife.power }} slice/click (${{
          cheeseKnife.price }})</button>
      </div>
      <div class="col-12 col-md-4 text-center p-1">
        <button v-if="player.resources_available >= cheeseVacuum.price && moon.interval_started == true"
          class="btn btn-danger" @click="buyEquipment(cheeseVacuum)">Cheese Vacuum +{{ cheeseVacuum.power }} slice/tick
          (${{ cheeseVacuum.price }})</button>
        <button v-else class="btn btn-dark disabled">Cheese Vacuum +{{ cheeseVacuum.power }} slice/tick (${{
          cheeseVacuum.price }})</button>
      </div>
      <div class="col-12 col-md-4 text-center p-1">
        <button class="btn btn-dark disabled">Tool</button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h4 class="text-center pt-3">Moon</h4>
        <p>Interval Started: <span class="stats">{{ moon.interval_started }}</span>
          <br>Maximum Slices: <span class="stats">{{ moon.max_health }}</span>
          <br>Slices Left: <span class="stats">{{ moon.current_health }}</span>
          <br>Mold Rate: <span class="stats">{{ moon.deteriorationAmount }} Slice(s) / {{ moon.deteriorationRate }}
            ms (tick)</span>
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h4 class="text-center">Player</h4>
        <p>Resources Available: <span class="stats">{{ player.resources_available }}</span>
          <br>Resources Extracted: <span class="stats">{{ player.resources_extracted }}</span>
          <br>Extraction Amount (per click): <span class="stats">{{ player.extraction_amount_click }}</span>
          <br>Extraction Amount (passive): <span class="stats">{{ player.extraction_amount_passive }}</span>
          <br>Total Moon Clicks: <span class="stats">{{ player.totalClicks }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

export default {
  setup() {
    AppState.moon = {
      interval_started: false,
      max_health: 500,
      current_health: 500,
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
      if (AppState.moon.current_health <= 0) {
        stopInterval()
        AppState.moon.current_health = 0
        AppState.moon.interval_started = false
        console.log("Game Over: ", AppState.player)
        // FIXME Disable each tool (no more purchases after game end)
      }
    }
    function stopInterval() {
      console.log("stopInterval")
      clearInterval(AppState.moon.moonInterval);
    }

    function drawStats() {
      // FIXME Write player Statistics to page
      // console.log("drawStats", AppState.moon, AppState.player)
      checkEndGame()
    }

    return {
      moon: computed(() => AppState.moon),

      player: computed(() => AppState.player),

      tools: computed(() => AppState.tools),

      cheeseSlicer: {
        nameID: 'cheeseSlicer',
        type: 'click',
        power: 1,
        start_price: 50,
        price: 50,
        priceID: 'addCheeseSlicerPrice',
        priceIncrementor: 10,
        start_quantityOwned: 0,
        quantityOwned: 0,
        quantityOwnedID: 'plusCheeseSlicers',
        toolButtonID: 'addCheeseSlicer',
        totalFromToolID: 'plusCheeseSlicerTotal'
      },

      cheeseKnife: {
        nameID: 'cheeseKnife',
        type: 'click',
        power: 9,
        start_price: 200,
        price: 200,
        priceID: 'addCheeseKnifePrice',
        priceIncrementor: 15,
        start_quantityOwned: 0,
        quantityOwned: 0,
        quantityOwnedID: 'plusCheeseKnifes',
        toolButtonID: 'addCheeseKnife',
        totalFromToolID: 'plusCheeseKnifeTotal'
      },

      cheeseStraw: {
        nameID: 'cheeseStraw',
        type: 'ongoing',
        power: 2,
        start_price: 25,
        price: 25,
        priceID: 'addCheeseStrawPrice',
        priceIncrementor: 3,
        quantityOwned: 0,
        quantityOwnedID: 'plusCheeseStraws',
        toolButtonID: 'addCheeseStraw',
        totalFromToolID: 'plus1CheeseStrawsTotal'
      },

      cheeseVacuum: {
        nameID: 'cheeseVacuum',
        type: 'ongoing',
        power: 9,
        start_price: 200,
        price: 200,
        priceID: 'addCheeseVacuumPrice',
        priceIncrementor: 15,
        quantityOwned: 0,
        quantityOwnedID: 'plusCheeseVacuums',
        toolButtonID: 'addCheeseVacuum',
        totalFromToolID: 'plus1CheeseVacuumsTotal'
      },

      startInterval() {
        console.log("startInterval")
        this.gameSetup()
        AppState.moon.moonInterval = setInterval(() => {
          AppState.moon.current_health -= (AppState.moon.deteriorationAmount + AppState.player.extraction_amount_passive)
          AppState.player.resources_available += AppState.player.extraction_amount_passive
          AppState.player.resources_extracted += AppState.player.extraction_amount_passive
          drawStats()
        }, AppState.moon.deteriorationRate)
      },

      gameSetup() {
        // Moon
        AppState.moon.interval_started = true
        AppState.moon.current_health = AppState.moon.max_health
        // Player
        AppState.player.resources_available = 0
        AppState.player.resources_extracted = 0
        AppState.player.extraction_amount_click = 1
        AppState.player.extraction_amount_passive = 0
        AppState.player.totalClicks = 0
        // Tools
        this.cheeseSlicer.price = this.cheeseSlicer.start_price
        this.cheeseKnife.price = this.cheeseKnife.start_price
        this.cheeseStraw.price = this.cheeseStraw.start_price
        this.cheeseVacuum.price = this.cheeseVacuum.start_price
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
      },

      buyEquipment(name) {
        let currentTool = name
        console.log('currentTool: ', currentTool)

        if (AppState.player.resources_available >= currentTool.price) {
          AppState.player.resources_available -= currentTool.price
          currentTool.quantityOwned++
          currentTool.price += currentTool.priceIncrementor

          if (currentTool.type == 'click') {
            AppState.player.extraction_amount_click += currentTool.power
          } else if (currentTool.type == 'ongoing') AppState.player.extraction_amount_passive += currentTool.power
        }

        drawStats()
      }
    };
  },
};
</script>

<style>
.stats {
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
  /* background-image: url('https://apod.nasa.gov/apod/image/2308/Pacman_Stocks_2560.jpg'); */
  background-image: url('https://apod.nasa.gov/apod/image/2308/nh-northpolerotatedcontrast.jpg');
  background-size: cover;
  background-position: center;
}

.mmBlur {
  backdrop-filter: blur(5px);
}

.moon {
  cursor: url("../assets/img/pickaxe2.svg"), auto;
}

.header {
  text-shadow: 2px 2px 4px #000000;
  color: var(--bs-light);
}
</style>