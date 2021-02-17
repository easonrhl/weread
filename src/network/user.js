import request from './request'

export const login = async user => {
  return await request({
    method: 'post',
    url: '/user/login',
    data: user
  })
}

export const register = async user => {
  return await request({
    method: 'post',
    url: '/user',
    data: user
  })
}

export const validateUname = async username => {
  return await request({
    url: '/user/name',
    params: {username}
  })
}

export const getUserinfo = async () => {
  return await request({
    url: '/user/info'
  })
}

export const uploadAvatar = async file => {
  let data = new FormData()
  data.append('file', file)
  return await request({
    method: 'post',
    url: '/upload',
    data
  })
}

export const updateUname = async newname => {
  return await request({
    method: 'post',
    url: '/user/name',
    data: {
      newname
    }
  })
}