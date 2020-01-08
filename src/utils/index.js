/**
 * Created by PanJiaChen on 16/11/18.
 */
import { Message } from 'element-ui'
import _import from '@/router/_import' // 获取组件的方法

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

export const datePickerOptions = {
  shortcuts: [{
    text: '最近一周',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]
}

export const insightDatePickerOptions = {
  shortcuts: [{
    text: '最近一周',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }],
  disabledDate: function(time) {
    return time.getTime() > Date.now() - 86400000
  }
}

export const monthPickerOptions = {
  shortcuts: [{
    text: '本月',
    onClick(picker) {
      picker.$emit('pick', [new Date(), new Date()])
    }
  }, {
    text: '今年至今',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().getFullYear(), 0)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近六个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 6)
      picker.$emit('pick', [start, end])
    }
  }]
}

// 饼图配置
export function pieSettings(radius = 70, offsetY = 240) {
  return {
    limitShowNum: 8,
    radius,
    offsetY,
    label: {
      position: 'inner',
      formatter: '{d}%'
    }
  }
}

// 对象转换为数组
export function objectToArray(object) {
  let array = []
  for (const key in object) {
    array.push({
      label: object[key],
      value: parseInt(key)
    })
  }
  return array
}

/**
 * 导出excel 处理
 * @param {(Array)} list
 * @param {Object} titles 表头，中英文对应
 */
export function handleExportExcel(list, titles) {
  import('@/vendor/Export2Excel').then(excel => {
    if (list && list.length > 0) {
      let tHeader = Object.keys(list[0])
      const data = formatJson(tHeader, list)
      let tHeaderCn = []
      if (titles) {
        tHeaderCn = tHeader.map(item => {
          return titles[item]
        })
      }
      excel.export_json_to_excel({
        header: tHeaderCn.length > 0 ? tHeaderCn : tHeader,
        data,
        // filename: this.filename,
        autoWidth: false,
        bookType: 'xlsx'
      })
    } else {
      Message({
        message: '导出数据为空',
        type: 'warning'
      })
    }
  })
}

function formatJson(tHeader, list) {
  return list.map(v => tHeader.map(j => {
    console.log(v[j])
    return v[j] - 0 ? v[j] - 0 : v[j]
  }))
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routerlist) {
  const router = []
  routerlist.forEach(item => {
    let path = item.id === '3' || item.id === '2' || item.id === '4' || item.id === '5' ? '/' : ''
    let routerItem = {
      path: path + item.name_en,
      name: item.name_en + item.id,
      component: _import(item.id)
    }
    if (item.child_list) {
      routerItem = Object.assign({}, routerItem, { children: filterAsyncRoutes(item.child_list) })
    }
    if (item.redirect) {
      routerItem = Object.assign({}, routerItem, { redirect: item.redirect })
    }
    if (item.name_cn !== '') {
      let icon = ''
      if (item.id === '2') {
        icon = 'assets'
      } else if (item.id === '3') {
        icon = 'insight'
      } else if (item.id === '4') {
        icon = 'account'
      } else if (item.id === '5') {
        icon = 'monitor'
      }
      routerItem = Object.assign({}, routerItem, { meta: { title: item.name_cn, icon } })
    }
    router.push(routerItem)
  })
  return router
}

// 环比
export function relativeRadio(value) {
  let val = parseFloat(value)
  if (isNaN(val)) {
    return value
  } else {
    if (val < 0) {
      return `${Math.abs(val)}%↓`
    } else if (val === 0) {
      return `${Math.abs(val)}%`
    }
    return `${Math.abs(val)}%↑`
  }
}

// 折线图判断是否为空数据
export function isEmpty(val) {
  return val && val.rows && val.rows.length === 0
}
