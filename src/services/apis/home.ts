import type { PageResult } from '@/types/global'
import type { BannerItem, CategoryItem, GuessItem, HotItem } from '@/types/home'
import { request } from '@/utils/http'

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
  return request<CategoryItem[]>({
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

export const getGoodsGuessList = () => {
  return request<PageResult<GuessItem>>({
    method: 'GET',
    url: '/home/goods/guessLike',
  })
}
