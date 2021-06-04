<template>
  <div class="container" @click="playerClick">
    <p class="playing-name" v-show="isPlaying">正在播放: {{ playingSongName }}</p>
    <audio :src="playingSongURL" :volume="volume" :autoplay="isPlaying" ref="audioRef" @ended="playCompleted" @error="playError" @timeupdate="timeUpdated"></audio>
    <img src="@/assets/images/playlist.svg" alt="" class="btn-list" @click.stop="togglePlayList" />
    <img v-if="isPlaying" src="@/assets/images/pause.svg" alt="" class="btn-play" @click.stop="playMusic(false)" />
    <img v-else src="@/assets/images/play.svg" alt="" class="btn-play" @click.stop="playMusic(true)" />
    <img src="@/assets/images/next.svg" alt="" class="btn-next" @click.stop="nextSong()" />
    <img src="@/assets/images/prev.svg" alt="" class="btn-pre" @click.stop="preSong()" />
    <img src="@/assets/images/voice.svg" alt="" class="btn-voice" @click.stop="toggleVolumnBar" />
    <div class="volumn">
      <van-slider v-model="voice" v-show="showVolumnBar" vertical active-color="#ccc" inactive-color="skyblue" @input="changeVolume" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showVolumnBar: false,
      voice: 0,
    };
  },
  computed: {
    playingSongURL() {
      return this.$store.state.playingSong.url;
    },
    playingSongName() {
      return this.$store.state.playingSong.name;
    },
    isPlaying() {
      return this.$store.state.isPlaying;
    },
    volume: {
      get() {
        return (100 - this.voice) / 100;
      },
    },
    playList() {
      return this.$store.state.playList;
    },
  },
  watch: {
    playingSongURL(newUrl) {
      console.log(newUrl);
    },
    isPlaying(newVal) {
      if (newVal) {
        this.$refs.audioRef.play();
      } else {
        this.$refs.audioRef.pause();
      }
    },
  },
  mounted() {
    this.voice = (1 - this.$refs.audioRef.volume) * 100;
  },
  methods: {
    // 播放音乐
    playMusic(flg) {
      this.$store.commit("setPlayingFlg", flg);
    },

    // 打开/关闭音量调节
    toggleVolumnBar() {
      this.showVolumnBar = !this.showVolumnBar;
    },

    // 播放错误
    playError() {
      this.$message({ type: "danger", message: "播放失败, 自动播放下一首" });
      this.$store.commit("nextSong");
    },

    // 调节音量
    changeVolume(value) {
      this.$refs.audioRef.volume = (100 - value) / 100;
    },

    // 打开/关闭播放列表
    togglePlayList() {
      this.$store.commit("togglePlayList");
    },

    // 点击播放区域
    playerClick() {
      // 最小化表示时, 最大化显示
      this.$store.commit("setPlayerSmallFlg", false);

      // 关闭音量调节
      if (this.showVolumnBar) {
        this.showVolumnBar = false;
      }
    },

    // 播放进度
    timeUpdated() {
      this.$emit("palyTimeChanged", this.$refs.audioRef.currentTime);
    },

    // 播放结束
    playCompleted() {
      if (this.playList.length === 0) {
        this.$store.commit("setPlayingFlg", false);
      } else {
        this.$store.commit("nextSong");
      }
    },

    // 下一首
    nextSong() {
      this.$store.commit("nextSong");
    },

    // 上一首
    preSong() {
      this.$store.commit("preSong");
    },
  },
};
</script>

<style scoped>
.container {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 30px;
  background: -webkit-linear-gradient(top, #aaa, #111);
}

.btn-list {
  position: absolute;
  top: 50%;
  left: 0;
  width: 30px;
  transform: translateY(-40%);
  margin-left: 20px;
}

.btn-play {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  transform: translate(-50%, -40%);
}

.btn-next {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  transform: translate(50px, -40%);
}

.btn-pre {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  transform: translate(-85px, -40%);
}

.btn-voice {
  position: absolute;
  top: 50%;
  right: 0;
  width: 30px;
  transform: translateY(-40%);
  margin-right: 20px;
}

.volumn {
  position: absolute;
  top: -140px;
  right: 0;
  width: 30px;
  height: 150px;
  margin-right: 13px;
  z-index: 9999;
}

.playing-name {
  position: absolute;
  left: 5%;
  top: 0;
  color: skyblue;
  white-space: nowrap;
  animation: playing 30s linear infinite;
}

@keyframes playing {
  0% {
    left: 5%;
  }
  50% {
    left: 65%;
  }
  100% {
    left: 5%;
  }
}
</style>