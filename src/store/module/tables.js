import { getTableData } from '@/api/table.js'

export default {
  state: {
    // 所有的违章信息数组
    origin: [],
    correct: [],
    wrong: []
  },
  mutations: {
    setOrigin (state, origin) {
      state.origin = origin
    },
    setCorrect (state, correct) {
      state.correct = correct
    },
    setWrong (state, wrong) {
      state.wrong = wrong
    }
  },
  // 通过actions去调用api 重新获取信息
  actions: {
    handleOrigin ({ commit }) {
      getTableData().then((res) => {
        commit('setOrigin', res.data)
      })
    }
  }
}
