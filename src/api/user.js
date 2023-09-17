import request from '@/utils/request'
// import axios from 'axios'
/**
 * 登录
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @returns Promise
 */
export const userLogin = ({ mobile, code }) => {
  return request({
    url: 'v1_0/authorizations',
    method: 'post',
    data: { mobile, code }
  })
}
export const sendMessage = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取当前用户的信息（资料和统计）
 */
export const getUserInfo = () => {
  return request({ url: '/v1_0/user' })
}

/**
 * 获取当前用户的资料
 */
export const getUserProfile = () => {
  return request({ url: '/v1_0/user/profile' })
}

/**
 * 修改头像
 * @param {Object} formData -  {photo:'文件数据'}
 */
export const updateUserPhoto = (formData) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'patch',
    data: formData
  })
}
/**
 * 修改用户
 * @param {Object} user - 用户对象
 */
export const updateUserProfile = (user) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'patch',
    data: user
  })
}
