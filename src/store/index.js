import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playList: [],
    playingSong: {},
    showPlayer: false,
    isPlaying: false
  },
  mutations: {
    addPlayList(state, song) {
      state.playList.push({
        id: song.id,
        url: song.url,
      })
    },
    playNow(state, song) {
      state.playList.unshift({
        id: song.id,
        url: song.url,
      })
    },
    removePlayList(state, id) {
      state.playList = state.playList.filter(p => p.id !== id)
    },
    changeSongUrl(state, song) {
      let target = state.playList.filter(p => p.id === song.id)
      if (target.length > 0) {
        target[0].url = song.url
      }
    },
    setPlayingSongId(state, song) {
      Vue.set(state.playingSong, "id", song.id)
      Vue.set(state.playingSong, "url", song.url)
      Vue.set(state.playingSong, "pic", song.pic)
    },
    togglePlayer(state, flg) {
      state.showPlayer = flg;
    },
    setPlayingFlg(state, flg) {
      state.isPlaying = flg;
    },
  },
  actions: {},
  modules: {},
})
