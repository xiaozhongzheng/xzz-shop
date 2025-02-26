import type { UserDetail, UserParames } from '@/types/user'
import { request } from '@/utils/request'

export const getUserInfoApi = () => {
  return request<UserDetail>({
    method: 'GET',
    url: '/member/profile',
  })
}

export const updateUserInfoApi = (data: UserParames) => {
  return request<UserDetail>({
    method: 'PUT',
    url: '/member/profile',
    data,
  })
}
