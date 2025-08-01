<script setup lang="ts">
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
import { getGoodsApi } from '@/services/apis/category'
import type { GoodsResult } from '@/types/goods'
import { onLoad, onPageScroll } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import ServicePanel from './components/ServicePanel.vue'
import AddressPanel from './components/AddressPanel.vue'
import type {
  SkuPopupEvent,
  SkuPopupInstance,
  SkuPopupLocaldata,
} from '@/components/vk-data-goods-sku-popup/vk-data-goods-sku-popup'
import { addCartApi } from '@/services/apis/cart'
import { useAdressStore } from '@/stores/modules/address'
import type { AddressItem } from '@/types/address'
import { useCart } from '@/composables'
const query = defineProps<{
  id: string
}>()
let goods = ref<GoodsResult>()
// 是否显示SKU组件
const isShowSku = ref(false)
// 商品信息
const localdata = ref({} as SkuPopupLocaldata)
let getGoods = async () => {
  let res = await getGoodsApi(query.id)
  goods.value = res.result
  // SKU组件所需格式
  localdata.value = {
    _id: res.result.id,
    name: res.result.name,
    goods_thumb: res.result.mainPictures[0],
    spec_list: res.result.specs.map((v) => ({ name: v.name, list: v.values })),
    sku_list: res.result.skus.map((v) => ({
      _id: v.id,
      goods_id: res.result.id,
      goods_name: res.result.name,
      image: v.picture,
      price: v.price * 100, // 注意：需要乘以 100
      stock: v.inventory,
      sku_name_arr: v.specs.map((vv) => vv.valueName),
    })),
  }
}
console.log(query, 'goodsQuery')

onLoad(async () => {
  uni.showLoading({ title: '页面加载中...', icon: 'none', mask: true })
  await getGoods()
  uni.hideLoading()
})
let current = ref(1)
let onChange: UniHelper.SwiperOnChange = (e) => {
  // console.log(e.detail.current)
  current.value = e.detail.current + 1
}
let previewImg = (current: string) => {
  uni.previewImage({
    current,
    urls: goods.value?.mainPictures || [],
  })
}
let popupRef = ref<{
  open: (type?: UniHelper.UniPopupType) => void
  close: () => void
}>()
let popupName = ref<'address' | 'service' | ''>('')
console.log(popupName.value, '&&&')
let openPopup = (name: typeof popupName.value) => {
  popupName.value = name
  popupRef.value?.open()
}
let closePopup = () => {
  popupRef.value?.close()
  popupName.value = ''
}
const useAdress = useAdressStore()
const handleSuccess = (val: AddressItem) => {
  useAdress.setAddress(val)
  popupRef.value?.close()
  popupName.value = ''
}
const selectAddress = computed(() => {
  const item = useAdress.address
  // console.log(item, 'item')
  return JSON.stringify(item) !== '{}' ? item.fullLocation + item.address : '请选择收货地址'
})
enum SkuMode {
  Both = 1,
  Cart = 2,
  Buy = 3,
}
let skuMode = ref<SkuMode>(3)
let isShow = ref<boolean>(false)
const openSkuPopup = (val: SkuMode) => {
  isShowSku.value = true
  skuMode.value = val
  isShow.value = true
}

let skuPopupRef = ref<SkuPopupInstance>()
let selectArrText = computed(() => {
  console.log(skuPopupRef.value?.selectArr, '***')
  return skuPopupRef.value?.selectArr.join('').trim() || '请选择商品规格'
})
let onAddCart = async (ev: SkuPopupEvent) => {
  console.log(ev, 'ev========')
  const { buy_num, goods_name, price, sku_name_arr, stock, _id, image } = ev
  // await addCartApi({
  //   skuId: ev._id,
  //   count: ev.buy_num,
  // })
  useCart().addToCart({
    id: _id,
    skuId: _id,
    name: goods_name,
    picture: image,
    count: buy_num,
    price,
    nowPrice: price,
    stock,
    attrsText: sku_name_arr.join(''),
  })
  uni.showToast({
    title: '添加成功',
    icon: 'none',
  })
}
let onBuyNow = (ev: any) => {
  // console.log(ev, 'buynow')
  uni.navigateTo({
    url: `/pagesOrders/create/create?skuId=${ev._id}&count=${ev.buy_num}`,
  })
}
</script>

