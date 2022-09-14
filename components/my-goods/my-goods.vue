<template>
  <view class="goods-item">
    <view class="goods-item-left">
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <view class="goods-item-right">
      <view class="goods-name">
        {{goods.goods_name}}
      </view>
      <view class="goods-inof-box">
        <view class="goods-price">￥{{ goods.goods_price || toFixed }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    filters: {
      toFixed(num) {
        return Number(num).toFixed(2)
      }
    },
    props: {
      goods: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    }
  }
</script>

<style lang="scss">
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #F0F0F0;
  .goods-item-left {
    margin-right: 5px;
    .goods-pic {
      // 防止图片底部有间隙
      display: block;
      width: 100px;
      height: 100px;
    }
  }
  .goods-item-right {
    display: flex;
    // 竖向分布方向
    flex-direction: column;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
    }
    .goods-inof-box {
      .goods-price {
        color: #c00000;
        font-size: 16px;
      }
    }
  }
}
</style>
