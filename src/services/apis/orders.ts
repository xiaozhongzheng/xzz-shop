import type {
  OrderCreateParams,
  OrderCreateResult,
  OrderListParams,
  OrderListResult,
  OrderLogisticResult,
  OrderPreResult,
  OrderDetailResult,
} from '@/types/orders'
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

export const saveOrdersApi = (data: OrderCreateParams) => {
  return request<OrderCreateResult>({
    method: 'POST',
    url: '/member/order',
    data,
  })
}

export const getOrderDetailsApi = (id: string) => {
  return request<OrderDetailResult>({
    method: 'GET',
    url: `/member/order/${id}`,
  })
}

// 仅 appid 为 wx26729f20b9efae3a 的开发者可用
export const payOrdersApi = (data: { orderId: string }) => {
  return request<WechatMiniprogram.RequestPaymentOption>({
    method: 'GET',
    url: `/pay/wxPay/miniPay`,
    data,
  })
}

// 在开发时调用的接口
export const payOrdersMockApi = (data: { orderId: string }) => {
  return request({
    method: 'GET',
    url: `/pay/mock`,
    data,
  })
}

// 在开发时模拟发货
export const orderConsignmentApi = (id: string) => {
  return request<OrderDetailResult>({
    method: 'GET',
    url: `/member/order/consignment/${id}`,
  })
}

// 确认收货
export const orderReceiptApi = (id: string) => {
  return request<OrderDetailResult>({
    method: 'PUT',
    url: `/member/order/${id}/receipt`,
  })
}

// 获取订单物流信息
export const getLogisticsApi = (id: string) => {
  return request<OrderLogisticResult>({
    method: 'GET',
    url: `/member/order/${id}/logistics`,
  })
}

// 删除订单
export const deleteOrdersApi = (data: { ids: string[] }) => {
  return request<OrderLogisticResult>({
    method: 'DELETE',
    url: `/member/order`,
    data,
  })
}

// 获取订单列表
export const getOrdersListApi = (data: OrderListParams) => {
  return request<OrderListResult>({
    method: 'GET',
    url: `/member/order`,
    data,
  })
}
