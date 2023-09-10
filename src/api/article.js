import request from '@/utils/request'

/**
 * 根据频道获取频道
 * @param {Number} channelId - 频道ID
 * @param {Number} timestamp - 时间戳
 * @returns
 */
// 获得当前频道文章
export const getArticlesByChannel = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    method: 'get',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
// 获得文章详情
export const getArticle = (id) => {
  return request({
    url: '/v1_0/articles/' + id
  })
}
// 关注文章
export const followAuthor = (authorId, isFollow) => {
  // 根据关注情况发送不同请求
  if (isFollow) {
    return request({
      url: '/v1_0/user/followings',
      method: 'post',
      data: { target: authorId }
    })
  } else {
    return request({
      url: '/v1_0/user/followings/' + authorId,
      method: 'delete'
    })
  }
}
