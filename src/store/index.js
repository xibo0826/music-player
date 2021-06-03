import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playList: [],
    playingSong: {},
    showPlayer: false,
    isPlaying: false,

    showPlayList: false,
  },
  mutations: {
    addPlayList(state, song) {
      state.playList.push({
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
        Vue.set(target[0], "url", song.url)
      }
    },
    setPlayingSong(state, song) {
      Vue.set(state.playingSong, "id", song.id)

      if (song.url) {
        Vue.set(state.playingSong, "url", song.url)
      }

      if (song.pic) {
        Vue.set(state.playingSong, "pic", song.pic)
      }
    },
    togglePlayer(state, flg) {
      state.showPlayer = flg;
    },
    togglePlayList(state) {
      state.showPlayList = !state.showPlayList;
    },
    setPlayingFlg(state, flg) {
      state.isPlaying = flg;
    },
  },
  actions: {},
  modules: {},
})
