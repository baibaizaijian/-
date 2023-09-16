import GeekIcon from '@/components/geek-icon'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export default {
  install (Vue) {
    // 在这里扩展Vue功能
    Vue.component(GeekIcon.name, GeekIcon)
    Vue.filter('relativeTime', (value) => {
      return dayjs(value).toNow()
    })
    // 自定义指令
    Vue.directive('highlight', (el) => {
      const codeList = el.querySelectorAll('pre code')
      codeList.forEach((code) => {
        hljs.highlightElement(code)
      })
    })
  }

}
