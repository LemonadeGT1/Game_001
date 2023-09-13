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
            @click="startInterval(); moon.interval_started = true; startPlayerInterval();">Start</button>
          <button v-else class="btn btn-dark" disabled>Start</button>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-3"><span class="moon-text">MOON<br>Slices Left {{ moon.current_health }}
            <br>Molded {{ moon.slices_lost }}</span></div>
        <div class="col-6 text-center p-3">
          <img v-if="moon.interval_started == true" src="../assets/img/MoonLG.png" @click="mineMoon()"
            class="moon rounded-circle rotate">
          <img v-else src="../assets/img/MoonLG.png" disabled onclick="window.alert('Click Start button to begin');"
            class="moon rounded-circle">
        </div>
        <div class="col-3 text-end"><span class="moon-text">PLAYER<br>Slices {{ player.resources_available }}
            <br>Time {{ isNaN(Math.floor((player.end_time - player.start_time) /
              1000)) ? 0 : Math.floor((player.end_time - player.start_time) / 1000) }} s
            <br>Slices/Clk {{ player.extraction_amount_click }}
            <br>Slices/s {{ player.extraction_amount_passive }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row justify-content-center pt-2">
      <div class="col-md-3 mx-1 text-center p-1 d-none d-md-block">
        <h6>Click</h6> <span>Additional slices per click</span>
      </div>
      <div class="col-md-3 mx-1 text-center p-1 d-none d-md-block">
        <h6>Passive</h6> <span>Gain slices without clicking</span>
      </div>
      <div class="col-md-3 mx-1 text-center p-1 d-none d-md-block">
        <h6>Stasis</h6> <span>Slow the molding process</span>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-10 col-md-3 mx-1 p-1 order-0 order-md-0">
        <button v-if="player.resources_available >= cheeseSlicer.price && moon.interval_started == true"
          class="btn btn-danger tool-btn" @click="buyEquipment(cheeseSlicer)">Cheese Slicer</button>
        <button v-else class="btn btn-dark disabled tool-btn">Cheese Slicer</button> + {{ cheeseSlicer.power }}
        slice/click
        (${{
          cheeseSlicer.price }})
      </div>
      <div class="col-10 col-md-3 mx-1 p-1 order-2 order-md-1">
        <hr class="d-md-none p-1">
        <button v-if="player.resources_available >= cheeseStraw.price && moon.interval_started == true"
          class="btn btn-warning tool-btn" @click="buyEquipment(cheeseStraw)">Cheese Straw</button>
        <button v-else class="btn btn-dark disabled tool-btn">Cheese Straw</button> + {{ cheeseStraw.power }} slice/second
        (${{
          cheeseStraw.price }})
      </div>
      <div class="col-10 col-md-3 mx-1 p-1 order-4 order-md-2">
        <hr class="d-md-none p-1">
        <button v-if="player.resources_available >= cheeseSpray.price && moon.interval_started == true"
          class="btn btn-info tool-btn" @click="buyEquipment(cheeseSpray)">Cheese Spray</button>
        <button v-else class="btn btn-dark disabled tool-btn">Cheese Spray</button> + {{ cheeseSpray.power }}ms (${{
          cheeseSpray.price }})
      </div>
      <!-- </div>
    <hr class="d-md-none">
    <div class="row justify-content-around"> -->
      <div class="col-10 col-md-3 mx-1 p-1 order-1 order-md-3">
        <button v-if="player.resources_available >= cheeseKnife.price && moon.interval_started == true"
          class="btn btn-danger tool-btn" @click="buyEquipment(cheeseKnife)">Cheese Knife</button>
        <button v-else class="btn btn-dark disabled tool-btn">Cheese Knife</button> + {{ cheeseKnife.power }} slice/click
        (${{
          cheeseKnife.price }})
      </div>
      <div class="col-10 col-md-3 mx-1 p-1 order-3 order-md-4">
        <button v-if="player.resources_available >= cheeseVacuum.price && moon.interval_started == true"
          class="btn btn-warning tool-btn" @click="buyEquipment(cheeseVacuum)">Cheese Vacuum</button>
        <button v-else class="btn btn-dark disabled tool-btn">Cheese Vacuum</button> + {{ cheeseVacuum.power }}
        slice/second (${{
          cheeseVacuum.price }})
      </div>
      <div class="col-10 col-md-3 mx-1 p-1 order-5 order-md-5">
        <button v-if="player.resources_available >= cheeseOil.price && moon.interval_started == true"
          class="btn btn-info tool-btn" @click="buyEquipment(cheeseOil)">Cheese Oil</button>
        <button v-else class="btn btn-dark disabled tool-btn">Cheese Oil</button> + {{ cheeseOil.power }}ms (${{
          cheeseOil.price }})
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h4 class="text-center pt-3">Player Statistics</h4>
        <p>Slices Spent: <span class="stats">{{ player.resources_spent_on_tools }}</span>
          <br>Total Moon Clicks: <span class="stats">{{ player.totalClicks }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import Pop from "../utils/Pop.js";

export default {
  setup() {

    AppState.moon = {
      interval_started: false,
      max_health: 5000,
      current_health: 5000,
      deteriorationAmount_start: 3,
      deteriorationAmount: 3,
      deteriorationRate_start: 1000,
      deteriorationRate: 1000,
      slices_lost: 0
    }

    AppState.player = {
      resources_available: 0,
      resources_extracted: 0,
      resources_spent_on_tools: 0,
      extraction_amount_click: 1,
      extraction_amount_passive: 0,
      totalClicks: 0,
      deteriorationAmount_start: 3,
      deteriorationAmount: 3,
      deteriorationRate_start: 1000,
      deteriorationRate: 1000,
      start_time: Date(),
      end_time: Date(),
      elapsed_time: 0,
    }

    function checkEndGame() {
      if (AppState.moon.current_health <= 0) {
        stopInterval()
        AppState.moon.current_health = 0
        AppState.moon.interval_started = false
        AppState.player.end_time = Date.now()
        AppState.player.elapsed_time = ((AppState.player.end_time - AppState.player.start_time) / 1000).toFixed(2)
        Pop.success("Game Over!")
      }
    }
    function stopInterval() {
      clearInterval(AppState.moon.moonInterval);
      clearInterval(AppState.player.playerInterval);
    }

    function drawStats() {
      checkEndGame()
      AppState.player.end_time = Date.now()
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
        power: 15,
        start_price: 500,
        price: 500,
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

      cheeseSpray: {
        nameID: 'cheeseSpray',
        type: 'stasis',
        power: 250,
        start_price: 100,
        price: 100,
        priceIncrementor: 20,
        quantityOwned: 0
      },

      cheeseOil: {
        nameID: 'cheeseOil',
        type: 'stasis',
        power: 1000,
        start_price: 300,
        price: 300,
        priceIncrementor: 30,
        quantityOwned: 0
      },

      startInterval() {
        this.gameSetup()
        AppState.moon.moonInterval = setInterval(() => {
          AppState.moon.current_health -= (AppState.moon.deteriorationAmount)
          AppState.moon.slices_lost += AppState.moon.deteriorationAmount
          drawStats()
        }, AppState.moon.deteriorationRate)
      },

      // To start the interval without going through gameSetup
      reStartInterval() {
        AppState.moon.moonInterval = setInterval(() => {
          AppState.moon.current_health -= (AppState.moon.deteriorationAmount)
          AppState.moon.slices_lost += AppState.moon.deteriorationAmount
          drawStats()
        }, AppState.moon.deteriorationRate)
      },

      startPlayerInterval() {
        this.gameSetup()
        AppState.player.playerInterval = setInterval(() => {
          AppState.moon.current_health -= AppState.player.extraction_amount_passive
          AppState.player.resources_available += AppState.player.extraction_amount_passive
          AppState.player.resources_extracted += AppState.player.extraction_amount_passive
          drawStats()
        }, AppState.player.deteriorationRate)
      },

      gameSetup() {
        // Moon
        AppState.moon.interval_started = true
        AppState.moon.current_health = AppState.moon.max_health
        AppState.moon.deteriorationAmount = AppState.moon.deteriorationAmount_start
        AppState.moon.deteriorationRate = AppState.moon.deteriorationRate_start
        AppState.moon.slices_lost = 0
        // Player
        AppState.player.resources_available = 0
        AppState.player.resources_extracted = 0
        AppState.player.resources_spent_on_tools = 0
        AppState.player.extraction_amount_click = 1
        AppState.player.extraction_amount_passive = 0
        AppState.player.totalClicks = 0
        AppState.player.start_time = Date.now()
        // Tools
        this.cheeseSlicer.price = this.cheeseSlicer.start_price
        this.cheeseKnife.price = this.cheeseKnife.start_price
        this.cheeseStraw.price = this.cheeseStraw.start_price
        this.cheeseVacuum.price = this.cheeseVacuum.start_price
        this.cheeseSpray.price = this.cheeseSpray.start_price
        this.cheeseOil.price = this.cheeseOil.start_price
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
        if (AppState.player.resources_available >= currentTool.price) {
          AppState.player.resources_available -= currentTool.price
          AppState.player.resources_spent_on_tools += currentTool.price
          currentTool.quantityOwned++
          currentTool.price += currentTool.priceIncrementor

          if (currentTool.type == 'click') {
            AppState.player.extraction_amount_click += currentTool.power
          } else if (currentTool.type == 'ongoing') {
            AppState.player.extraction_amount_passive += currentTool.power
          } else if (currentTool.type == 'stasis') {
            // Change the moon interval (deteriorationRate), then Stop and re-Start the interval to use the new value
            AppState.moon.deteriorationRate += currentTool.power
            clearInterval(AppState.moon.moonInterval)
            this.reStartInterval()
          }
        }
        drawStats()
      }
    };
  },
};
</script>

<style>
hr {
  color: var(--bs-danger);
  width: 85%;
  margin: auto;
}

.stats {
  /* border: none !important;
  background-color: var(--bs-body-bg);
  border-radius: 5px; */
  color: var(--bs-heading-color);
}

.moon-text {
  color: #000000;
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
  filter: drop-shadow(1px 1px 5px #000000);
  /* height: 150px; */
  max-height: 15vh;
}

.header {
  text-shadow: 2px 2px 4px #000000;
  color: var(--bs-light);
}

/* To rotate the moon */
.rotate {
  animation: rotation 16s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}

.tool-btn {
  width: 140px;
  padding: 0px 0px 0px 0px;
}
</style>