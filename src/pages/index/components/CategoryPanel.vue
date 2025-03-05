<script setup lang="ts">
import type { HomeCategoryItem } from '@/types/home'

//
defineProps<{
  list: HomeCategoryItem[]
}>()
</script>

<template>
  <view class="category">
    <navigator
      class="category-item"
      hover-class="none"
      :url="`/pages/category/category?id=${item.id}`"
      v-for="item in list"
      :key="item.id"
      open-type="reLaunch"
    >
      <image class="icon" :src="item.icon"></image>
      <text class="text">{{
        item.name === '锦鲤' ? '美食' : item.name === '品牌' ? '更多' : item.name
      }}</text>
    </navigator>
  </view>
</template>

<style lang="scss">
/* 前台类目 */
.category {
  margin: 20rpx 0 0;
  padding: 10rpx 0;
  display: flex;
  flex-wrap: wrap;
  min-height: 328rpx;

  .category-item {
    width: 150rpx;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

    .icon {
      width: 100rpx;
      height: 100rpx;
    }
    .text {
      font-size: 26rpx;
      color: #666;
    }
  }
}
</style>
