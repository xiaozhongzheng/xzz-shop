import { request } from '@/utils/request'

export const getCatoryListApi = () => {
  return request({
    method: 'GET',
    url: '/category/top',
  })
}
