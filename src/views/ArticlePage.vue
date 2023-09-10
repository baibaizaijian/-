<template>
  <!-- 文章主体 -->
  <div>
    <van-nav-bar left-arrow @click-left="$router.back()" fixed>
      <template #title>
        <div class="nav-author"  v-show="show">
          <van-image round width="7vw" height="7vw" :src="article.aut_photo" />
          <span class="name">{{ article.aut_name }}</span>
          <span class="line">|</span>
          <span class="follow">关注</span>
        </div>
      </template>
      <template #right>
        <van-icon name="ellipsis" size="5.4vw"></van-icon>
      </template>
    </van-nav-bar>
    <div class="article-wrapper"  ref="wrapper" @scroll="onScroll">
      <!-- 头部：标题 时间 作者 -->
      <div class="header" ref="header">
        <h3 class="title">{{ article.title }}</h3>
        <div class="time">
          <span>{{ article.pubdate }}</span>
          <span>|</span>
          <span>{{ article.read_count }} 阅读</span>
          <span>|</span>
          <span>{{ article.comm_count }} 评论</span>
        </div>
        <div class="author van-hairline--bottom">
          <van-image
            round
            width="10vw"
            height="10vw"
            :src="article.aut_photo"
          />
          <span class="name">{{ article.aut_name }}</span>
          <van-button v-if="article.is_followed" @click="followAuthor()" round size="small" >取消关注</van-button>
          <van-button v-else @click="followAuthor()" round size="small" color="#FC6627">+ 关注</van-button>
        </div>
      </div>
      <!-- 内容：文章内容 -->
      <div class="main">
        <!-- <div class="html" v-html="article.content"></div> -->
        <div class="html">
          <p v-for="i in 10" :key="i">我会把书籍分成两类,一类是全面型,一类是犀利型.前面介绍了一本全面型的书籍,接下来介绍的这本的特点是非常犀利,这类书籍的特点是作者能找对重点(2/8原则掌握的很好),在重点位置深入挖掘.这本书的作者John Resig也是JQuery的作者,他显然是个足够犀利的人儿.JQuery从未承诺解决所有问题,但再一些重点部位的突破,让这个类库如此流行.这本书并没有着重介绍JQuery,还是基于原生的JavaScript和DOM API.</p>
        </div>
        <div class="space"></div>
      </div>
      <!-- 评论：评论组件 -->
    </div>
  </div>
</template>
<script>
import { getArticle, followAuthor } from '@/api/article'
export default {
  name: 'ArticlePage',
  data () {
    return {
      article: {},
      show: false
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    async getArticle () {
      const res = await getArticle(this.$route.query.id)
      console.log(res)
      this.article = res.data.data
    },
    onScroll () {
      // 获取页面卷动距离
      const scrollTop = this.$refs.wrapper.scrollTop
      // 获取头部高度
      const headerHeight = this.$refs.header.offsetHeight
      // 当页面卷去距离大于头部高度,就显示
      this.show = scrollTop > headerHeight
    },
    async followAuthor () {
      const newStatus = !this.article.is_followed
      await followAuthor(this.article.aut_id, newStatus)

      this.$toast.success(newStatus ? '关注成功' : '取消关注')
      this.article.is_followed = newStatus
    }
  }
}
// !important;
</script>
<style lang="less" scoped>
.article-wrapper {
  height: 100%;
  overflow-y: auto ;
  padding: 44px 0 50px;
  // 头部
  .header {
    padding: 0 16px;
    .title {
      font-size: 20px;
      font-weight: normal;
      padding: 10px 0;
      margin: 0;
    }
    .time {
      font-size: 12px;
      color: #999;
      span:nth-child(2n) {
        margin: 0 5px;
        color: #ccc;
        position: relative;
        top: -1px;
      }
    }
    .author {
      display: flex;
      align-items: center;
      padding: 10px 0;
      .name {
        flex: 1;
        padding-left: 10px;
        font-size: 16px;
      }
    }
  }
  // 内容
  .main {
    .space {
      height: 16px;
      background: @geek-gray-color;
    }
    .html {
      word-break: break-all;
      width: 100%;
      overflow: hidden;
      padding: 20px 16px;
      /deep/ img {
        max-width: 100%;
        background: #f9f9f9;
      }
      /deep/ pre {
        white-space: pre-wrap;
        code {
          white-space: pre;
        }
      }
    }
  }
}
/deep/ .van-nav-bar__title {
   max-width: 270px;
   width: 270px;
}
.nav-author {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  > span {
    font-size: 14px;
    padding-left: 5px;
  }
  .line {
    color: #ccc;
    position: relative;
    top: -1px;
  }
  .follow {
    color: @geek-color;
  }
}
</style>