<template>
  <!-- SKU组件 -->
  <vk-data-goods-sku-popup
    v-model="isShowSku"
    :localdata="localdata"
    :mode="skuMode"
    ref="skuPopupRef"
    add-cart-background-color="rgb(243, 171, 114)"
    buy-now-background-color="rgb(90, 183, 157)"
    @add-cart="onAddCart"
    @buy-now="onBuyNow"
  ></vk-data-goods-sku-popup>
  <scroll-view scroll-y class="viewport">
    <!-- 基本信息 -->
    <view class="goods">
      <!-- 商品主图 -->
      <view class="preview">
        <swiper circular @change="onChange">
          <swiper-item v-for="item in goods?.mainPictures || []" :key="item">
            <image mode="aspectFill" :src="item" @tap="previewImg(item)" lazy-load />
          </swiper-item>
        </swiper>
        <view class="indicator">
          <text class="current">{{ current }}</text>
          <text class="split">/</text>
          <text class="total">{{ goods?.mainPictures.length }}</text>
        </view>
      </view>

      <!-- 商品简介 -->
      <view class="meta">
        <view class="price">
          <text class="symbol">¥</text>
          <text class="number">{{ goods?.price }}</text>
        </view>
        <view class="name ellipsis">{{ goods?.name }} </view>
        <view class="desc"> {{ goods?.desc }} </view>
      </view>

      <!-- 操作面板 -->
      <view class="action">
        <view class="item arrow">
          <text class="label">选择</text>
          <text class="text ellipsis" @click="openSkuPopup(SkuMode.Both)">
            {{ selectArrText }}
          </text>
        </view>
        <view class="item arrow" @tap="openPopup('address')">
          <text class="label">送至</text>
          <text class="text ellipsis">
            {{ selectAddress }}
          </text>
        </view>
        <view class="item arrow" @tap="openPopup('service')">
          <text class="label">服务</text>
          <text class="text ellipsis"> 无忧退 快速退款 免费包邮 </text>
        </view>
      </view>
    </view>

    <!-- 商品详情 -->
    <view class="detail panel">
      <view class="title">
        <text>详情</text>
      </view>
      <view class="content">
        <view class="properties">
          <!-- 属性详情 -->
          <view class="item" v-for="item in goods?.details.properties" :key="item.name">
            <text class="label">{{ item.name }}</text>
            <text class="value">{{ item.value }}</text>
          </view>
        </view>
        <!-- 图片详情 -->
        <image
          mode="widthFix"
          v-for="item in goods?.details.pictures"
          :key="item"
          :src="item"
          :lazy-load="true"
          :lazy-load-margin="0"
        ></image>
      </view>
    </view>

    <!-- 同类推荐 -->
    <view class="similar panel">
      <view class="title">
        <text>同类推荐</text>
      </view>
      <view class="content">
        <navigator
          v-for="item in goods?.similarProducts"
          :key="item.id"
          class="goods"
          hover-class="none"
          :url="`/pages/goods/goods?id=${item.id}`"
        >
          <image
            class="image"
            :lazy-load-margin="0"
            mode="aspectFill"
            :src="item.picture"
            :lazy-load="true"
          ></image>
          <view class="name ellipsis">{{ item.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ item.price }}</text>
          </view>
        </navigator>
      </view>
    </view>
  </scroll-view>

  <!-- 用户操作 -->
  <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <view class="icons">
      <button class="icons-button"><text class="icon-heart"></text>收藏</button>
      <!-- #ifdef MP-WEIXIN -->
      <button class="icons-button" open-type="contact">
        <text class="icon-handset"></text>客服
      </button>
      <!-- #endif -->
      <navigator class="icons-button" url="/pages/cart/cart2" open-type="navigate">
        <text class="icon-cart"></text>购物车
      </navigator>
    </view>
    <view class="buttons">
      <view class="addcart" @click="openSkuPopup(SkuMode.Cart)"> 加入购物车 </view>
      <view class="buynow" @click="openSkuPopup(SkuMode.Buy)"> 立即购买 </view>
    </view>
  </view>

  <uni-popup
    v-if="popupName"
    ref="popupRef"
    type="bottom"
    border-radius="10px 10px 0 0"
    background-color="#fff"
  >
    <ServicePanel v-if="popupName === 'service'" @close="closePopup" />
    <AddressPanel v-else @close="closePopup" @success="handleSuccess" />
    <!-- <button @click="popupRef?.close()">关闭按钮</button> -->
  </uni-popup>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.viewport {
  background-color: #f4f4f4;
}

.panel {
  margin-top: 20rpx;
  background-color: #fff;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90rpx;
    line-height: 1;
    padding: 30rpx 60rpx 30rpx 6rpx;
    position: relative;
    text {
      padding-left: 10rpx;
      font-size: 28rpx;
      color: #333;
      font-weight: 600;
      border-left: 4rpx solid #27ba9b;
    }
    navigator {
      font-size: 24rpx;
      color: #666;
    }
  }
}

