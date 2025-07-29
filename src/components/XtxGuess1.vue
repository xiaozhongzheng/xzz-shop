<script setup lang="ts">
//
import { getGoodsGuessListApi } from '@/services/apis/home'
import type { PageParams } from '@/types/global'
import type { GuessItem } from '@/types/home'
import { computed, onMounted, reactive, ref } from 'vue'
import { debounce } from '@/utils'
let guessList = ref<GuessItem[]>([])
const dataList = ref([
  {
    id: '4026198',
    name: '经典格子元素，男童加绒格子衬衫',
    desc: '经典格子元素，翻盖小贴袋装饰app',
    price: '125.00',
    picture: 'https://yanxuan-item.nosdn.127.net/084f82c43a71bbc4d280fbb09a47a028.jpg',
    orderNum: 53,
  },
  {
    id: '4013563',
    name: '轻松出行复古经典老花时尚女式钥匙包',
    desc: '简约潮流女士钥匙包app',
    price: '88.00',
    picture: 'https://yanxuan-item.nosdn.127.net/cedfb4827ca489e574abeb5d19ce21e5.jpg',
    orderNum: 25,
  },
  {
    id: '4007963',
    name: '新疆棉宝宝时尚涂鸦短袖连体衣59-90cm',
    desc: '创意手绘图案，透气纯棉面料，3色可选app',
    price: '69.00',
    picture: 'https://yanxuan-item.nosdn.127.net/a8b170b3114d33dae0ae98cddb5fb3f6.jpg',
    orderNum: 2008,
  },
  {
    id: '1113002',
    name: '谷风一木3层硬抽3盒/提',
    desc: '一纸三层，吸水耐用不易破app',
    price: '15.90',
    picture: 'https://yanxuan-item.nosdn.127.net/0f961546dde35328e7842afe11b98d79.jpg',
    orderNum: 388,
  },
  {
    id: '1513021',
    name: '湿水不易破臻护倍韧4层软抽纸巾6包/提',
    desc: '干湿两用柔韧并济app',
    price: '29.90',
    picture: 'https://yanxuan-item.nosdn.127.net/78d56b565a01d241ccae8d38717d3a1e.png',
    orderNum: 693,
  },
  {
    id: '1113001',
    name: '谷风一木3层软抽面巾纸6包/提',
    desc: '进口原木浆和风高颜值app',
    price: '15.90',
    picture: 'https://yanxuan-item.nosdn.127.net/f0373e8b2cf9399e53cfac5b2fac0cda.jpg',
    orderNum: 667,
  },
  {
    id: '1077003',
    name: '谷风一木3层180g卷纸10卷/提',
    desc: '4层180g升级款过渡期随机发货！app',
    price: '27.90',
    picture: 'https://yanxuan-item.nosdn.127.net/544dc93575aca22f9d3ef614ebf1e362.jpg',
    orderNum: 352,
  },
  {
    id: '3990408',
    name: '1滴强力去污澳洲超浓缩不伤手洗洁精400ml',
    desc: '温和高效去污，一瓶可作多用app',
    price: '17.90',
    picture: 'https://yanxuan-item.nosdn.127.net/9ffdc0b1f6dbbe2e9f10a187444c01a3.png',
    orderNum: 427,
  },
  {
    id: '4005106',
    name: '新疆棉，儿童色织条纹短袖连体衣59-90cm',
    desc: '100%棉面料，穿着舒适透气app',
    price: '59.00',
    picture: 'https://yanxuan-item.nosdn.127.net/2b3748a78c10027dca96504d05acc4bc.png',
    orderNum: 1264,
  },
  {
    id: '1343000',
    name: '最不舍柔情似水的你！平台云音乐3层软抽6包',
    desc: '我的心意，跃然纸上app',
    price: '17.90',
    picture: 'https://yanxuan-item.nosdn.127.net/c43370d1090d445913dcb69a34875a59.jpg',
    orderNum: 374,
  },
])
const totalHeight = ref(0)
// Reqired 可以将参数变为必选
let queryParams: Required<PageParams> = {
  page: 1,
  pageSize: 10,
}
// let getGuessList = async () => {
//   let { result } = await getGoodsGuessListApi(queryParams)
//   guessList.value = result.dataList
// }

onMounted(() => {
  // getGuessList()
})
const itemHeight = 200 // 列表每个项的高度
const visibleSize = 600 // 可视化区域
const startIndex = ref(0)
const endIndex = ref(0)
const scrollTop = ref(0)
const startOffset = computed(() => {
  return startIndex.value * itemHeight
})
const scrollRef = ref()
const showSize = Math.floor(visibleSize / itemHeight) // 可是区域展示item的个数
console.log()
onMounted(() => {
  totalHeight.value = itemHeight * dataList.value.length
  console.log(totalHeight.value, 'totalHeight.value')
  // guessList.value = dataList.value
  handleScroll()
})
const handleScroll = () => {
  // console.log(scrollRef.value.$el.scrollTop)
  const scorllDom = scrollRef.value.$el
  scrollTop.value = scorllDom.scrollTop * 2 // 获取滚动条滚动的距离
  console.log(scrollTop.value, 'scrollTop')
  startIndex.value = preStartIndex.value
  endIndex.value = nextEndIndex.value
  console.log(startIndex.value, endIndex.value, 'index')
}
const preStartIndex = computed(() => {
  let index = Math.floor(scrollTop.value / itemHeight)
  if (index - 2 > 0) {
    return index - 2
  }
  return index
})
const nextEndIndex = computed(() => {
  let index = startIndex.value + showSize
  const lastIndex = dataList.value.length
  if (index > lastIndex) {
    // 表示没有更多数据展示了
    return dataList.value.length - 1
  }
  index += 2 // 向下多展示2条数据，防止滑动时出现白屏

  return index > lastIndex ? lastIndex : index
})
const visibleData = computed(() => {
  // 计算可视区域要展示的数据
  return dataList.value.slice(startIndex.value, endIndex.value)
})
const debounceScroll = debounce(handleScroll, 100)
</script>

<template>
  <!-- 猜你喜欢 -->
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <view class="scrollBox" @scroll="debounceScroll" ref="scrollRef">
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
        <!-- <view
        class="guess-item"
        v-for="item in visibleData"
        :key="item.id"
        :style="{ height: itemHeight + 'rpx' }"
      > -->
        <image class="image" mode="aspectFill" :src="item.picture"></image>
        <view>
          <view class="name"> {{ item.name }} </view>
          <view class="price">
            <text class="small">¥</text>
            <text>{{ item.price }}</text>
          </view>
        </view>
        <!-- </view> -->
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
  height: 600rpx;
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
