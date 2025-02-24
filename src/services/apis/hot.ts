import type { PageParams } from '@/types/global'
import type { hotResult } from '@/types/hot'
import { request } from '@/utils/request'

// 交叉类型
type dataType = PageParams & { subType: string }
export const getHotCommonApi = (url: string, data?: dataType) => {
  return request<hotResult>({
    method: 'GET',
    url,
    data,
  })
}
