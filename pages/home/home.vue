<template>
  <view>
    <view class="search-box">
      <my-search @click="gotoSearch"/>
    </view>
    <!--  轮播图  -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="'/subpkg/good_detail/good_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!--  分类导航  -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navClickHandle(item)">
        <image :src="item.image_src" class="nav-image"></image>
      </view>
    </view>

  <!--  楼层区域  -->
    <view class="floor-list">
    <!--  楼层标题    -->
      <view class="floor-item" v-for="(item, index) in floorList" :key="index">
        <image :src="item.floor_title.image_src" class="floor-title"></image>

        <!--  楼层图片区域    -->
        <view class="floor-img-box">
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" class="nav-image" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2, index2) in item.product_list" :key="index2" v-if="index2 !== 0" :url="item2.url">
              <image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import tabbarBadge from "@/mixins/tabbar-badge";
export default {
  mixins:[tabbarBadge],
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: []
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getfloorList()
    },
    methods: {
      async getSwiperList() {
        const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if(res.meta.status !== 200) return uni.$showMsg
        this.swiperList = res.message
      },
      async getNavList() {
        const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
        if(res.meta.status !== 200) return uni.$showMsg
        this.navList = res.message
      },
      async getfloorList() {
        const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
        if(res.meta.status !== 200) return uni.$showMsg
        res.message.forEach(floor => {
          floor.product_list.forEach(prod =>{
            prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
      },
      navClickHandle(item) {
        if(item.name === '分类') {
          // 跳转到tabbar页面
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
swiper {
  height: 330rpx;
  .swiper-item,
  image {
    width: 100%;
    height: 330rpx;
  }
}

.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
  .nav-image {
    width: 128rpx;
    height: 140rpx;
  }
}

.floor-title {
  width: 100%;
  height: 60rpx;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
