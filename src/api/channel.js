import request from '@/utils/request'

/**
 * 获取全部频道
 * @returns promise
 */

export const getMyChannels = () => {
  return request({ url: 'v1_0/user/channels' })
}
export const getAllChannels = () => {
  return request({ url: '/v1_0/channels' })
}
