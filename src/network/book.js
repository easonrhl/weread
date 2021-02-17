import request from './request'

export const getBook = async id => {
  let res = await request({
    url: `/book/${id}`
  })
  return res.data[0]
}

export const updateBookcase = async (id, key) => {
  return await request({
    method: 'post',
    url: 'user/bookcase',
    data: {
      id,
      key
    }
  })
}