<template>
  <div class="container">
    <section class="pic-area" v-show="!smallPlayerFlg">
      <img src="@/assets/images/playing-pic.jpg" alt="">
    </section>
    <section class="lyrics-area" v-show="!smallPlayerFlg">
      <div ref="lyricListRef">
        <p class="lyric" v-for="(lyric, idx) in lyricTimeList" :key="lyric.time" :class="idx === lyricIdx ? 'current':''">
          {{ lyric.content }}
        </p>
      </div>
    </section>
    <section class="player-area">
      <player @palyTimeChanged="palyTimeChanged"></player>
    </section>
  </div>
</template>
<script>
import player from "./Player.vue";
export default {
  components: {
    player,
  },
  data() {
    return {
      lyricTimeList: [],
      lyricIdx: 0,
      lyricScaleY: 0,
    };
  },
  computed: {
    playingSongId() {
      return this.$store.state.playingSong.id;
    },
    playingSongImg() {
      return this.$store.state.playingSong.pic;
    },
    smallPlayerFlg() {
      return this.$store.state.playerSmallFlg
    },
    picURL() {
      if (this.$store.state.playingSong.pic) {
        return this.$store.state.playingSong.pic;
      } else {
        return "@/assets/images/playing-pic.jpg"
      }
    },
    playList() {
      
    }
  },
  watch: {
    playingSongId(val, old) {
      if (old !== val) {
        this.playSong(val);
      }
    },
    lyricIdx(val) {
      if (val > 5) {
        this.lyricScaleY -= 30;
        this.$refs.lyricListRef.style.transform =
          "translateY(" + this.lyricScaleY + "px)";
        this.$refs.lyricListRef.style.transition = "transform 2s linear";
      }
    },
  },
  methods: {
    async playSong(id) {
      if (id === "") {
        return;
      }

      // 检查歌曲时候可以播放
      if (!this.checkMusicIsOK(id)) {
        this.$message({type: 'danger', message: "暂无版权,无法播放!"});
        return;
      }

      this.lyricScaleY = 0;
      this.lyricTimeList.splice(0, this.lyricTimeList.length);
      this.$refs.lyricListRef.style.transform = "translateY(0)";

      // 获取歌曲URL
      this.getMusicURL(id);
      // 获取歌词
      this.getMusicLyric(id);
    },

    // 检查歌曲时候可以播放
    async checkMusicIsOK(id) {
      const { data: res} = await this.$http.get(`/check/music?id=${id}`);
      console.log(res);
      return res.success;
    },

    // 获取歌曲URL
    async getMusicURL(id) {
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
        this.$store.commit("nextSong");
      }
    },

    // 获取歌词
    async getMusicLyric(id) {
      const { data: result } = await this.$http.get(`/lyric?id=${id}`);

      if (!result.lrc) {
        // 获取歌词失败
        this.lyricTimeList.push({time: 0.0, content: '无法获取歌词'});
        return;
      }

      const lyricArr = result.lrc.lyric.split("\n");
      // 解析歌词 => [00:00.000] 作词 : XXX
      lyricArr.map((p) => {
        let time = "";
        let content = "";
        const idx = p.indexOf("]");
        if (idx > 0) {
          const timeArr = p.substring(1, idx - 1).split(":");
          const mSeconds = timeArr[1].split(".");
          time = parseFloat(
            parseInt(timeArr[0]) * 60 +
              parseInt(mSeconds[0]) +
              "." +
              mSeconds[1]
          );
          content = p.substring(idx + 1, p.length);
        } else {
          content = p;
        }
        const obj = { time, content };
        this.lyricTimeList.push(obj);
      });
      console.log(this.lyricTimeList);
    },

    // 播放时间变化
    palyTimeChanged(currentTime) {
      const target = this.lyricTimeList.find(({ time }) => time > currentTime);
      this.lyricIdx = this.lyricTimeList.indexOf(target) - 1;
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

.pic-area img {
  width: 100%;
}

.lyrics-area {
  overflow: hidden;
  flex-grow: 1;
  max-height: 400px;
  padding: 20px;
  background: #444;
}

.lyric {
  overflow: hidden;
  height: 30px;
  color: skyblue;
  font-size: 20px;
  font-style: italic;
  text-overflow: ellipsis;
}

.current {
  color: pink;
}

.player-area {
  width: 100%;
  height: 80px;
  background: #555;
}
</style>
