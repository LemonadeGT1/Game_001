<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h4>Conway's Game of Life</h4>
      </div>
      <div class="col-12">
        <div id="gridContainer">
        </div>

        <div class="controls">
          <button id="start" class="btn btn-dark mx-1"><span>Start</span></button>
          <button id="clear" class="btn btn-dark mx-1"><span>Clear</span></button>
          <button id="random" class="btn btn-dark mx-1"><span>Random</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";

export default {
  setup() {

    // SECTION - Begin Code
    // Adapted from RBSpatz's version on codepen.io/RBSpatz/pen/rLyNLb

    const gridRows = 40;
    const gridCols = 40;

    let playing = false;

    let grid = new Array(gridRows);
    let nextGrid = new Array(gridRows);

    let timer;
    const reproductionTime = 100;

    function initializeGrids() {
      for (let i = 0; i < gridRows; i++) {
        grid[i] = new Array(gridCols);
        nextGrid[i] = new Array(gridCols);
      }
    }

    function resetGrids() {
      for (let i = 0; i < gridRows; i++) {
        for (let j = 0; j < gridCols; j++) {
          grid[i][j] = 0;
          nextGrid[i][j] = 0;
        }
      }
    }

    function copyAndResetGrid() {
      for (let i = 0; i < gridRows; i++) {
        for (let j = 0; j < gridCols; j++) {
          grid[i][j] = nextGrid[i][j];
          nextGrid[i][j] = 0;
        }
      }
    }

    // Initialize
    function initialize() {
      createTable();
      initializeGrids();
      resetGrids();
      setupControlButtons();
    }

    // Lay out the board
    function createTable() {
      let gridContainer = document.getElementById('gridContainer');
      if (!gridContainer) {
        // Throw error
        console.error("Problem: No div for the grid table!");
      }
      let table = document.createElement("table");

      for (let i = 0; i < gridRows; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < gridCols; j++) {//
          let cell = document.createElement("td");
          cell.setAttribute("id", i + "_" + j);
          cell.setAttribute("class", "dead");
          // SECTION - this is so we can mark the center lines
          if (i == j) {
            cell.setAttribute("class", "marker")
          }
          if (i + j == gridRows - 1) {
            cell.setAttribute("class", "marker")
          }
          cell.onclick = cellClickHandler;
          tr.appendChild(cell);
          cell.innerText = 0;
        }
        table.appendChild(tr);
      }
      gridContainer.appendChild(table);
    }

    function cellClickHandler() {
      let rowcol = this.id.split("_");
      let row = rowcol[0];
      let col = rowcol[1];

      let classes = this.getAttribute("class");
      if (classes.indexOf("live") > -1) {
        this.setAttribute("class", "dead");
        grid[row][col] = 0;
      }
      else {
        this.setAttribute("class", "live");
        grid[row][col] = 1;
      }
      // console.log(`cellClickHandler grid[${row}][${col}]`, grid[row][col], classes)
      updateView();
    }

    function updateView() {
      for (let i = 0; i < gridRows; i++) {
        for (let j = 0; j < gridCols; j++) {
          let cell = document.getElementById(i + "_" + j);
          if (grid[i][j] == 1) {
            if (cell.innerText == 1) {
              cell.setAttribute("class", "live1");
            } else if (cell.innerText == 2) {
              cell.setAttribute("class", "live2");
            } else if (cell.innerText == 3) {
              cell.setAttribute("class", "live3");
            } else if (cell.innerText == 4) {
              cell.setAttribute("class", "live4");
            } else if (cell.innerText == 5) {
              cell.setAttribute("class", "live5");
            } else if (cell.innerText == 6) {
              cell.setAttribute("class", "live6");
            } else if (cell.innerText == 7) {
              cell.setAttribute("class", "live7");
            } else if (cell.innerText == 8) {
              cell.setAttribute("class", "live8");
            }
            else {
              cell.setAttribute("class", "live");
            }
          } else if (grid[i][j] == 0) {
            if (cell.innerText == 0) {
              cell.setAttribute("class", "dead");
            } else if (cell.innerText == 1) {
              cell.setAttribute("class", "dead1");
            } else if (cell.innerText == 2) {
              cell.setAttribute("class", "dead2");
            } else if (cell.innerText == 3) {
              cell.setAttribute("class", "dead3");
            } else if (cell.innerText == 4) {
              cell.setAttribute("class", "dead4");
            } else if (cell.innerText == 5) {
              cell.setAttribute("class", "dead5");
            } else if (cell.innerText == 6) {
              cell.setAttribute("class", "dead6");
            } else if (cell.innerText == 7) {
              cell.setAttribute("class", "dead7");
            } else if (cell.innerText == 8) {
              cell.setAttribute("class", "dead8");
            }
          }
        }
      }
    }

    function setupControlButtons() {
      // button to start
      let startButton = document.getElementById('start');
      startButton.onclick = startButtonHandler;

      // button to clear
      let clearButton = document.getElementById('clear');
      clearButton.onclick = clearButtonHandler;

      // button to set random initial state
      let randomButton = document.getElementById("random");
      randomButton.onclick = randomButtonHandler;
    }

    function randomButtonHandler() {
      if (playing) return;
      clearButtonHandler();
      for (let i = 0; i < gridRows; i++) {
        for (let j = 0; j < gridCols; j++) {
          let isLive = Math.round(Math.random());
          if (isLive == 1) {
            let cell = document.getElementById(i + "_" + j);
            cell.setAttribute("class", "live");
            grid[i][j] = 1;
          }
        }
      }
    }

    // clear the grid
    function clearButtonHandler() {
      console.log("Clear the game: stop playing, clear the grid");

      playing = false;
      let startButton = document.getElementById('start');
      startButton.innerHTML = "Start";
      clearTimeout(timer);

      let cellsList = document.getElementsByClassName("live");
      // convert to array first, otherwise, you're working on a live node list
      // and the update doesn't work!
      let cells = [];
      for (let i = 0; i < cellsList.length; i++) {
        cells.push(cellsList[i]);
      }

      for (let i = 0; i < cells.length; i++) {
        cells[i].setAttribute("class", "dead");
      }
      resetGrids();
    }

    // start/pause/continue the game
    function startButtonHandler() {
      if (playing) {
        console.log("Pause the game");
        playing = false;
        this.innerHTML = "Continue";
        clearTimeout(timer);
      } else {
        console.log("Continue the game");
        playing = true;
        this.innerHTML = "Pause";
        play();
      }
    }

    // run the life game
    function play() {
      computeNextGen();

      if (playing) {
        timer = setTimeout(play, reproductionTime);
      }
    }

    function computeNextGen() {
      for (let i = 0; i < gridRows; i++) {
        for (let j = 0; j < gridCols; j++) {
          applyRules(i, j);
        }
      }

      // copy NextGrid to grid, and reset nextGrid
      copyAndResetGrid();
      // copy all 1 values to "live" in the table
      updateView();
    }

    // RULES
    // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
    // Any live cell with two or three live neighbours lives on to the next generation.
    // Any live cell with more than three live neighbours dies, as if by overcrowding.
    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

    // SECTION - NEW RULES - Still based on number of live neighbors
    // Cells age so they may stay 'alive' beyond a single tick
    // 0 = dead; 1-8 = alive
    // 1. Any live cell with fewer than two live neighbors looses 1 life
    // 2. Any live cell with two or three live neighbors gains 1 life (continues to live)
    // 2.1 Any dead cell with exactly three live neighbors becomes a live cell (Covered by rule 2)
    // 3. Any live cell with more than three live neighbors looses 1 life
    // 4. Any cell with 8 life, if give more, will die (set to 0)
    // 
    // FIXME - functions applyRules and countNeighbors must be updated to reflect these rules
    // 
    // function applyRules(row, col) {
    //   let numNeighbors = countNeighbors(row, col);
    //   if (grid[row][col] == 1) {
    //     if (numNeighbors < 2) {
    //       nextGrid[row][col] = 0;
    //     } else if (numNeighbors == 2 || numNeighbors == 3) {
    //       nextGrid[row][col] = 1;
    //     } else if (numNeighbors > 3) {
    //       nextGrid[row][col] = 0;
    //     }
    //   } else if (grid[row][col] == 0) {
    //     if (numNeighbors == 3) {
    //       nextGrid[row][col] = 1;
    //     }
    //   }
    // }

    function applyRules(row, col) {
      let numNeighbors = countNeighbors(row, col);
      if (grid[row][col] >= 1) {
        if (numNeighbors < 2) {
          nextGrid[row][col] = 0;
        } else if (numNeighbors == 2 || numNeighbors == 3) {
          nextGrid[row][col] = 1;
        } else if (numNeighbors > 3) {
          nextGrid[row][col] = 0;
        }
      } else if (grid[row][col] == 0) {
        if (numNeighbors == 3) {
          nextGrid[row][col] = 1;
        }
      }
      // console.log('grid[', row, '][', col, '] ', grid[row][col], '\n nextGrid', nextGrid[row][col], '\n numNeighbors ', numNeighbors)
    }

    function countNeighbors(row, col) {
      let count = 0;
      let cell = document.getElementById(row + "_" + col)
      if (row - 1 >= 0) {
        if (grid[row - 1][col] == 1) count++;
      }
      if (row - 1 >= 0 && col - 1 >= 0) {
        if (grid[row - 1][col - 1] == 1) count++;
      }
      if (row - 1 >= 0 && col + 1 < gridCols) {
        if (grid[row - 1][col + 1] == 1) count++;
      }
      if (col - 1 >= 0) {
        if (grid[row][col - 1] == 1) count++;
      }
      if (col + 1 < gridCols) {
        if (grid[row][col + 1] == 1) count++;
      }
      if (row + 1 < gridRows) {
        if (grid[row + 1][col] == 1) count++;
      }
      if (row + 1 < gridRows && col - 1 >= 0) {
        if (grid[row + 1][col - 1] == 1) count++;
      }
      if (row + 1 < gridRows && col + 1 < gridCols) {
        if (grid[row + 1][col + 1] == 1) count++;
      }

      if (grid[row][col] != 1) {
        cell.innerText = count;
        // console.log('cell: ', cell)
      }
      // console.log(`grid[${row}][${col}] ${grid[row][col]},\n count: ${count}`)
      cell.innerText = count;
      return count;
    }

    // Start everything
    onMounted(() => { initialize() });

    // 
    // SECTION - End

    return {};
  },
};
</script>

