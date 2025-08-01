<script setup lang="ts">
import {
  getCartListApi,
  removeCartApi,
  updateCartNumberApi,
  updateCartStatusApi,
} from '@/services/apis/cart'
import type { CartItem } from '@/types/cart'
import { onShow } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import { useUserInfoStore } from '@/stores/modules/user'
import { useCart } from '@/composables'
const {
  cartList,
  loading,
  getCartList,
  removeFromCart,
  updateCartNumber,
  updateCartSelected,
  isAllSelected,
  updateAllSelected,
  selectedCount: selectCartNumber,
  selectedTotalPrice: selectCartPrice,
} = useCart()

const userStore = useUserInfoStore()
const removeCart = (id: string) => {
  uni.showModal({
    content: '是否删除',
    success: () => {
      removeFromCart([id])
    },
  })
}
const onChangeNumber = async (ev: any) => {
  console.log(ev, 'ev***')
  // ev.index 表示skuId
  // await updateCartNumberApi(ev.index, {
  //   count: ev.value,
  // })
  updateCartNumber(ev.index, ev.value)
}
const onChangeSelect = async (item: CartItem) => {
  // item.selected = !item.selected
  // await updateCartNumberApi(item.skuId, {
  //   selected: item.selected,
  // })
  updateCartSelected(item.skuId, !item.selected)
}
// let isAllSelected = computed(() => {
//   return cartList.value.every((v) => v.selected)
// })
const onChangeAllSelect = async () => {
  // 全选状态取反
  // const select = !isAllSelected.value
  // cartList.value.forEach((v) => (v.selected = select))
  // await updateCartStatusApi(select)
  updateAllSelected(!isAllSelected.value)
}
// const selectCartLsit = computed(() => cartList.value.filter((v) => v.selected))
// const selectCartNumber = computed(() =>
//   selectCartLsit.value.reduce((sum, item) => {
//     return sum + item.count
//   }, 0),
// )
// const selectCartPrice = computed(() =>
//   selectCartLsit.value.reduce((sum, item) => sum + item.nowPrice * item.count, 0),
// )
const toPayment = () => {
  if (!selectCartNumber.value) {
    uni.showToast({
      title: '请先选择商品~~',
      icon: 'none',
    })
    return
  }
  uni.navigateTo({
    url: '/pagesOrders/create/create',
  })
}
onShow(() => {
  getCartList()
})
</script>

