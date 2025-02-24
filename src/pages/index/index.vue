<script setup lang="ts">
//
import { onLoad } from '@dcloudio/uni-app'
import CustomNavBar from './components/CustomNavBar.vue'
import { getHomeBannerApi, getHomeCategoryApi } from '@/services/home'
import { ref } from 'vue'
import type { BannerItem, CategoryItem } from '@/types/home'
import CategoryPanel from './components/CategoryPanel.vue'
let bannerList = ref<BannerItem[]>([])
let getHomeBannerList = async () => {
  let { result } = await getHomeBannerApi()
  // console.log(res)
  bannerList.value = result
  // console.log(bannerList.value)
}
let homeCategoryList = ref<CategoryItem[]>([])
let getHomeCategoryList = async () => {
  let { result } = await getHomeCategoryApi()
  homeCategoryList.value = result
  console.log(homeCategoryList.value)
}
onLoad(() => {
  getHomeBannerList()
  getHomeCategoryList()
})
</script>

<template>
  <view class="index">
    <CustomNavBar />
    <XtxSwiper :list="bannerList" />
    <CategoryPanel :list="homeCategoryList" />
  </view>
</template>

<style lang="scss">
//
page {
  background-color: #f7f7f7;
}
</style>
