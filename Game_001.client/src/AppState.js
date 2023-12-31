import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  // Moon Miner II
  moon: {},
  player: {},
  tools: {},

  // Shady Dell
  sdGameStats: {}
})
