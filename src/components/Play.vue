<template>
  <div class="container">
    <section class="pic-area">
      123
      <img src="" alt="">
    </section>
    <section class="lyrics-area">123</section>
    <section class="player-area">
      <player></player>
    </section>
  </div>
</template>
<script>
import player from './Player.vue'
export default {
  components: {
    player
  },
  props: {
    isPlayFlg: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    playingSongId() {
      return this.$store.state.playingSong.id;
    },
  },
  watch: {
    playingSongId(val, old) {
      if (old !== val) {
        this.playSong(val);
      }
    },
  },
  methods: {
    async playSong(id) {
      if (id === "") {
        return;
      }
      const res = await this.$http.get(`/song/url?id=${id}`);
      if (res.data.data.length > 0) {
        console.log(res);
        // 歌曲获取成功
        this.$store.commit("setPlayingSong", {
          id,
          url: res.data.data[0].url,
        });
        this.$store.commit("setPlayingFlg", true);
      } else {
        this.$message({ type: "danger", message: "播放失败" });
      }
    },

    playError() {
      this.$message({ type: "danger", message: "播放失败" });
    },
  },
};
</script>
<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.pic-area {
  height: 200px;
  background: skyblue;
}

.lyrics-area {
  flex-grow: 1;
}


.player-area {
  width: 100%;
  height: 160px;
}
</style>
