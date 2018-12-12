import axios from '@/libs/axios'

export const getDevice = () => {
  return axios.request({
    url: '/device',
    method: 'get'
  })
}

export const putDevice = ({ id, device_id, location, ip, description }) => {
  return axios.request({
    url: '/device',
    method: 'post',
    data: {
      id,
      device_id,
      location,
      ip,
      description
    }
  })
}

export const registerDevice = ({ device_id, location, ip, description }) => {
  return axios.request({
    url: '/deviceregister',
    method: 'post',
    data: {
      device_id,
      location,
      ip,
      description
    }
  })
}
