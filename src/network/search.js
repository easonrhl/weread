import request from './request'

export const getSearchInfo = async (info, page) => {
  let res = await request({
    url: '/book/search',
    params: {
      info,
      page
    }
  })
  return res.data
}