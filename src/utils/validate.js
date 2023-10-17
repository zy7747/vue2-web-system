/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
// form 表单验证数字
export const numValidate = (rule, value, callback) => {
  if (!value) return callback()
  let reg = /^\d+(?=\.{0,1}\d+$|$)/
  let message = ''
  if (!reg.test(value)) {
    message = '请输入数字'
    callback(new Error(message))
  } else {
    callback()
  }
}

  
/**
   * @param {string} url
   * @returns {Boolean}
   */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}
  
/**
   * @param {string} email
   * @returns {Boolean}
   */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}
  
/**
   * @param {string} str
   * @returns {Boolean}
   */
export function isString(str) {
  return typeof str === 'string' || str instanceof String
  
}
  
/**
   * @param {Array} arg
   * @returns {Boolean}
   */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}
  