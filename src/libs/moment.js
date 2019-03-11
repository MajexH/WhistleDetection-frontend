import moment from 'moment'

moment.defineLocale('zh-cn', {
  longDateFormat: {
    llll: 'YYYY年MM月DD日HH点mm分'
  }
})

export default moment
