<template>
  <div class="container">
    <audio
      :src="playingSongURL"
      ref="audioRef"
      controls
      @error="playError"
    ></audio>
    <img src="@/assets/images/playlist.svg" alt="" class="btn-list" @click="togglePlayList"/>
    <img
      v-if="isPlaying"
      src="@/assets/images/pause.svg"
      alt=""
      class="btn-play" 
      @click="playMusic(false)"
    />
    <img
      v-else
      src="@/assets/images/play.svg"
      alt=""
      class="btn-play"
      @click="playMusic(true)"
    />
    <img src="@/assets/images/next.svg" alt="" class="btn-next" />
    <img src="@/assets/images/prev.svg" alt="" class="btn-pre" />
    <img
      src="@/assets/images/voice.svg"
      alt=""
      class="btn-voice"
      @click="toggleVolumnBar"
    />
    <div class="volumn">
      <van-slider
        v-model="voice"
        v-show="showVolumnBar"
        vertical
        active-color="#ccc"
        inactive-color="skyblue"
        @change="changeVolume"
      />
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
    isPlaying() {
      return this.$store.state.isPlaying;
    },
  },
  watch: {
    isPlaying(newVal) {
        console.log(111);
      if (newVal) {
        this.$refs.audioRef.play();
      } else {
        this.$refs.audioRef.pause();
      }
    },
  },
  methods: {
    playMusic(flg) {
      this.$store.commit("setPlayingFlg", flg);
    },
    toggleVolumnBar() {
      this.showVolumnBar = !this.showVolumnBar;
    },
    playError() {},
    changeVolume(value) {
        this.$refs.audioRef.volume = value;
    },
    togglePlayList() {
        this.$store.commit("togglePlayList");
    }
  },
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 30px;
  background: #ddd;
  border-radius: 20px;
}

.btn-list {
  position: absolute;
  top: 50%;
  left: 0;
  width: 30px;
  transform: translateY(-50%);
  margin-left: 20px;
}

.btn-play {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  transform: translate(-50%, -50%);
}

.btn-next {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  transform: translate(50px, -50%);
}

.btn-pre {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  transform: translate(-85px, -50%);
}

.btn-voice {
  position: absolute;
  top: 50%;
  right: 0;
  width: 30px;
  transform: translateY(-50%);
  margin-right: 20px;
}

.volumn {
  position: absolute;
  top: -140px;
  right: 0;
  width: 30px;
  height: 150px;
  margin-right: 13px;
}
</style>