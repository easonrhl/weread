import request from './request'

export const getRecommend = async page => {
  let res = await request({
    url: '/book/recommend/' + page
  })
  return res.data
}

export const getCategory = async () => {
  let res = await request({
    url: '/book/category'
  })
  return res.data
}

export const getTop = async page => {
  let res = await request({
    url: '/book/top/' + page
  })
  return res.data
}

