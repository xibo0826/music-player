<template>
  <div class="container">
    <section class="pic-area">
      <img src="" alt="">
    </section>
    <section class="lyrics-area"></section>
    <section class="player-area">
      <audio :src="playerURL" controls autoplay @error="playError"></audio>
    </section>
  </div>
</template>
<script>
export default {
  props: {
    isPlayFlg: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentIndex: 0,
      playerURL: '',
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
        this.playSong(val)
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
        // 歌曲获取成功
        this.$store.commit("changeSongUrl", {
          id,
          url: res.data.data[0].url,
        });
        // 设置播放器的url
        this.playerURL = res.data.data[0].url;
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
<style>
</style>
