import type { OrderPreGoods, OrderPreResult } from '@/types/orders'
import { request } from '@/utils/request'

export const getPreOrdersApi = () => {
  return request<OrderPreResult>({
    method: 'GET',
    url: '/member/order/pre',
  })
}
type params = {
  skuId: string
  count: string
  addressId?: string
}
export const getPreOrdersNowApi = (data: params) => {
  return request<OrderPreResult>({
    method: 'GET',
    url: '/member/order/pre/now',
    data,
  })
}

export const saveOrdersApi = (data: params) => {
  return request({
    method: 'POST',
    url: '/member/order',
    data,
  })
}
