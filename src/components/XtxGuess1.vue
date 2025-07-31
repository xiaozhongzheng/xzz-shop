<script setup lang="ts">
//
import { getGoodsGuessListApi } from '@/services/apis/home'
import type { PageParams } from '@/types/global'
import type { GuessItem } from '@/types/home'
import type { GoodsItem } from '@/types/global'
import { computed, onMounted, reactive, ref } from 'vue'
import { debounce } from '@/utils'
import { onShow } from '@dcloudio/uni-app'
let guessList = ref<GuessItem[]>([])

const dataList = ref<GoodsItem[]>([])
const totalHeight = ref(0)
// Reqired 可以将参数变为必选
let queryParams: Required<PageParams> = {
  page: 1,
  pageSize: 100,
}
let getGuessList = async () => {
  let { result } = await getGoodsGuessListApi(queryParams) // 获取数据
  dataList.value = result.items
  totalHeight.value = itemHeight * dataList.value.length // 计算滚动区域的总高度
  console.log(totalHeight.value, 'totalHeight.value')
  handleScroll()
}
onMounted(() => {
  console.log(scrollRef.value.$el.height, '===')
  getGuessList()
})
onShow(() => {
  // 每次页面展示的时候，都会执行下面的方法
  getGuessList()
})
const itemHeight = 200 // 列表每个项的高度
const visibleSize = 600 // 可视化区域
const startIndex = ref(0) // 可视化区域的开始索引
const endIndex = ref(0) // 可视化区域结束的索引
const scrollTop = ref(0) // 容器内滚动条的高度

const scrollRef = ref()
const showSize = Math.floor(visibleSize / itemHeight) // 可视区域展示item的个数

const handleScroll = () => {
  // console.log(scrollRef.value.$el.scrollTop)
  const scrollDom = scrollRef.value.$el
  scrollTop.value = scrollDom.scrollTop * 2 // 获取滚动条滚动的距离
  console.log(scrollTop.value, 'scrollTop')
  startIndex.value = preStartIndex.value
  endIndex.value = nextEndIndex.value
  console.log(startIndex.value, endIndex.value, 'index')
}

// 使用防抖技术优化滚动条滑动时多次调用方法
const debounceScroll = debounce(handleScroll, 100)

// 计算偏移距离，用于在可视化区域准确的展示数据
const startOffset = computed(() => {
  return startIndex.value * itemHeight
})

// 在开始索引的基础上 -3，表示向上预加载3条数据，可优化用户快速下滑出现页面白屏的问题
const preStartIndex = computed(() => {
  let index = Math.floor(scrollTop.value / itemHeight)
  if (index - 3 > 0) {
    return index - 3
  }
  return index
})

// 在开始索引的基础上 +3，表示向下预加载3条数据
const nextEndIndex = computed(() => {
  let index = startIndex.value + showSize
  const lastIndex = dataList.value.length
  if (index > lastIndex) {
    // 表示没有更多数据展示了
    return dataList.value.length - 1
  }
  index += 3 // 向下多展示2条数据，防止滑动时出现白屏
  return index > lastIndex ? lastIndex : index
})

// 可视化区域要展示的数据
const visibleData = computed(() => {
  // 计算可视区域要展示的数据
  return dataList.value.slice(startIndex.value, endIndex.value)
})
</script>

<template>
  <!-- 猜你喜欢 -->
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <view
    class="scrollBox"
    @scroll="debounceScroll"
    ref="scrollRef"
    :style="{ height: visibleSize + 'rpx' }"
  >
    <!-- 重点：使用一个空的盒子撑开父盒子，该盒子的高度取决于所有数据的高度和 -->
    <view
      :style="{
        height: totalHeight + 'rpx',
        opacity: 0,
      }"
    ></view>
    <view
      class="guessListBox"
      :style="{
        top: `${startOffset}rpx`,
      }"
    >
      <navigator
        class="guess-item"
        v-for="item in visibleData"
        :key="item.id"
        :url="`/pages/goods/goods?id=${item.id}`"
        :style="{ height: itemHeight + 'rpx' }"
      >
        <image class="image" mode="aspectFill" :src="item.picture"></image>
        <view>
          <view class="name"> {{ item.name }} </view>
          <view class="price">
            <text class="small">¥</text>
            <text>{{ item.price }}</text>
          </view>
        </view>
      </navigator>
    </view>
  </view>
</template>

<style lang="scss">
:host {
  display: block;
}
/* 分类标题 */
.caption {
  display: flex;
  justify-content: center;
  line-height: 1;
  padding: 36rpx 0 40rpx;
  font-size: 32rpx;
  color: #262626;
  .text {
    display: flex;
    justify-content: center;
    align-datalist: center;
    padding: 0 28rpx 0 30rpx;

    &::before,
    &::after {
      content: '';
      width: 20rpx;
      height: 20rpx;
      background-image: url(@/static/images/bubble.png);
      background-size: contain;
      margin: 0 10rpx;
    }
  }
}

/* 猜你喜欢 */
.scrollBox {
  // height: 600rpx;
  overflow-y: auto;
  position: relative;
  .guessListBox {
    width: 700rpx;
    padding: 0 30rpx;
    position: absolute;
    left: 20rpx;
    top: 0;
    .guess-item {
      width: 100%;
      // height: 200rpx;
      padding: 24rpx 20rpx;
      margin-bottom: 20rpx;
      border-radius: 20rpx;
      overflow: hidden;
      background-color: #fff;
      display: flex;
      justify-content: space-between;

      .image {
        width: 150rpx;
        height: 150rpx;
      }
      .name {
        margin: 10rpx 0;
        width: 300rpx;
        font-size: 26rpx;
        color: #262626;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .price {
        line-height: 1;
        padding-top: 4rpx;
        color: #cf4444;
        font-size: 26rpx;
      }
      .small {
        font-size: 80%;
      }
    }
  }
}
</style>
