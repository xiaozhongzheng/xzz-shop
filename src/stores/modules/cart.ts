import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CartItem } from '@/types/cart'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartList: [] as CartItem[],
  }),
  actions: {
    setCartList(list: CartItem[]) {
      this.cartList = list
    },
    addCartItem(item: CartItem) {
      const exist = this.cartList.find((i) => i.skuId === item.skuId)
      if (exist) {
        exist.count += item.count
      } else {
        this.cartList.push(item)
      }
    },
    removeCartItem(skuId: string) {
      this.cartList = this.cartList.filter((i) => i.skuId !== skuId)
    },
    clearCart() {
      this.cartList = []
    },
    updateCartItem(skuId: string, data: Partial<CartItem>) {
      const item = this.cartList.find((i) => i.skuId === skuId)
      if (item) Object.assign(item, data)
    },
  },
  persist: {
    storage: {
      getItem: (key) => localStorage.getItem(key),
      setItem: (key, value) => localStorage.setItem(key, value),
    },
  },
})
