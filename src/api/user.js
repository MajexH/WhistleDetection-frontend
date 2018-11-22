import axios from '@/libs/axios'

export const login = ({ username, password }) => {
  return axios.request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export const register = ({ username, password, name, email }) => {
  return axios.request({
    url: '/register',
    method: 'post',
    data: {
      username,
      password,
      name,
      email
    }
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
