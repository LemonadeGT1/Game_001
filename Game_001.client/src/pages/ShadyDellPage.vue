<template>
  <div class="treeBG">
    <div class="container-fluid treeBlur">
      <div class="row p-2">
        <div class="col-12 text-center">
          <button v-if="sdGameStats.gameState == 'Start'" class="btn btn-dark" @click="clickStart()">Start</button>
          <button v-else-if="sdGameStats.gameState == 'Running'" class="btn btn-dark disabled">Running</button>
          <button v-else-if="sdGameStats.gameState == 'Paused'" class="btn btn-dark disabled">Paused</button>
        </div>
      </div>
      <!-- <div class="row">
        <div class="col-12 text-center"><img src="../assets/img/Tree1.svg" class="tree" @click="treeClick()"></div>
      </div> -->
      <div class="row">
        <div class="col-12" id="gridContainer"></div>
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
import { AppState } from "../AppState.js";
import { computed, onMounted } from 'vue';

export default {
  setup() {
    AppState.sdGameStats.FrameRate = 1000
    AppState.sdGameStats.gameState = "Start"

    const mapX = 34
    const mapY = 34

    // Initialize mapAll and newMapAll
    const mapAll = new Array(mapX)
    const newMapAll = new Array(mapX)
    for (let i = 0; i < mapX; i++) {
      mapAll[i] = new Array(mapY)
      newMapAll[i] = new Array(mapY)
      for (let j = 0; j < mapY; j++) {
        mapAll[i][j] = 0
        newMapAll[i][j] = 0
      }
    }

    function randomType() {
      const randomNumber = Math.floor(Math.random() * 100) + 1

      if (randomNumber < 15) { return 0 }
      else if (randomNumber < 31) { return 1 }
      else if (randomNumber < 44) { return 2 }
      else if (randomNumber < 53) { return 3 }
      else if (randomNumber < 60) { return 4 }
      else if (randomNumber < 67) { return 5 }
      else if (randomNumber < 76) { return 6 }
      else if (randomNumber < 86) { return 7 }
      else if (randomNumber < 93) { return 8 }
      else { return 9 }

      // return Math.floor(Math.random() * max - min + 1) + min
    }

    function setUpGrid() {
      const gridContainerElem = document.getElementById('gridContainer')
      if (!gridContainerElem) {
        console.log("Uh Oh! No grid container!")
      } else {
        console.log("gridContainer found!")
      }

      // SECTION - Sets up an empty grid
      for (let i = 0; i < mapX; i++) {
        let mapRow = document.createElement("div");
        mapRow.setAttribute("class", "mapRow")
        mapRow.setAttribute("id", "row_" + i)
        for (let j = 0; j < mapY; j++) {
          let mapCell = document.createElement("div")
          mapCell.setAttribute("id", i + "_" + j)
          mapCell.setAttribute("class", "mapCell")
          mapRow.appendChild(mapCell)
        }
        gridContainerElem.appendChild(mapRow)
      }

      // SECTION - Assign random values and classes
      for (let i = 0; i < mapX; i++) {
        for (let j = 0; j < mapY; j++) {
          mapAll[i][j] = randomType()
        }
      }

      // SECTION - Iterate over the map to smooth out transitions
      // This replaces the cell value with the average of the 8 surrounding cells, plus the cell itself
      for (let i = 0; i < mapX; i++) {
        for (let j = 0; j < mapY; j++) {
          let locationTotal = 0
          for (let a = -1; a <= 1; a++) {
            for (let b = -1; b <= 1; b++) {
              if (i + a >= 0 && j + b >= 0 && i + a < mapX && j + b < mapY) {
                locationTotal += mapAll[i + a][j + b]
              }
            }
          }
          let locationAverage = (locationTotal / 9)
          newMapAll[i][j] = Math.ceil(locationAverage)

          // NOTE - This works but I want to make it smoother still.
          // if (mapAll[i][j] == 8) {
          //   for (let k = -1; k <= 1; k++) {
          //     for (let l = -1; l <= 1; l++) {
          //       if (i + k >= 0 && i + k < mapY && j + l >= 0 && j + l < mapX) {
          //         newMapAll[i + k][j + l] = 7;
          //         newMapAll[i][j] = 8; // Don't overwrite the peak itself
          //       }
          //     }
          //   }
          // } else if (mapAll[i][j] == 1) {
          //   for (let k = -1; k <= 1; k++) {
          //     for (let l = -1; l <= 1; l++) {
          //       if (i + k >= 0 && i + k < mapY && j + l >= 0 && j + l < mapX) {
          //         newMapAll[i + k][j + l] = Math.floor(Math.random() * 2 + 1);
          //         newMapAll[i][j] = 1;
          //       }
          //     }
          //   }
          // } else { newMapAll[i][j] = mapAll[i][j] }
        }
      }

      // console.log('mapAll', mapAll)
      // console.log('newMapAll', newMapAll)

      // SECTION - Copy newMapAll into mapAll and set the CSS
      for (let i = 1; i < mapX - 1; i++) {
        for (let j = 1; j < mapY - 1; j++) {
          mapAll[i][j] = newMapAll[i][j]
          newMapAll[i][j] = 0
          let setType = mapAll[i][j]

          let mapCellElem = document.getElementById(i + "_" + j)
          mapCellElem.innerText = setType
          mapCellElem.classList.add("type" + setType)
        }
      }

    };
    onMounted(() => { setUpGrid() });

    return {
      sdGameStats: computed(() => AppState.sdGameStats),

      clickStart() {
        this.startInterval()
        this.sdGameStats.gameState = 'Running'
      },

      treeClick() {
        console.log('Tree Clicked')
        // SECTION - Example of how to change game state - this one toggles between running and paused
        // if (AppState.sdGameStats.gameState === "Running") {
        //   AppState.sdGameStats.gameState = "Paused"
        //   // this.stopInterval()
        // } else {
        //   AppState.sdGameStats.gameState = "Running"
        //   // this.startInterval()
        // }
      },

      // SECTION - This is the main game loop
      startInterval() {
        // this.gameSetup()
        AppState.sdGameStats.interval = setInterval(() => {
          if (AppState.sdGameStats.gameState === "Running") {
            console.log("Game Running ...")
            // Calculations go here
          }
          else if (AppState.sdGameStats.gameState === "Paused") {
            console.log("Game Paused ...")
            // What can go on while the game is paused? Just a Pop Confirm?
            // Do not do regular game increments
          }
          else if (AppState.sdGameStats.gameState === "Start") {
            console.log("Game Start ...")
            // Push the Start button
          }
          else {
            console.log("AppState.sdGameStats.gameState: ", AppState.sdGameStats.gameState)
          }
        }, AppState.sdGameStats.FrameRate)
      },

      stopInterval() {
        clearInterval(AppState.sdGameStats.interval)
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
  backdrop-filter: blur(0px);
}

.tree {
  height: 200px;
}

.groundBG {
  background-color: var(--bs-dark);
  color: var(--bs-light)
}

#gridContainer {
  margin-bottom: 10px;
  text-align: center;
  align-items: center;
}

.mapRow {
  align-items: start;
  clear: both;
}

.mapCell {
  /* border-right: 1px solid #999999;
  border-bottom: 1px solid #999999; */
  cursor: default;
  height: 12px;
  width: 12px;
  float: left;
  font-size: .65em;
}

/* .mapCell:first-child {
  border-left: 1px solid #999999;
} */

.mapCell:hover {
  background-color: #99999999;
  color: black;
}

/* #row_0>.mapCell {
  border-top: 1px solid #999999;
} */

.type1 {
  background-color: #4d7fd6;
  /*#5aa528;*/
  color: #4d7fd6;
}

.type2 {
  background-color: #91b93c;
  color: #91b93c;
}

.type3 {
  background-color: #afc850;
  color: #afc850;
}

.type4 {
  background-color: #ffd787;
  color: #ffd787;
}

.type5 {
  background-color: #f5aa5a;
  color: #f5aa5a;
}

.type6 {
  background-color: #af7846;
  color: #af7846;
}

.type7 {
  background-color: #7d5528;
  color: #7d5528;
}

.type8 {
  background-color: #e8e8f4;
  /*#6e4619;*/
  color: #e8e8f4;
}

.type9 {
  background-color: #000000;
  color: #000000;
}
</style>