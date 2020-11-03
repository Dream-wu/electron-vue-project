/**
 *格式化时间
 *yyyy-MM-dd hh:mm:ss
 */
export function formatDate (time, fmt) {
  if (time === undefined || time === null || '') {
    return
  }
  if (fmt === undefined || '') {
    fmt = 'yyyy-MM-dd hh:mm:ss'
  }
  const date = new Date(time)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

/**
 * 获取星期
 */
export function formatDateWeek (time) {
  let dateT = time ? new Date(time) : new Date()
  let day = ''
  switch (dateT.getDay()) {
    case 1:
      day = '一'
      break
    case 2:
      day = '二'
      break
    case 3:
      day = '三'
      break
    case 4:
      day = '四'
      break
    case 5:
      day = '五'
      break
  }
  return `星期${day}`
}
