// src/types/member.d.ts

export type CommonType = {
  /** 用户ID */
  id: number
  /** 头像  */
  avatar: string
  /** 账户名  */
  account: string
  /** 昵称 */
  nickname?: string
}

/** 小程序登录 登录用户信息 */
export type LoginResult = CommonType & {
  /** 手机号 */
  mobile: string
  /** 登录凭证 */
  token: string
}

/** 个人信息 用户详情信息 */
export type UserDetail = CommonType & {
  /** 性别 */
  gender?: '男' | '女'
  /** 生日 */
  birthday?: string
  /** 省市区 */
  fullLocation?: string
  /** 职业 */
  profession?: string
}

export type UserParames = Pick<UserDetail, 'nickname' | 'gender' | 'birthday' | 'profession'> & {
  provinceCode?: string
  cityCode?: string
  countyCode?: string
}

/** 性别 */
export type Gender = '女' | '男'
