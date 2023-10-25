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

    const mapX = 40
    const mapY = 40

    function randomType(min, max) {
      return Math.floor(Math.random() * 8) + min
    }

    function setUpGrid() {
      const gridContainerElem = document.getElementById('gridContainer')
      if (!gridContainerElem) {
        console.log("Uh Oh! No grid container!")
      } else {
        console.log("gridContainer found!")
      }

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
      // SET Random values
      for (let i = 0; i < mapX; i++) {
        for (let j = 0; j < mapY; j++) {
          let mapCellElem = document.getElementById(i + "_" + j)
          let setType = randomType(1, 8)
          mapCellElem.innerText = setType
          mapCellElem.classList.add("type" + setType)
        }
      }
    }

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
  height: 15px;
  width: 15px;
  float: left;
  font-size: .65em;
}

/* .mapCell:first-child {
  border-left: 1px solid #999999;
} */

.mapCell:hover {
  background-color: #99999999;
}

/* #row_0>.mapCell {
  border-top: 1px solid #999999;
} */

.type1 {
  background-color: #5aa528;
}

.type2 {
  background-color: #91b93c;
}

.type3 {
  background-color: #afc850;
}

.type4 {
  background-color: #ffd787;
}

.type5 {
  background-color: #f5aa5a;
}

.type6 {
  background-color: #af7846;
}

.type7 {
  background-color: #7d5528;
}

.type8 {
  background-color: #6e4619;
}
</style>