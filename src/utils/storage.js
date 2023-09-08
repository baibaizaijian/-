
// 统一名称
const KEY = 'my-token-jikeyuan-pc'

// 获取token
export const setToken = (Token) => {
  localStorage.setItem(KEY, Token)
}
// 获取token
export const getToken = () => {
  return localStorage.getItem(KEY)
}

// 删除token
export const delToken = () => {
  localStorage.removeItem(KEY)
}