<template>
  <uni-load-more status="loading" v-if="loading"></uni-load-more>
  <view v-else>
    <scroll-view scroll-y class="scroll-view">
      <!-- 购物车列表 -->
      <view class="cart-list" v-if="cartList.length">
        <!-- 优惠提示 -->
        <view class="tips">
          <text class="label">满减</text>
          <text class="desc">满1件, 即可享受9折优惠</text>
        </view>
        <!-- #ifdef MP-WEIXIN -->
        <!-- 滑动操作分区 -->
        <uni-swipe-action>
          <!-- 滑动操作项 -->
          <uni-swipe-action-item v-for="item in cartList" :key="item.skuId" class="cart-swipe">
            <!-- 商品信息 -->
            <view class="goods">
              <!-- 选中状态 -->
              <text
                class="checkbox"
                :class="{ checked: item.selected }"
                @tap="onChangeSelect(item)"
              ></text>
              <navigator
                :url="`/pages/goods/goods?id=${item.id}`"
                hover-class="none"
                class="navigator"
              >
                <image mode="aspectFill" class="picture" :src="item.picture"></image>
                <view class="meta">
                  <view class="name ellipsis">{{ item.name }}</view>
                  <view class="attrsText ellipsis">{{ item.attrsText }}</view>
                  <view class="price">{{ item.nowPrice }}</view>
                </view>
              </navigator>
              <!-- 商品数量 -->
              <view class="count">
                <!-- <text class="text">-</text>
                <input class="input" type="number" :value="item.count.toString()" />
                <text class="text">+</text> -->
                <vk-data-input-number-box
                  v-model="item.count"
                  :min="1"
                  :max="item.stock"
                  :index="item.skuId"
                  @change="onChangeNumber"
                ></vk-data-input-number-box>
              </view>
            </view>
            <!-- 右侧删除按钮 -->
            <template #right>
              <view class="cart-swipe-right">
                <button class="button delete-button" @click="removeCart(item.skuId)">删除</button>
              </view>
            </template>
          </uni-swipe-action-item>
        </uni-swipe-action>
        <!-- #endif -->

        <!-- #ifdef H5 -->
        <view v-for="item in cartList" :key="item.skuId" class="cart-swipe">
          <!-- 商品信息 -->
          <view class="goods">
            <!-- 选中状态 -->
            <text
              class="checkbox"
              :class="{ checked: item.selected }"
              @tap="onChangeSelect(item)"
            ></text>
            <navigator
              :url="`/pages/goods/goods?id=${item.id}`"
              hover-class="none"
              class="navigator"
            >
              <image mode="aspectFill" class="picture" :src="item.picture"></image>
              <view class="meta">
                <view class="name ellipsis">{{ item.name }}</view>
                <view class="attrsText ellipsis">{{ item.attrsText }}</view>
                <view class="price">{{ item.nowPrice }}</view>
              </view>
            </navigator>
            <!-- 商品数量 -->
            <view class="count">
              <!-- <text class="text">-</text>
                <input class="input" type="number" :value="item.count.toString()" />
                <text class="text">+</text> -->
              <vk-data-input-number-box
                v-model="item.count"
                :min="1"
                :max="item.stock"
                :index="item.skuId"
                @change="onChangeNumber"
              ></vk-data-input-number-box>
            </view>
            <!-- 右侧删除按钮 -->
            <view class="cart-swipe-right">
              <button class="button delete-button" @click="removeCart(item.skuId)">删除</button>
            </view>
          </view>
        </view>
        <!-- #endif -->
      </view>
      <!-- 购物车空状态 -->
      <view class="cart-blank" v-else>
        <image src="/static/images/blank_cart.png" class="image" />
        <text class="text">购物车还是空的，快来挑选好货吧</text>
        <navigator open-type="switchTab" url="/pages/index/index" hover-class="none">
          <button class="button">去首页看看</button>
        </navigator>
      </view>
      <!-- 吸底工具栏 -->
      <view class="toolbar">
        <text class="all" :class="{ checked: isAllSelected }" @tap="onChangeAllSelect">全选</text>
        <text class="text">合计:</text>
        <text class="amount">{{ selectCartPrice }}</text>
        <view class="button-grounp" @tap="toPayment">
          <view class="button payment-button" :class="{ disabled: !selectCartNumber }">
            去结算({{ selectCartNumber }})
          </view>
        </view>
      </view>

      <!-- 猜你喜欢
      <XtxGuess ref="guessRef"></XtxGuess> -->
      <!-- 底部占位空盒子 -->
      <view class="toolbar-height"></view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
// 根元素
:host {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #f7f7f8;
}

// 滚动容器
.scroll-view {
  flex: 1;
}

