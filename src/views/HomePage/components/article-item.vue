<template>
<!-- 跳转动态路由传参 -->
  <div class="article-item van-hairline--bottom" @click="$router.push('/article?id='+ article.art_id)">
    <p class="title van-multi-ellipsis--l2" :class="{w66: article.cover.type===1}">{{article.title}}</p>
    <img v-for="(url,i) in article.cover.images" :key="i" class="img" :src="url" alt="">
    <div class="info">
      <span>{{article.aut_name}}</span>
      <span>{{article.comm_count}}评论</span>
      <span>{{article.pubdate}}</span>
      <geek-icon name="esay-close"></geek-icon>
    </div>
  </div>
</template>

<script>
import geekIcon from '@/components/geek-icon.vue'
export default {
  components: { geekIcon },

  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      require: true
    }
  }
}
</script>
<style scoped lang="less">
.article-item {
  padding: 15px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .title {
    width: 100%;
    margin: 0;
    line-height: 22px;
    font-size: 16px;
    color: #333;
    margin-bottom: 8px;
    max-height: 44px;
    &.w66 {
      width: 66%;
    }
  }
  .img {
    width: 112px;
    height: 74px;
    border-radius: 4px;
    margin-bottom: 8px;
  }
  .info {
    width: 100%;
    color: #A5A6AB;
    font-size: 12px;
    position: relative;
    span {
      margin-right: 12px;
    }
    .geek-icon {
      float: right;
      font-size: 14px;
    }
  }
}
</style>
