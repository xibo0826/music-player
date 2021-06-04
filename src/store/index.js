import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playList: [],
    currentPlayIdx: -1,
    playingSong: {},
    showPlayer: false,
    isPlaying: false,
    showPlayList: false,
    playerSmallFlg: true,
  },
  mutations: {
    addPlayList(state, song) {
      state.playList.push({
        id: song.id,
        name: song.name,
        url: song.url,
      })
    },
    setPlayList(stage, playlist) {
      stage.playList = [...playlist];
    },
    removePlayList(state, id) {
      state.playList = state.playList.filter((p) => p.id !== id)
    },

    setCurrentPlayIdx(state, idx) {
      state.currentPlayIdx = idx
    },

    // 下一首
    nextSong(state) {
      if (state.playList.length > state.currentPlayIdx + 1) {
        state.currentPlayIdx += 1
      } else {
        state.currentPlayIdx = 0
      }
      const nextSong = state.playList[state.currentPlayIdx]

      Vue.set(state.playingSong, 'id', nextSong.id)

      if (nextSong.url) {
        Vue.set(state.playingSong, 'url', nextSong.url)
      }

      if (nextSong.pic) {
        Vue.set(state.playingSong, 'pic', nextSong.pic)
      }

      if (nextSong.name) {
        Vue.set(state.playingSong, 'name', nextSong.name)
      }
    },

    // 上一首
    preSong(state) {
      if (state.playList.length <= 1 || state.currentPlayIdx === 0) {
        vm.$message({ type: 'danger', message: '没有上一首' })
        return;
      }
      state.currentPlayIdx -= 1
      const preSong = state.playList[state.currentPlayIdx]
      Vue.set(state.playingSong, 'id', preSong.id)

      if (preSong.url) {
        Vue.set(state.playingSong, 'url', preSong.url)
      }

      if (preSong.pic) {
        Vue.set(state.playingSong, 'pic', preSong.pic)
      }

      if (preSong.name) {
        Vue.set(state.playingSong, 'name', preSong.name)
      }
    },

    changeSongUrl(state, song) {
      let target = state.playList.filter((p) => p.id === song.id)
      if (target.length > 0) {
        Vue.set(target[0], 'url', song.url)
      }
    },
    setPlayingSong(state, song) {
      Vue.set(state.playingSong, 'id', song.id)

      if (song.url) {
        Vue.set(state.playingSong, 'url', song.url)
      }

      if (song.pic) {
        Vue.set(state.playingSong, 'pic', song.pic)
      }

      if (song.name) {
        Vue.set(state.playingSong, 'name', song.name)
      }

      const target = state.playList.find(p => p.id === song.id);
      const idx = state.playList.indexOf(target);
      if (!target) {
        state.playList.splice(idx, 0, song);
        state.currentPlayIdx = idx + 1;
      } else {
        state.currentPlayIdx = idx;
      }
    },
    togglePlayer(state, flg) {
      state.showPlayer = flg
    },
    togglePlayList(state) {
      state.showPlayList = !state.showPlayList
    },
    setPlayingFlg(state, flg) {
      state.isPlaying = flg
    },
    setPlayerSmallFlg(state, flg) {
      state.playerSmallFlg = flg
    },
  },
  actions: {},
  modules: {},
})
