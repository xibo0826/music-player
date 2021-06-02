<template>
  <div id="app">
    <van-nav-bar title="Music player" class="header" />
    <router-view></router-view>
    <van-tabbar v-model="currentTab" class="tabbar" active-color="red" inactive-color="skyblue" @change="changeTab">
      <van-tabbar-item name="home" replace to="/home" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item name="search" replace to="/search" icon="search">搜索</van-tabbar-item>
      <!-- <van-tabbar-item name="play" replace to="/play" icon="play">播放</van-tabbar-item> -->
    </van-tabbar>
    <van-popup v-model="showPlayer" class="playing-full"  position="bottom" :closeable="true">
      <player>
      </player>
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
      currentTab: "home",
    };
  },
  computed: {
    showPlayer: {
      get() {
        return this.$store.state.showPlayer;
      },
      set(flg) {
        this.$store.commit("togglePlayer", flg);
      }
    },
    isPlaying() {
      return this.$store.state.isPlaying;
    }
  },
  methods: {
    changeTab(tab) {
      console.log(tab);
      this.currentTab = tab;
    },
  },
};
</script>


<style scope="scoped">
.header {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  background: #444 !important;
}

.van-nav-bar__title {
  color: skyblue !important;
}

.van-tabbar-item--active {
  background: #444 !important;
}

.tabbar {
  background: #444 !important;
}

.playing-full {
  height: 100%;
}

</style>
