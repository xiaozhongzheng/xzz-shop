import type { CartItem } from '@/types/cart'
import { request } from '@/utils/request'

type addParams = {
  skuId: string
  count: number
}

export const addCartApi = (data: addParams) => {
  return request({
    method: 'POST',
    url: '/member/cart',
    data,
  })
}

export const getCartListApi = () => {
  return request<CartItem[]>({
    method: 'GET',
    url: '/member/cart',
  })
}

export const removeCartApi = (ids: string[]) => {
  return request({
    method: 'DELETE',
    url: '/member/cart',
    data: {
      ids,
    },
  })
}

type updateParams = {
  selected?: boolean
  count?: number
}
export const updateCartNumberApi = (skuId: string, data: updateParams) => {
  return request({
    method: 'PUT',
    url: `/member/cart/${skuId}`,
    data,
  })
}

export const updateCartStatusApi = (selected: boolean) => {
  return request({
    method: 'PUT',
    url: `/member/cart/selected`,
    data: {
      selected,
    },
  })
}
