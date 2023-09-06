<template>
  <div class="article-list" @scroll="rememberScroll" ref="ArticleList">
    <van-pull-refresh
     v-model="refreshing"
     @refresh="onRefresh"
      success-text="刷新成功">
    <van-list v-model="loading" :finished="finished" @load="onLoad()" finished-text="没有更多了" >
     <article-item v-for="i in articles" :key="i.id" :article="i" />
    </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { Toast } from 'vant'
import ArticleItem from './article-item.vue'
import { getArticlesByChannel } from '@/api/article'

export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    articleId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    // 正在加载
      loading: false,
      // 是否全部数据加载完成
      finished: false,
      // 文章列表
      articles: [],
      // 下拉刷新状态
      refreshing: false,
      // 时间戳  当前时间时间戳
      timestamp: Date.now(),
      // 滚动距离
      scrollTop: 0
    }
  },
  methods: {
    async onLoad () {
      console.log('上拉加载')
      const res = await getArticlesByChannel(this.articleId, this.timestamp)
      console.log(res.data.data.results)
      Toast.success('加载成功')
      this.finished = false
      this.articles.push(...res.data.data.results)
      this.timestamp = res.data.data.pre_timestamp
      this.refreshing = false
      this.loading = false
    },
    onRefresh () {
      this.articles = []
      this.onLoad()
    },
    rememberScroll () {
      this.scrollTop = this.$refs.ArticleList.scrollTop
    }
  },

  activated () {
    console.log('actived 激活 → 进入页面')
    console.log(this.scrollTop)
    this.$refs.ArticleList.scrollTop = this.scrollTop
  }
}
</script>
<style scoped lang="less">
.article-list {
  height: 100%;
  overflow-y: auto;
  padding: 0 16px;
}
</style>
