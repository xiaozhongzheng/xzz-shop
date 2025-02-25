import type { LoginResult } from '@/types/member'
import { request } from '@/utils/request'

type loginParams = {
  code: string
  encryptedData: string
  iv: string
}
export const loginWeiXinApi = (data: loginParams) => {
  return request({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}

export const loginWeiXinSimpleApi = (phoneNumber: string) => {
  return request<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber,
    },
  })
}
