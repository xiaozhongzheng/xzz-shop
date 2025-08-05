import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem } from '@/types/cart'

export const useCartStore = defineStore(
  'cartList',
  () => {
    // 状态
    const cartList = ref<CartItem[]>([])

    // 方法
    const setCartList = (list: CartItem[]) => {
      cartList.value = list
    }

    const addCartItem = (item: CartItem) => {
      const exist = cartList.value.find((i) => i.skuId === item.skuId)
      if (exist) {
        exist.count += item.count
      } else {
        cartList.value.push(item)
      }
    }

    const removeCartItem = (skuId: string) => {
      cartList.value = cartList.value.filter((i) => i.skuId !== skuId)
    }

    const removeCartItems = (skuIds: string[]) => {
      cartList.value = cartList.value.filter((i) => !skuIds.includes(i.skuId))
    }

    const clearCart = () => {
      cartList.value = []
    }

    const updateCartItem = (skuId: string, data: Partial<CartItem>) => {
      const item = cartList.value.find((i) => i.skuId === skuId)
      if (item) {
        Object.assign(item, data)
      }
    }

    const updateCartAllSelected = (selected: boolean) => {
      cartList.value.forEach((item) => {
        item.selected = selected
      })
    }

    const getCartItem = (skuId: string) => {
      return cartList.value.find((i) => i.skuId === skuId)
    }

    const hasCartItem = (skuId: string) => {
      return cartList.value.some((i) => i.skuId === skuId)
    }

    return {
      // 状态
      cartList,

      // 方法
      setCartList,
      addCartItem,
      removeCartItem,
      removeCartItems,
      clearCart,
      updateCartItem,
      updateCartAllSelected,
      getCartItem,
      hasCartItem,
    }
  },
  {
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)
