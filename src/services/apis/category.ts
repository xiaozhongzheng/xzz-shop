import type { CategoryItem } from '@/types/category'
import { request } from '@/utils/request'

export const getCatoryListApi = () => {
  return request<CategoryItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}
