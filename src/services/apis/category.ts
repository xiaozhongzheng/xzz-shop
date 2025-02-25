import type { CategoryItem } from '@/types/category'
import type { GoodsResult } from '@/types/goods'
import { request } from '@/utils/request'

export const getCatoryListApi = () => {
  return request<CategoryItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}

export const getGoodsApi = (id: string) => {
  return request<GoodsResult>({
    method: 'GET',
    url: '/goods',
    data: {
      id,
    },
  })
}
