import request from '@/utils/request'
import store from '@/store'
const KEY = 'myChannels'

// 获取我的频道
export const getMyChannels = async () => {
  // 判断是否有token,是否登录
  if (!store.state.user.token) {
    // 如果没有登录,本地存储的数据
    const localData = JSON.parse(localStorage.getItem(KEY) || '[]')
    if (localData.length) {
      // 本地如果有数据,就返回数据
      return localData
    } else {
      // 如果本地没有数据就发请求
      const res = await request({ url: 'v1_0/user/channels' })
      // 数据保存到本地
      localStorage.setItem(KEY, JSON.stringify(res.data.data.channels))
      // 并反回数据,数据脱个壳
      return res.data.data.channels
    }
  } else {
    // 如果登录了就  直接发请求
    const res = await request({ url: 'v1_0/user/channels' })
    // 数据脱个壳
    console.log('我登录了,我的频道')
    return res.data.data.channels
  }
}
// 获取全部频道
export const getAllChannels = () => {
  return request({ url: '/v1_0/channels' })
}
// 添加频道
export const addChannel = async (myChannels) => {
  // 判断是否登录
  if (!store.state.user.token) {
    // 1. 如果未登录,获取本地我的频道
    const localData = JSON.parse(localStorage.getItem(KEY) || '[]')
    // 2. 最后一项解构,再更新
    const { id, name } = myChannels[myChannels.length - 1]
    // 3. 追加新频道
    localData.push({ id, name })
    // 4. 存储本地
    localStorage.setItem(KEY, JSON.stringify(localData))
  } else {
    // 如果登录,直接发请求
    await request({
      url: '/v1_0/user/channels',
      method: 'put',
      data: { channels: myChannels }
    })
  }
}
// 删除频道
export const delChannel = async (id) => {
  if (!store.state.user.token) {
    // 1. 获取本地
    const localData = JSON.parse(localStorage.getItem(KEY) || '[]')
    // 2. 删除频道
    const index = localData.findIndex(item => item.id === id)
    localData.splice(index, 1)
    // 3. 存储本地
    localStorage.setItem(KEY, JSON.stringify(localData))
  } else {
    await request({
      url: '/v1_0/user/channels/' + id,
      method: 'delete'
    })
  }
}
