<template>
  <van-tabbar route>
    <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/question" icon="comment-o">问答</van-tabbar-item>
    <van-tabbar-item to="/video" icon="tv-o">视频</van-tabbar-item>
    <van-tabbar-item to="/user" icon="contact">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  name: 'AppTabbar'
}
</script>
<style type="text/css">
    .icon {
       width: 1em;
       height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
</style>
