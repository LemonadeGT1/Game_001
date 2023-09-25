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
import { AppState } from "../AppState.js";
import { computed } from 'vue';

export default {
  setup() {
    AppState.sdGameStats.FrameRate = 250
    AppState.sdGameStats.gameState = "Start"

    return {
      sdGameStats: computed(() => AppState.sdGameStats),

      clickStart() {
        this.startInterval()
        this.sdGameStats.gameState = 'Running'
        // if (AppState.sdGameStats.gameState === "Running") {
        //   AppState.sdGameStats.gameState = "Paused"
        //   this.stopInterval()
        // } else {
        //   AppState.sdGameStats.gameState = "Running"
        //   this.startInterval()
        // }
      },

      treeClick() {
        console.log('Tree Clicked')
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
</style>