<template>
  <div id="app">
    <van-nav-bar title="Music player" class="header" fixed placeholder @click-left="leftClick">
      <template #left>
        <van-icon name="bars" size="20px" />
      </template>
    </van-nav-bar>
    <router-view></router-view>
    <van-popup ref="playerRef" v-model="showPlayerView" :class="playerClass" position="bottom" :overlay="false" :closeable="!smallPlayerFlg" @click-close-icon="closePlayerView">
      <player></player>
    </van-popup>
    <van-tabbar v-model="currentTab" class="tabbar" active-color="red" inactive-color="skyblue" @change="changeTab">
      <van-tabbar-item name="Home" replace to="/home" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item name="Category" replace to="/category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item name="Search" replace to="/search" icon="search">搜索</van-tabbar-item>
      <!-- <van-tabbar-item name="play" replace to="/play" icon="play">播放</van-tabbar-item> -->
    </van-tabbar>

    <van-popup v-model="showPlayListView" class="play-list" position="right" :closeable="true">
      <van-icon name="star-o" class="save-btn" size="20px" @click="savePlayList" />
      <div class="playlist-head">
        <h3>播放列表</h3>
      </div>
      <van-list>
        <van-cell v-for="(item, idx) in playList" class="playlist-body" :key="item.name" :class="idx===playlistIdx ? 'playing':''">
          <template #title>
            <span class="custom-title">{{item.name}}</span>
            <img src="@/assets/images/playing.gif" alt="" v-if="idx===playlistIdx">
          </template>
          <template #right-icon>
            <van-icon name="cross" size="20px" @click="deletePlayList(item.id)" style="margin-right: 10px;"/>
            <van-icon name="play-circle" @click="playMusic(item.id, item.name, idx)" size="20px" />
          </template>
        </van-cell>
      </van-list>
    </van-popup>
  </div>
</template>

<script>
import player from "./components/Play.vue";
export default {
  components: {
    player,
  },
  data() {
    return {
      playerClass: "playing-small",
    };
  },
  computed: {
    // 打开播放页面
    showPlayerView() {
      return this.$store.state.showPlayer;
    },

    // 打开播放列表页面
    showPlayListView: {
      get() {
        return this.$store.state.showPlayList;
      },
      set(flg) {
        this.$store.commit("togglePlayList");
      },
    },

    playList() {
      return this.$store.state.playList;
    },

    smallPlayerFlg() {
      return this.$store.state.playerSmallFlg;
    },

    isPlaying() {
      return this.$store.state.isPlaying;
    },

    playlistIdx() {
      return this.$store.state.currentPlayIdx;
    },

    currentTab() {
      return this.$route.name;
    } 
  },
  watch: {
    smallPlayerFlg(smallFlg) {
      if (smallFlg) {
        this.playerClass = "playing-small";
      } else {
        this.playerClass = "playing-full";
      }
    },
  },
  methods: {
    changeTab(tab) {
      console.log(tab);
      this.currentTab = tab;
    },

    leftClick() {
      this.$store.commit("togglePlayList");
    },

    closePlayerView() {
      // 正在播放, 最小化显示
      this.$store.commit("setPlayerSmallFlg", true);
    },

    playMusic(id, name, idx) {
      this.$store.commit("togglePlayer", true);
      this.$store.commit("setPlayingFlg", true);
      this.$store.commit("setPlayingSong", { id, name });
      this.$store.commit("setCurrentPlayIdx", idx);
    },

    // 保存播放列表
    savePlayList() {
      const stringPlayList = JSON.stringify(this.playList)
      localStorage.setItem("playlist", stringPlayList);
      this.$message({ type: 'success', message: '播放列表保存成功'});
    },

    deletePlayList(id) {
      this.$store.commit("removePlayList", id);
      this.savePlayList();
    }
  },
  created() {
    let playlistStr = localStorage.getItem("playlist");
    if (playlistStr !== "") {
      const playlist = JSON.parse(playlistStr);
      this.$store.commit("setPlayList", playlist)
    }
  },
};
</script>

<style scope="scoped">
.header {
  top: 0;
  left: 0;
  width: 100%;
}
.van-nav-bar--fixed {
  background: -webkit-linear-gradient(right, #bbb, #111);
}

.van-nav-bar__title {
  font-size: 20px !important;
  font-weight: 700 !important;
  font-style: italic !important;
  color: skyblue !important;
}

.van-tabbar-item--active {
  background: -webkit-linear-gradient(top, #111, #bbb);
}

.tabbar {
  background: -webkit-linear-gradient(top, #111, #bbb);
}

.playing-full {
  height: 100%;
  transition: height 0.1s linear !important;
}

.playlist-head {
  margin-top: 30px;
  font-size: 20px;
  text-align: center;
  color: #fff !important;
}

.playlist-body {
  background: transparent !important;
  color: #fff !important;
}

.play-list {
  height: 100%;
  width: 80%;
  background: -webkit-linear-gradient(top, #000, #bbb) !important;
  z-index: 99999;
}

.custom-title {
  display: inline-block;
  overflow: hidden !important;
  width: 180px !important;
  white-space: nowrap;
  vertical-align: middle;
  text-overflow: ellipsis;
}

.playing {
  color: #00A1D6 !important;
}
.playing img {
  width: 20px;
  margin-left: 5px;
}

.save-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #fff !important;
}

.van-card__footer {
    margin-top: -20px;
}
</style>
