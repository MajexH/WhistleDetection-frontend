export default {
  state: {
    // 当前table点击的row
    row: null
  },
  mutations: {
    setRow(state, row) {
      state.row = row
    }
  }
}
