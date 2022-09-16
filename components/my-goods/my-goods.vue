<template>
  <view class="goods-item">
    <view class="goods-item-left">
      <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="redioChangeHinder"></radio>
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <view class="goods-item-right">
      <view class="goods-name">
        {{goods.goods_name}}
      </view>
      <view class="goods-inof-box">
        <view class="goods-price">￥{{ goods.goods_price || toFixed }}</view>
        <!-- 商品数量 -->
        <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHinder"></uni-number-box>
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
      },
      // 是否展示图片左侧的 radio
      showRadio: {
        type: Boolean,
        // 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
        default: false
      },
      showNum: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    methods: {
      redioChangeHinder() {
        this.$emit('radio-change', {
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      numChangeHinder(val) {
        this.$emit('num-change', {
          goods_id: this.goods.goods_id,
          goods_count: +val
        })
      }
    }
  }
</script>

<style lang="scss">
.goods-item {
  width: 750rpx;
  display: flex;
  box-sizing: border-box;
  padding: 10px 5px;
  border-bottom: 1px solid #F0F0F0;
  .goods-item-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    flex: 1;
    // 竖向分布方向
    flex-direction: column;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
    }
    .goods-inof-box {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
      .goods-price {
        color: #c00000;
        font-size: 16px;
      }
    }
  }
}
</style>
