<template>
  <view>

    <my-search @click="gotoSearch"/>

    <view class="scroll-view-container">
      <!--      左侧滑动-->
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{height: windowHeight + 'px'}">
        <block v-for="(item, i) in cateLast" :key="i">
          <view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChange(i)">{{item.cat_name}}</view>
        </block>

      </scroll-view>
      <!--      右侧滑动-->
      <scroll-view class="right-scroll-view" scroll-y="true" :style="{height: windowHeight + 'px'}" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item2, i2) in cateLevel2">
          <view class="cate-lv2-title">/ {{ item2.cat_name }} /</view>
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
              <image :src="item3.cat_icon"></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import MySearch from "../../components/my-search/my-search";
  import tabbarBadge from "@/mixins/tabbar-badge";
  export default {
    mixins:[tabbarBadge],
    components: {MySearch},
    data() {
      return {
        windowHeight: 0,
        active: 0,
        cateLast: [],
        // 二级分类
        cateLevel2: [],
        scrollTop: 0
      };
    },
    onLoad() {
      this.getCateList()
      const systemInfo = uni.getSystemInfoSync()
      this.windowHeight = systemInfo.windowHeight - 50
    },
    methods: {
      async getCateList() {
        const {data: res } = await uni.$http.get('/api/public/v1/categories')
        if(res.meta.status !== 200) return uni.$showMsg()
        this.cateLast = res.message

        this.cateLevel2 = res.message[0].children

      },
      activeChange(i) {
        this.active = i

        //  重新为二级分类赋值
        this.cateLevel2 = this.cateLast[i].children

        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      gotoGoodsList(item) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
        })
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
.scroll-view-container {
  display: flex;
  .left-scroll-view {
    width: 120px;
    .left-scroll-view-item{
      background-color: #f7f7f7;
      line-height: 60px;
      text-align: center;
      font-size: 12px;
      &.active {
        background-color: #FFFFFF;
        position: relative;
        &::before {
          content: '';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
  .cate-lv2-title {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding: 15px 0;
  }
  .cate-lv3-list {
    display: flex;
    flex-wrap: wrap;
    .cate-lv3-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.33%;
      margin-bottom: 10px;
      image {
        width: 60px;
        height: 60px;
      }
      text {
        font-size: 12px;
      }
    }
  }
}
</style>
