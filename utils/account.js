export const getUserInfo = () => {
  return localStorage.getItem('userInfo')
}
export const setUserInfo = payload => {
  localStorage.setItem('userInfo', JSON.stringify(payload))
}
