<template>
  <div class="container">
    <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in bannerData" :key="item.id">
        <img :src="item.artist.picUrl" alt="">
      </van-swipe-item>
    </van-swipe>
    <van-divider>精品歌单</van-divider>
    <section class="high-quality">
      <van-list finished-text="没有更多了">
        <van-card class="song-card" v-for="item in highQualitySongs" :key="item.id" :title="item.name" :desc="item.description" :thumb="item.coverImgUrl">
          <template #tags>
            <van-tag class="song-tag" v-for="tag in item.tags" :key="tag" type="warning">{{ tag }}</van-tag>
          </template>
        </van-card>
      </van-list>
    </section>
    <van-divider>最新专辑</van-divider>
    <section class="new-album">
      <swiper :options="swiperOption">
        <swiper-slide v-for="album in newAlbums" :key="album.id">
          <img :src="album.picUrl" class="album-img" alt="">
        </swiper-slide>
      </swiper>
    </section>
    <van-divider>小编推荐</van-divider>
    <section class="hot">
      <van-list finished-text="没有更多了">
        <van-card class="song-card" v-for="item in suggestSongs" :key="item.id" tag="hot" :title="item.name" :desc="item.copywriter" :thumb="item.picUrl">
          <template #tags>
          </template>
        </van-card>
      </van-list>
    </section>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
      },

      bannerData: [],
      highQualitySongs: [],
      suggestSongs: [],
      newAlbums: [],
    };
  },
  created() {
    // 获取轮播图数据
    this.getBanner();

    // 获取精品歌单
    this.getHighQuality();

    // 获取推荐歌单
    this.getSuggestSongs();

    // 获取最新专辑
    this.getNewAlbums();
  },
  methods: {
    // 获取轮播图数据
    async getBanner() {
      const result = await this.$http.get("/album/new", {
        params: {
          limit: 5,
        },
      });
      console.log("轮播图数据");
      console.log(result.data.albums);
      this.bannerData = result.data.albums;
    },

    // 获取精品歌单
    async getHighQuality() {
      const result = await this.$http.get("/top/playlist/highquality", {
        params: {
          limit: 10,
        },
      });
      console.log("精品歌单");
      console.log(result.data.playlists);
      this.highQualitySongs = result.data.playlists;
    },

    // 获取推荐歌单
    async getSuggestSongs() {
      const result = await this.$http.get("/personalized", {
        params: {
          limit: 10,
        },
      });
      this.suggestSongs = result.data.result;
      console.log("推荐歌单");
      console.log(this.suggestSongs);
    },

    // 获取最新专辑
    async getNewAlbums() {
      const result = await this.$http.get("/album/newest");
      console.log("最新专辑");
      console.log(result.data.albums);
      this.newAlbums = result.data.albums;
    },
  },
};
</script>
<style>
.container {
  /* background: #222; */
}

.swipe {
  height: 220px;
}
.swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
}

.swipe img {
  width: 100%;
}

.hot {
  overflow: auto;
  height: 300px;
}

.song-card img {
  width: 100% !important;
}

.song-card .van-card__desc {
  max-height: 45px !important;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-card .van-ellipsis {
  white-space: normal;
}


.song-tag {
  margin: 5px;
}

.new-album {
  overflow: auto;
  height: 100px;
}

.album-img {
  width: 100% !important;
}

.high-quality {
  overflow: auto;
  height: 300px;
}
</style>
