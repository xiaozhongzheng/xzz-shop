<script setup lang="ts">
//
import { onLoad } from '@dcloudio/uni-app'
import CustomNavBar from './components/CustomNavBar.vue'
import { getHomeBannerApi, getHomeCategoryApi, getHomeHotApi } from '@/services/apis/home'
import { ref } from 'vue'
import type { BannerItem, HomeCategoryItem, HotItem } from '@/types/home'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import type { GuessInstance } from '@/components/components'
import PageSkeleton from './components/PageSkeleton.vue'
import { useGuessList } from '@/composables'

let bannerList = ref<BannerItem[]>([])
let getHomeBannerList = async () => {
  let { result } = await getHomeBannerApi()
  // console.log(res)
  bannerList.value = result
  // console.log(bannerList.value)
}
let homeCategoryList = ref<HomeCategoryItem[]>([])
let getHomeCategoryList = async () => {
  let { result } = await getHomeCategoryApi()
  homeCategoryList.value = result
  // console.log(homeCategoryList.value)
}

let homeHotList = ref<HotItem[]>([])
let getHomeHotList = async () => {
  let { result } = await getHomeHotApi()
  homeHotList.value = result
}
// // 获取子组件实例
// let guessRef = ref<GuessInstance>()

// let getMoreData = () => {
//   // console.log(guessRef.value)
//   guessRef.value?.getGuessList()
// }
let { guessRef, onScrolltolower } = useGuessList()

// 表示页面是否在加载
let loading = ref(true)
onLoad(async () => {
  await Promise.all([getHomeBannerList(), getHomeCategoryList(), getHomeHotList()])
  loading.value = false
})
const showRefresh = ref(false)
const onRefresherrefresh = () => {
  showRefresh.value = true
  // 这种方法太耗费时间了
  // await getHomeBannerList()
  // await getHomeCategoryList()
  // await getHomeHotList()
  // 调用子组件的重置数据的方法
  guessRef.value?.resetData()
  Promise.all([
    getHomeBannerList(),
    getHomeCategoryList(),
    getHomeHotList(),
    guessRef.value?.getGuessList(),
  ])
    .then((res) => {})
    .catch((err) => {
      uni.showToast({
        icon: 'none',
        title: '服务器出错啦~~~',
      })
    })
    .finally(() => {
      showRefresh.value = false
    })
}
</script>

<template>
  <view class="index">
    <CustomNavBar />
    <scroll-view
      scroll-y
      class="scroll"
      refresher-enabled
      @refresherrefresh="onRefresherrefresh"
      @scrolltolower="onScrolltolower"
      :refresher-triggered="showRefresh"
    >
      <PageSkeleton v-if="loading" />
      <template v-else>
        <XtxSwiper :list="bannerList" />
        <CategoryPanel :list="homeCategoryList" />
        <HotPanel :list="homeHotList" />
        <XtxGuess ref="guessRef" />
      </template>
    </scroll-view>
  </view>
</template>

<style lang="scss">
//
page {
  background-color: #f7f7f7;
}
.index {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .scroll {
    flex: 1;
  }
}
</style>