.arrow {
  &::after {
    position: absolute;
    top: 50%;
    right: 30rpx;
    content: '\e6c2';
    color: #ccc;
    font-family: 'erabbit' !important;
    font-size: 32rpx;
    transform: translateY(-50%);
  }
}

/* 商品信息 */
.goods {
  background-color: #fff;
  .preview {
    height: 750rpx;
    position: relative;
    image {
      width: 750rpx;
      height: 750rpx;
    }
    .indicator {
      height: 40rpx;
      padding: 0 24rpx;
      line-height: 40rpx;
      border-radius: 30rpx;
      color: #fff;
      font-family: Arial, Helvetica, sans-serif;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      bottom: 30rpx;
      right: 30rpx;
      .current {
        font-size: 26rpx;
      }
      .split {
        font-size: 24rpx;
        margin: 0 1rpx 0 2rpx;
      }
      .total {
        font-size: 24rpx;
      }
    }
  }
  .meta {
    position: relative;
    border-bottom: 1rpx solid #eaeaea;
    .price {
      height: 130rpx;
      padding: 25rpx 30rpx 0;
      color: #fff;
      font-size: 34rpx;
      box-sizing: border-box;
      background-color: #35c8a9;
    }
    .number {
      font-size: 56rpx;
    }
    .brand {
      width: 160rpx;
      height: 80rpx;
      overflow: hidden;
      position: absolute;
      top: 26rpx;
      right: 30rpx;
    }
    .name {
      max-height: 88rpx;
      line-height: 1.4;
      margin: 20rpx;
      font-size: 32rpx;
      color: #333;
    }
    .desc {
      line-height: 1;
      padding: 0 20rpx 30rpx;
      font-size: 24rpx;
      color: #cf4444;
    }
  }
  .action {
    padding-left: 20rpx;
    .item {
      height: 90rpx;
      padding-right: 60rpx;
      border-bottom: 1rpx solid #eaeaea;
      font-size: 26rpx;
      color: #333;
      position: relative;
      display: flex;
      align-items: center;
      &:last-child {
        border-bottom: 0 none;
      }
    }
    .label {
      width: 60rpx;
      color: #898b94;
      margin: 0 16rpx 0 10rpx;
    }
    .text {
      flex: 1;
      // -webkit-line-clamp: 1;
    }
  }
}

/* 商品详情 */
.detail {
  padding-left: 20rpx;
  .content {
    margin-left: -20rpx;
    .image {
      width: 100%;
    }
  }
  .properties {
    padding: 0 20rpx;
    margin-bottom: 30rpx;
    .item {
      display: flex;
      line-height: 2;
      padding: 10rpx;
      font-size: 26rpx;
      color: #333;
      border-bottom: 1rpx dashed #ccc;
    }
    .label {
      width: 200rpx;
    }
    .value {
      flex: 1;
    }
  }
}

/* 同类推荐 */
.similar {
  .content {
    padding: 0 20rpx 200rpx;
    background-color: #f4f4f4;
    display: flex;
    flex-wrap: wrap;
    .goods {
      width: 340rpx;
      padding: 24rpx 20rpx 20rpx;
      margin: 20rpx 7rpx;
      border-radius: 10rpx;
      background-color: #fff;
    }
    .image {
      width: 300rpx;
      height: 260rpx;
    }
    .name {
      height: 80rpx;
      margin: 10rpx 0;
      font-size: 26rpx;
      color: #262626;
    }
    .price {
      line-height: 1;
      font-size: 20rpx;
      color: #cf4444;
    }
    .number {
      font-size: 26rpx;
      margin-left: 2rpx;
    }
  }
  navigator {
    &:nth-child(even) {
      margin-right: 0;
    }
  }
}

/* 底部工具栏 */
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: #fff;
  height: 100rpx;
  padding: 0 20rpx var(--window-bottom);
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;
  .buttons {
    display: flex;
    & > view {
      width: 220rpx;
      text-align: center;
      line-height: 72rpx;
      font-size: 26rpx;
      color: #fff;
      border-radius: 72rpx;
    }
    .addcart {
      background-color: #ffa868;
    }
    .buynow,
    .payment {
      background-color: #27ba9b;
      margin-left: 20rpx;
    }
  }
  .icons {
    padding-right: 10rpx;
    display: flex;
    align-items: center;
    flex: 1;
    .icons-button {
      flex: 1;
      text-align: center;
      line-height: 1.4;
      padding: 0;
      margin: 0;
      border-radius: 0;
      font-size: 20rpx;
      color: #333;
      background-color: #fff;
      &::after {
        border: none;
      }
    }
    text {
      display: block;
      font-size: 34rpx;
    }
  }
}
</style>
