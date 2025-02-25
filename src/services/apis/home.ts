import type { PageParams, PageResult } from '@/types/global'
import type { BannerItem, HomeCategoryItem, GuessItem, HotItem } from '@/types/home'
import { request } from '@/utils/request'

export const getHomeBannerApi = (distributionSite = 1) => {
  return request<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}

export const getHomeCategoryApi = () => {
  return request<HomeCategoryItem[]>({
    method: 'GET',
    url: '/home/category/mutli',
  })
}

export const getHomeHotApi = () => {
  return request<HotItem[]>({
    method: 'GET',
    url: '/home/hot/mutli',
  })
}

export const getGoodsGuessListApi = (data?: PageParams) => {
  return request<PageResult<GuessItem>>({
    method: 'GET',
    url: '/home/goods/guessLike',
    data,
  })
}
