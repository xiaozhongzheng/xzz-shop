import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem } from '@/types/cart'

export const useCartStore = defineStore(
  'cartList',
  () => {
    // 状态
    const cartList = ref<CartItem[]>([])

    // 计算属性
    const cartCount = computed(() => {
      return cartList.value.reduce((sum, item) => sum + item.count, 0)
    })

    const selectedItems = computed(() => {
      return cartList.value.filter((item) => item.selected)
    })

    const selectedCount = computed(() => {
      return selectedItems.value.reduce((sum, item) => sum + item.count, 0)
    })

    const selectedTotalPrice = computed(() => {
      return selectedItems.value.reduce((sum, item) => sum + item.nowPrice * item.count, 0)
    })

    const isAllSelected = computed(() => {
      return cartList.value.length > 0 && cartList.value.every((item) => item.selected)
    })

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

    const toggleCartItemSelected = (skuId: string) => {
      const item = cartList.value.find((i) => i.skuId === skuId)
      if (item) {
        item.selected = !item.selected
      }
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

      // 计算属性
      cartCount,
      selectedItems,
      selectedCount,
      selectedTotalPrice,
      isAllSelected,

      // 方法
      setCartList,
      addCartItem,
      removeCartItem,
      removeCartItems,
      clearCart,
      updateCartItem,
      updateCartAllSelected,
      toggleCartItemSelected,
      getCartItem,
      hasCartItem,
    }
  },
  {
    persist: {
      storage: {
        getItem: (key: string) => localStorage.getItem(key),
        setItem: (key: string, value: string) => localStorage.setItem(key, value),
      },
    },
  },
)
