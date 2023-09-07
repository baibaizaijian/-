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
