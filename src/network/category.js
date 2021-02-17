import request from './request'

export const getSubCategory = async id => {
  let res = await request({
    url: '/book/category/' + id
  })
  return res.data
}

export const getBooks = async ({id, sid}, page) => {
  let res = await request({
    url: `/book/${id}/${sid}/${page}`
  })
  return res.data
}

export const getSearchBooks = async ({ id, sid }, info) => {
  let res = await request({
    url: '/book/search/category',
    params: {
      id,
      sid,
      info
    }
  })
  return res.data
}

export const getTitle = async id => {
  let res = await request({
    url: `/book/title/${id}`
  })
  return res.data[0].name
}
