import axios from '@/libs/axios'

export function getTableData () {
  return axios.request({
    // TODO: 等待后端给出API
    url: '/test'
  })
}