<style>
#gridContainer {
  padding-bottom: 10px;
}

table {
  border-spacing: 0;
  /* border: solid 1px #ceb8b7; */
}

td {
  cursor: crosshair;
  width: 15px;
  height: 15px;
  border: solid 1px #ceb8b7;
  box-shadow: 1px 1px 1px #aa9493;
  font-size: .5em;
  text-align: center;
}

td.dead {
  background-color: transparent;
}

td.live {
  background-color: var(--bs-danger);
  border-radius: 20px;
}

td.live1 {
  background-color: #FF0000FF;
  border-radius: 20px;
}

td.live2 {
  background-color: #FF0000CC;
  border-radius: 20px;
}

td.live3 {
  background-color: #FF000099;
  border-radius: 20px;
}

td.live4 {
  background-color: #FF000066;
  border-radius: 20px;
}

td.live5 {
  background-color: #FF000033;
  border-radius: 20px;
}

td.live6 {
  background-color: #FF000000;
  border-radius: 20px;
}

td.live7 {
  background-color: #FF003333;
  border-radius: 20px;
}

td.live8 {
  background-color: #FF006666;
  border-radius: 20px;
}



td.dead1 {
  background-color: #0099FF11;
}

td.dead2 {
  background-color: #0099FF33;
}

td.dead3 {
  background-color: #0099FF55;
}

td.dead4 {
  background-color: #0099FF77;
}

td.dead5 {
  background-color: #0099FF99;
}

td.dead6 {
  background-color: #0099FFBB;
}

td.dead7 {
  background-color: #0099FFDD;
}

td.dead8 {
  background-color: #0099FFFF;
}

.marker {
  background-color: #aaaaaa;
}
</style>