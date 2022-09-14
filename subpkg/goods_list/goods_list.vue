<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods, i) in goodsList" :key="i" @click="gotoGoodsDetail(goods)">
        <my-goods :goods="goods"/>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    components: {},

    data() {
      return {
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        // 定义节流阀
        isLoading: false
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    onReachBottom() {
      // 判断是否有下一页
      if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕')
      if(this.isLoading) return
      this.queryObj.pagenum++
      this.getGoodsList()
    },
    onPullDownRefresh() {
      this.queryObj.pagenum = 1
      this.total = 0
      this.isLoading = false
      this.goodsList = []
      this.getGoodsList(()=> uni.stopPullDownRefresh())
    },
    methods: {
      async getGoodsList(cb) {
        this.isLoading = true
        const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        this.isLoading = false
        // 数据一加载完毕后调用传过来的回调函数（停止下拉刷新）
        cb && cb()

        if(res.meta.status !== 200) return uni.$showMsg
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },
      gotoGoodsDetail(goods) {
        uni.navigateTo({
          uri: '/subpkg/good_detail/good_detail?goods_id=' + goods.goods_id
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
