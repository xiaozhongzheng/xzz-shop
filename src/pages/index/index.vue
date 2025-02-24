<script setup lang="ts">
//
import { onLoad } from '@dcloudio/uni-app'
import CustomNavBar from './components/CustomNavBar.vue'
import { getHomeBannerApi } from '@/services/home'
import { ref } from 'vue'
import type { BannerItem } from '@/types/home'

let bannerList = ref<BannerItem[]>([])
let getHomeBannerList = async () => {
  let { result } = await getHomeBannerApi()
  // console.log(res)
  bannerList.value = result
  console.log(bannerList.value)
}
onLoad(() => {
  getHomeBannerList()
})
</script>

<template>
  <view class="index">
    <CustomNavBar />
    <XtxSwiper :list="bannerList" />
  </view>
</template>

<style lang="scss">
//
</style>
