import type { GoodsItem, PageResult } from './global'

export type hotResult = {
  bannerPicture: string
  id: string
  subTypes: HotSubType[]
  title: string
}

export type HotSubType = {
  id: string
  title: string
  goodsItems: PageResult<GoodsItem>
}
