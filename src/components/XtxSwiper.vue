<script setup lang="ts">
import type { BannerItem } from '@/types/home'
import { ref } from 'vue'

const activeIndex = ref(0)
const change: UniHelper.SwiperOnChange = (e) => {
  // console.log(e.detail)
  activeIndex.value = e.detail.current
}
const props = defineProps<{
  list: BannerItem[]
}>()
</script>

<template>
  <view class="carousel">
    <swiper @change="change" :circular="true" :autoplay="false" :interval="3000">
      <swiper-item v-for="item in list" :key="item.id">
        <navigator :url="item.hrefUrl" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" :src="item.imgUrl"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 指示点 -->
    <view class="indicator">
      <text
        v-for="(item, index) in list"
        :key="item.id"
        class="dot"
        :class="{ active: index === activeIndex }"
      ></text>
    </view>
  </view>
</template>

<style lang="scss">
@import './styles/XtxSwiper.scss';
</style>
