<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
      <view class="sugg-list" v-if="searchResult.length !==0">
        <view class="sugg-item" v-for="(item, i) in searchResult" :key="i" @click="gotoDetail(item)">
          <view class="good-name">{{item.goods_name}}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>

      <view class="history-box" v-else>
        <view class="history-title">
          <text>搜索历史</text>
          <uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
        </view>
        <view class="history-list">
          <uni-tag :text="item" v-for="(item, i) in histories" :key="i" @click="gotoGoodsList(item)"></uni-tag>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        kw: '',
        searchResult: [],
        historyList: []
      };
    },
    computed: {
      histories() {
        // 将搜索历史翻转返回给一个新的无关2的数组
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      input(e) {
        clearInterval(this.timer)
        this.timer = setTimeout(()=> {
          this.kw = e
          this.getSearchResult()
        }, 500)
      },
      async getSearchResult() {
        if (this.kw === '') {
          this.searchResult= []
          return
        }
        const { data: res } = await uni.$http.post('/api/public/v1/goods/qsearch', { query: this.kw })
        this.saveSearchHistory()
        if(res.meta.status !== 200) return uni.$showMsg()
        this.searchResult = res.message
      },
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/good_detail/good_detail?goods_id=' + item.goods_id
        })
      },
      saveSearchHistory: function () {
        // this.historyList.push(this.kw)
        // 将数组装换为set对象
        const set = new Set(this.historyList)
        // 调用  set对象对象的delete方法，移除对应的元素
        set.delete(this.kw)
        // 调用  set对象对象的add方法，添加对应的元素
        set.add(this.kw)
        // 将set对象装换为Array数组
        this.historyList = Array.from(set)
        // 将数据暂存在本地存储
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      clearHistory() {
        this.historyList = []
        uni.setStorageSync('kw', '[]')
      },
      gotoGoodsList(kw) {
        console.log('qqqqqqqqqq')
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + kw
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
.sugg-list {
  padding: 0 5px;

  .sugg-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    .good-name {
      // 文本超出不换行
      white-space: nowrap;
      // 溢出隐藏
      overflow: hidden;
      // 文本超出部分 。。。代替
      text-overflow: ellipsis;
    }
  }
}
.history-box {
  padding: 0 5px;
  .history-title {
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }
  .history-list{
    display: flex;
    flex-wrap: wrap;
    .uni-tag {
      margin: 5px 5px 0 0;
    }
  }
}
</style>
