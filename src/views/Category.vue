<template>
  <div class="container">
    <van-divider>全部分类</van-divider>
    <section class="category-area">
      <van-row type="flex" justify="space-between">
        <van-col span="6" v-for="cat in categories" :key="cat.name">
          <van-tag class="category-tag" @click="tagClick(cat.name)" type="warning" :plain="!cat.plain"> {{cat.name}} </van-tag>
        </van-col>
      </van-row>
    </section>
    <van-divider>歌曲列表</van-divider>
    <section class="music-list-area">
        <van-list finished-text="没有更多了">
        <van-card class="song-card" v-for="item in musicList" :key="item.id" :title="item.name" :desc="item.description" :thumb="item.coverImgUrl">
          <template #tags>
            <van-tag class="song-tag" v-for="tag in item.tags" :key="tag" type="warning" style="margin-right: 10px;" >{{ tag }}</van-tag>
          </template>
          <template #footer>
            <van-icon name="play" class="play-icon" size="20" @click="playSong(item.id, item.name, item.coverImgUrl)" style="margin-right: 10px;" />
            <van-icon name="plus" class="play-icon" size="20" @click="addPlayList(item.id, item.name, item.coverImgUrl)" />
        </template>
        </van-card>
      </van-list>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categories: [],
      musicList: [],
    };
  },
  created() {
    // 获取分类数据
    this.getCategory();
    // 获取全部歌曲列表
    this.getMusicList();
  },
  methods: {
    // 获取分类数据
    async getCategory() {
      const { data: result } = await this.$http.get("/playlist/catlist");
      this.categories = result.sub.map((p) => {
        p.plain = false;
        return p;
      });
    },

    // 分类选择/选择取消
    tagClick(name) {
      let target = this.categories.find((p) => p.name === name);
      target.plain = !target.plain;
      this.getMusicList();
    },

    // 查询歌曲列表
    async getMusicList() {
      const selectedCat = this.categories.filter((p) => p.plain === true).map(p => p.category);
      const selectedCatStr = Array.from(new Set(selectedCat)).join(',');
      const { data: result } = await this.$http.get(`/top/playlist?limit=30&category=${selectedCatStr}`);
      this.musicList = result.playlists;
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
<style>

.category-area {
  overflow: auto;
  height: 110px;
}

.category-tag {
  margin: 5px;
  padding: 5px;
}

.van-card__footer {
    margin-top: -20px;
}

.music-list-area {
    overflow: auto;
    height: 400px;
}
</style>