// 购物车列表
.cart-list {
  padding: 0 20rpx;

  // 优惠提示
  .tips {
    display: flex;
    align-items: center;
    line-height: 1;
    margin: 30rpx 10rpx;
    font-size: 26rpx;
    color: #666;

    .label {
      color: #fff;
      padding: 7rpx 15rpx 5rpx;
      border-radius: 4rpx;
      font-size: 24rpx;
      background-color: #27ba9b;
      margin-right: 10rpx;
    }
  }

  // 购物车商品
  .goods {
    display: flex;
    padding: 20rpx 20rpx 20rpx 80rpx;
    border-radius: 10rpx;
    background-color: #fff;
    position: relative;
    background-color: #f7f7f8;

    .navigator {
      display: flex;
    }

    .checkbox {
      position: absolute;
      top: 0;
      left: 0;

      display: flex;
      align-items: center;
      justify-content: center;
      width: 80rpx;
      height: 100%;

      &::before {
        content: '\e6cd';
        font-family: 'erabbit' !important;
        font-size: 40rpx;
        color: #444;
      }

      &.checked::before {
        content: '\e6cc';
        color: #27ba9b;
      }
    }

    .picture {
      width: 170rpx;
      height: 170rpx;
    }

    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20rpx;
    }

    .name {
      height: 72rpx;
      max-width: 300rpx;
      font-size: 26rpx;
      color: #444;
    }

    .attrsText {
      line-height: 1.8;
      padding: 0 15rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
    }

    .price {
      line-height: 1;
      font-size: 26rpx;
      color: #444;
      margin-bottom: 2rpx;
      color: #cf4444;

      &::before {
        content: '￥';
        font-size: 80%;
      }
    }

    // 商品数量
    .count {
      position: absolute;
      bottom: 20rpx;
      right: 5rpx;

      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 220rpx;
      height: 48rpx;

      .text {
        height: 100%;
        padding: 0 20rpx;
        font-size: 32rpx;
        color: #444;
      }

      .input {
        height: 100%;
        text-align: center;
        border-radius: 4rpx;
        font-size: 24rpx;
        color: #444;
        background-color: #f6f6f6;
      }
    }
  }

  .cart-swipe {
    display: block;
    margin: 20rpx 0;
  }

  .cart-swipe-right {
    display: flex;
    height: 60rpx;
    border-radius: 30rpx;
    position: absolute;
    right: 20rpx;

    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      padding: 6px;
      line-height: 1.5;
      color: #fff;
      font-size: 26rpx;
      border-radius: 0;
    }

    .delete-button {
      background-color: #cf4444;
    }
  }
}

// 空状态
.cart-blank,
.login-blank {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 60vh;
  .image {
    width: 400rpx;
    height: 281rpx;
  }
  .text {
    color: #444;
    font-size: 26rpx;
    margin: 20rpx 0;
  }
  .button {
    width: 240rpx !important;
    height: 60rpx;
    line-height: 60rpx;
    margin-top: 20rpx;
    font-size: 26rpx;
    border-radius: 60rpx;
    color: #fff;
    background-color: #27ba9b;
  }
}

// 吸底工具栏
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: var(--window-bottom);
  z-index: 1;

  height: 100rpx;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
  border-top: 1rpx solid #ededed;
  border-bottom: 1rpx solid #ededed;
  background-color: #fff;
  box-sizing: content-box;

  .all {
    margin-left: 25rpx;
    font-size: 14px;
    color: #444;
    display: flex;
    align-items: center;
  }

  .all::before {
    font-family: 'erabbit' !important;
    content: '\e6cd';
    font-size: 40rpx;
    margin-right: 8rpx;
  }

  .checked::before {
    content: '\e6cc';
    color: #27ba9b;
  }

  .text {
    margin-right: 8rpx;
    margin-left: 32rpx;
    color: #444;
    font-size: 14px;
  }

  .amount {
    font-size: 20px;
    color: #cf4444;

    .decimal {
      font-size: 12px;
    }

    &::before {
      content: '￥';
      font-size: 12px;
    }
  }

  .button-grounp {
    margin-left: auto;
    display: flex;
    justify-content: space-between;
    text-align: center;
    line-height: 72rpx;
    font-size: 13px;
    color: #fff;

    .button {
      width: 240rpx;
      margin: 0 10rpx;
      border-radius: 72rpx;
    }

    .payment-button {
      background-color: #27ba9b;

      &.disabled {
        opacity: 0.6;
      }
    }
  }
}
// 底部占位空盒子
.toolbar-height {
  height: 100rpx;
}
</style>
