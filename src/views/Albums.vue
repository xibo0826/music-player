<template>
  <div v-if="initFlg">
    <section class="img-area">
      <img :src="albumInfo.blurPicUrl" alt="">
      <h3>歌手: {{ albumInfo.artist.name }}</h3>
      <h3>专辑名: {{ albumInfo.name }} </h3>
      <p>专辑介绍:</p>
      <p>{{ albumInfo.description }}</p>
    </section>
    <van-divider>歌曲列表</van-divider>
    <section class="song-list">
      <van-list>
        <van-cell v-for="song in songs" :key="song.id" :title="song.name" icon="music-o">
          <template #right-icon>
            <van-icon name="play" class="play-icon" size="20" @click="playSong(song.id, song.name, song.coverImgUrl)" style="margin-right: 10px;" />
            <van-icon name="plus" class="play-icon" size="20" @click="addPlayList(song.id, song.name, song.coverImgUrl)" />
          </template>
        </van-cell>
      </van-list>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      initFlg: false,
      albumInfo: {},
      songs: [],
    };
  },
  computed: {
    albumId() {
      return this.$route.params.albumId;
    },
  },
  created() {
    // 获取专辑数据
    this.getAlbumData();
  },
  mounted() {},
  methods: {
    // 获取专辑数据
    async getAlbumData() {
      const { data: result } = await this.$http.get(
        `/album?id=${this.albumId}`
      );
      this.albumInfo = result.album;
      this.songs = result.songs;

      this.initFlg = true;
    },
    // 播放歌曲
    playSong(id, name, pic) {
      this.$store.commit("togglePlayer", true);
      this.$store.commit("setPlayingFlg", true);
      this.$store.commit("setPlayingSong", { id, name, pic });
    },

    // 加入播放列表
    addPlayList(id, name, pic) {
      this.$store.commit("addPlayList", { id, name, pic });
      this.$message({ type: "success", message: "添加播放列表成功!" });
    },
  },
};
</script>
<style scoped>

.img-area {
  overflow: hidden;
  height: 190px;
  text-overflow: ellipsis;
}

.img-area img {
  float: left;
  height: 190px;
}

</style>
