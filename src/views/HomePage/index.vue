<template>
  <div class="home-page">
    <van-tabs v-model="activeIndex">
      <van-tab v-for="item in list" :key="item.id" :title="item.name">
        <article-list :articleId="item.id"></article-list>
      </van-tab>
    </van-tabs>

    <div class="btn-wrapper">
      <geek-icon name="search"></geek-icon>
      <geek-icon name="channel" @click.native="showChannel = true"></geek-icon>
    </div>
    <!-- 弹出层 -->
    <article-channel
      v-model="showChannel"
      :myChannels.sync="list"
      :activeIndex.sync="activeIndex"
      @update="update"
      @del="del"
    ></article-channel>
    <!-- .sync=:abc="数据" @update:abc="数据=$event" -->
  </div>
</template>
<script>
import geekIcon from '@/components/geek-icon.vue'
import { getMyChannels } from '@/api/channel'
import ArticleList from './components/article-list.vue'
import ArticleChannel from './components/article-channel.vue'

export default {
  components: { geekIcon, ArticleList, ArticleChannel },

  name: 'HomePage',
  data () {
    return {
      // 我的频道
      list: [],
      // 侧边栏是否显示
      showChannel: false,
      // 当前浏览的频道
      activeIndex: 0
    }
  },
  created () {
    this.update()
  },
  watch: {
    // 登录的账户切换,需要更新频道数据。
    '$store.state.user.token': async function () {
      const channels = await getMyChannels()
      this.myChannels = channels
      this.activeIndex = 0
    }
  },
  methods: {
    async update () {
      const res = await getMyChannels()
      console.log(res)
      this.list = res
    },
    async del (id) {
      this.list.splice(id, 1)
    }
  }

}
</script>
<style scoped lang="less">
::v-deep .van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  .van-tabs__line {
    background: @geek-color;
    height: 2px;
    width: 32px;
  }
  .van-tab {
    color: #9ea1ae;
  }
  .van-tab--active {
    font-size: 18px;
    color: #333;
  }
  .van-tabs__wrap {
    padding-right: 86px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  .van-tab__pane {
    height: 100%;
  }
}
.home-page {
  .btn-wrapper {
    position: absolute;
    right: 0;
    top: 0;
    width: 86px;
    height: 44px;
    background: #fff;
    display: flex;
    align-items: center;
    .geek-icon {
      flex: 1;
      text-align: center;
      font-size: 18px;
    }
    &::before {
      content: "";
      width: 20px;
      height: 44px;
      position: absolute;
      left: -20px;
      top: 0;
      background: linear-gradient(to right, rgba(255, 255, 255, 0), #fff);
    }
  }
}
</style>
