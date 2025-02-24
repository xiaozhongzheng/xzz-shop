import type { BannerItem } from '@/types/home'
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
