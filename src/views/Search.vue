<template>
  <div>
    <div class="search-area">
      <van-search v-model="searchWord" placeholder="请输入搜索关键词" shape="round" @search="searchSong" @input="getSuggestions()" />
      <van-list class="search-suggestion" :class="{'search-suggestion-display' : showSuggestFlg}">
        <van-cell v-for="suggestion in searchSuggestions" :key="suggestion.keyword" :title="suggestion.keyword" @click="tagClick(suggestion.keyword)" />
      </van-list>
    </div>

    <div class="hot-word-area">
      <van-row>
        <van-col span="6" v-for="hotword in hotSearchWords" :key="hotword.first">
          <van-tag class="hot-word-tag" @click="tagClick(hotword.first)" type="primary" plain> {{hotword.first}} </van-tag>
        </van-col>
      </van-row>
    </div>
    <div class="result-area">
      <van-list>
        <van-cell v-for="song in searchResults" :key="song.id" :title="song.name">
          <template #right-icon>
            <van-icon name="play" class="play-icon" @click="playSong(song.id)" />
            <van-icon name="plus" class="play-icon" @click="addPlayList(song.id)" />
          </template>
        </van-cell>
        <!-- <van-card class="song-card" v-for="song in searchResults" :key="song.id" :title="song.name" :thumb="song.artists[0].img1v1Url">
        </van-card> -->
      </van-list>
    </div>
    
  </div>
</template>
<script>

export default {
  
  data() {
    return {
      searchWord: "",
      showSuggestFlg: false,
      hotSearchWords: [],
      searchSuggestions: [],
      searchResults: [],
      showPlayer: false,
    };
  },
  watch: {},
  created() {
    // 获取热门搜索列表
    this.getHotSearch();
  },
  methods: {
    // 热门搜索列表
    async getHotSearch() {
      const result = await this.$http.get("/search/hot");
      console.log("热门搜索列表");
      console.log(result.data.result);
      this.hotSearchWords = result.data.result.hots;
    },

    // 获取搜索建议
    async getSuggestions() {
      if (this.searchWord === "" || this.searchWord === undefined) {
        return;
      }
      const result = await this.$http.get("/search/suggest", {
        params: {
          keywords: this.searchWord,
          type: "mobile",
        },
      });
      this.searchSuggestions = result.data.result.allMatch;
      this.showSuggestFlg = true;
      console.log(this.searchSuggestions);
    },

    // 获取搜索结果
    async searchSong() {
      if (this.searchWord === "" || this.searchWord === undefined) {
        return;
      }

      this.showSuggestFlg = false;
      const result = await this.$http.get("/search", {
        params: {
          keywords: this.searchWord,
        },
      });
      console.log(result);
      this.searchResults = result.data.result.songs;
      console.log(this.searchResults);
    },

    // 热门搜索点击
    tagClick(keyword) {
      this.searchWord = keyword;
      this.searchSong();
    },

    // 播放歌曲
    playSong(id) {
      this.$store.commit("togglePlayer", true);
      this.$store.commit("setPlayingFlg", true);
      this.$store.commit("setPlayingSongId", { id });
    },

    // 加入播放列表
    addPlayList(id) {
      this.$store.commit("addPlayList", { id });
    },
  },
};
</script>
<style>
.search-area {
  position: relative;
}
.search-suggestion {
  overflow: auto;
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  height: 300px;
  display: none;
  z-index: 999;
}

.search-suggestion-display {
  display: block;
}

.hot-word-area {
  margin: 10px;
}
.hot-word-tag {
  margin: 5px;
}
.play-icon {
  margin-right: 10px;
  font-size: 16px;
  color: purple;
}
</style>
