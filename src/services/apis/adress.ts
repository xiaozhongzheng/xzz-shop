import type { AddressItem, AddressParams } from '@/types/address'
import { request } from '@/utils/request'

export const addAddressApi = (data: AddressParams) => {
  return request({
    method: 'POST',
    url: '/member/address',
    data,
  })
}

export const getAddressListApi = () => {
  return request<AddressItem[]>({
    method: 'GET',
    url: '/member/address',
  })
}

export const getAddressByIdApi = (id: string) => {
  return request<AddressItem>({
    method: 'GET',
    url: `/member/address/${id}`,
  })
}

export const updateAddressApi = (id: string, data: AddressParams) => {
  return request({
    method: 'PUT',
    url: `/member/address/${id}`,
    data,
  })
}
