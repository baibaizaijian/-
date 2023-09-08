<template>
  <van-popup
    :value="value"
    @click-close-icon="$emit('input', false)"
    closeable
    position="left"
  >
    <div class="article-channel">
      <div class="head">
        <h3>我的频道<small>点击进入频道</small></h3>
        <a
          class="edit"
          @click="isEdit = !isEdit"
          href="javascript:;"
          :class="{ active: isEdit }"
        >
          {{ isEdit ? "完成" : "编辑" }}
        </a>
        <!--根据编辑状态设置标签  -->
      </div>
      <div class="body">
        <a
          href="javascript:;"
          v-for="(item, index) in myChannels"
          :key="item.id"
          :class="{ active: activeIndex === index }"
          @click="enterChannel(index)"
          >{{ item.name }}
          <geek-icon
            v-show="isEdit && index !== 0 && index !== activeIndex"
            name="tag-close"
            @click.native.stop="del(item.id)"
          ></geek-icon>
          <!--根据编辑状态设置图标显示 , 跳过推荐,和当前项-->
        </a>
      </div>
      <div class="head" style="margin-top: 12px">
        <h3>频道推荐</h3>
      </div>
      <div class="body">
        <a
          href="javascript:;"
          v-for="item in optionalChannels"
          :key="item.id"
          @click="addChannel(item)"
          >+{{ item.name }}</a
        >
      </div>
    </div>
  </van-popup>
</template>
<script>
import { getAllChannels, addChannel, delChannel } from '@/api/channel'
export default {
  name: 'ArticleChannel',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    myChannels: {
      type: Array,
      require: true
    },
    activeIndex: {
      type: Number,
      default: 0,
      require: true
    }
  },
  data () {
    return {
      // 全部频道
      allChannels: [],
      // 是否编辑
      isEdit: false
    }
  },
  async created () {
    const res = await getAllChannels()
    this.allChannels = res.data.data.channels
  },

  computed: {
    // 可选频道
    optionalChannels () {
      // 找myChannels中没有的
      return this.allChannels.filter(
        (item) => !this.myChannels.find((ele) => ele.id === item.id)
      )
    }
  },
  methods: {
    enterChannel (index) {
      // 关闭对话框,v-model就是input
      this.$emit('input', false)
      // 传递频道索引
      this.$emit('update:activeIndex', index)
    },
    async addChannel (item) {
      // 1. 使用重置式添加频道数据，准备重置式的数据
      const newMyChannels = []
      this.myChannels.forEach((c, i) => {
        // 深度拷贝并加上序号
        newMyChannels.push({
          id: c.id,
          name: c.name,
          seq: i + 1
        })
      })
      newMyChannels.push({ ...item, seq: newMyChannels.length + 1 })
      // 2. 新频道数组,拿去发请求,更新
      await addChannel(newMyChannels)
      // 3. 成功：通知父组件更新我的频道
      this.$emit('update:myChannels', newMyChannels)
    },
    async del (id) {
      // 删除操作
      await delChannel(id)
      // 成功：更新我的频道
      const index = this.myChannels.findIndex(item => item.id === id)
      this.$emit('del', index)
    }
  }
}
</script>
<style scoped lang="less">
.van-popup {
  width: 100%;
  height: 100%;
  ::v-deep .van-popup__close-icon {
    font-size: 20px;
    right: 12px;
    top: 12px;
  }
}
.article-channel {
  margin-top: 44px;
}
.article-channel {
  margin-top: 44px;
  .head {
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    justify-items: center;
    padding-bottom: 12px;
    h3 {
      font-size: 16px;
      color: #333;
      margin: 0;
      small {
        font-size: 12px;
        color: #999;
        margin-left: 10px;
      }
    }
    .edit {
      float: right;
      height: 22px;
      width: 52px;
      line-height: 22px;
      text-align: center;
      color: #de644b;
      border-radius: 11px;
      border: 1px solid #de644b;
      font-size: 12px;
      &.active {
        color: #fff;
        background: #de644b;
      }
    }
  }
  .body {
    padding: 0 6px 0 16px;
    a {
      position: relative;
      display: inline-block;
      padding: 0 8px;
      font-size: 14px;
      color: #3a3948;
      background: #f7f8fa;
      height: 36px;
      line-height: 36px;
      min-width: 78px;
      margin-right: 10px;
      margin-bottom: 12px;
      border-radius: 18px;
      text-align: center;
      .geek-icon {
        position: absolute;
        top: -5px;
        right: -5px;
        line-height: 1;
      }
      &.active {
        color: @geek-color;
      }
    }
  }
}
</style>
