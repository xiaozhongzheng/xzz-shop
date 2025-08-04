import { computed, ref, watch } from 'vue'
import type { CartItem } from '@/types/cart'
import { useCartStore } from '@/stores/modules/cart'

import {
  getCartListApi,
  removeCartApi,
  updateCartNumberApi,
  updateCartStatusApi,
  addCartApi,
} from '@/services/apis/cart'
import { useUserInfoStore } from '@/stores/modules/user'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const {
  setCartList,
  addCartItem,
  removeCartItem,
  clearCart,
  updateCartItem,
  updateCartAllSelected,
} = cartStore
const { cartList: localCartList } = storeToRefs(cartStore)
/**
 * 购物车组合式函数
 * 封装购物车相关的状态管理和操作逻辑
 */
export const useCart = () => {
  // 购物车列表
  const cartList = ref<CartItem[]>([])
  // 加载状态
  const loading = ref(false)
  // storeToRefs 使其变成响应式
  const { isExistUserInfo } = storeToRefs(useUserInfoStore())

  // 获取购物车列表
  const getCartList = async () => {
    console.log(isExistUserInfo.value, 'isExistUserInfo.value')
    if (isExistUserInfo.value) {
      try {
        loading.value = true
        const { result } = await getCartListApi()
        cartList.value = result
      } catch (error) {
        uni.showToast({ title: '获取购物车失败', icon: 'error' })
      } finally {
        loading.value = false
      }
    } else {
      cartList.value = localCartList.value
    }
  }

  async function mergeLocalCartToServer() {
    const localCart = localCartList.value
    if (!localCart || localCart.length === 0) return { success: true, failed: [] }
    const asyncList = localCart.map((item) => addCartApi({ skuId: item.skuId, count: item.count }))
    // 如果库存超出，则将购物车中的该商品数量修改为剩余最大库存数
    const results = await Promise.allSettled(asyncList)
    console.log(results, 'results')
    // 获取合并失败的请求
    const msgList = results
      .filter((item) => item.status === 'rejected')
      .map((item) => item?.reason?.error)
    // 将错误提示给用户
    uni.showToast({ title: msgList.join(''), icon: 'fail' })
    // 清空本地购物车缓存
    clearCart()
  }
  // 添加商品到购物车
  const addToCart = async (item: CartItem) => {
    const { skuId, count } = item
    if (isExistUserInfo.value) {
      try {
        await addCartApi({ skuId, count })
        uni.showToast({ title: '添加成功', icon: 'success' })
        await getCartList()
        return true
      } catch (error) {
        uni.showToast({ title: '添加失败', icon: 'error' })
        return false
      }
    } else {
      // 本地模式
      addCartItem(item)
      cartList.value = localCartList.value
      uni.showToast({ title: '添加成功', icon: 'success' })
      return true
    }
  }

  // 删除购物车商品
  const removeFromCart = async (ids: string[]) => {
    if (isExistUserInfo.value) {
      try {
        await removeCartApi(ids)
        uni.showToast({ title: '删除成功', icon: 'success' })
        await getCartList()
      } catch (error) {
        uni.showToast({ title: '删除失败', icon: 'error' })
      }
    } else {
      removeCartItem(ids?.[0])
      cartList.value = localCartList.value
      uni.showToast({ title: '删除成功', icon: 'success' })
    }
  }

  // 更新商品数量
  const updateCartNumber = async (skuId: string, count: number) => {
    if (isExistUserInfo.value) {
      try {
        await updateCartNumberApi(skuId, { count })
        const item = cartList.value.find((item) => item.skuId === skuId)
        if (item) item.count = count
      } catch (error) {
        uni.showToast({ title: '更新数量失败', icon: 'error' })
      }
    } else {
      updateCartItem(skuId, { count })
      cartList.value = localCartList.value
    }
  }

  // 更新商品选中状态
  const updateCartSelected = async (skuId: string, selected: boolean) => {
    if (isExistUserInfo.value) {
      try {
        await updateCartNumberApi(skuId, { selected })
        const item = cartList.value.find((item) => item.skuId === skuId)
        if (item) item.selected = selected
      } catch (error) {
        uni.showToast({ title: '更新状态失败', icon: 'error' })
      }
    } else {
      updateCartItem(skuId, { selected })
      cartList.value = localCartList.value
    }
  }

  // 全选/取消全选
  const updateAllSelected = async (selected: boolean) => {
    // console.log(selected, 'updateAllSelected')
    if (isExistUserInfo.value) {
      try {
        await updateCartStatusApi(selected)
        cartList.value.forEach((item) => {
          item.selected = selected
        })
      } catch (error) {
        uni.showToast({ title: '更新状态失败', icon: 'error' })
      }
    } else {
      updateCartAllSelected(selected)
      cartList.value = localCartList.value
    }
  }

  // 计算属性：是否全选
  const isAllSelected = computed(() => {
    return cartList.value.length > 0 && cartList.value.every((item) => item.selected)
  })

  // 计算属性：选中商品列表
  const selectedItems = computed(() => {
    return cartList.value.filter((item) => item.selected)
  })

  // 计算属性：选中商品数量
  const selectedCount = computed(() => {
    return selectedItems.value.reduce((sum, item) => sum + item.count, 0)
  })

  // 计算属性：选中商品总价
  const selectedTotalPrice = computed(() => {
    const totalPrice = selectedItems.value.reduce(
      (sum, item) => sum + item.nowPrice * item.count,
      0,
    )
    return totalPrice
  })

  // 计算属性：购物车商品总数
  const totalCount = computed(() => {
    return cartList.value.reduce((sum, item) => sum + item.count, 0)
  })

  // 计算属性：有效商品列表（库存充足）
  const effectiveItems = computed(() => {
    return cartList.value.filter((item) => item.isEffective && item.stock > 0)
  })

  // 计算属性：无效商品列表（库存不足或商品下架）
  const ineffectiveItems = computed(() => {
    return cartList.value.filter((item) => !item.isEffective || item.stock <= 0)
  })

  // 清空购物车
  const clearCartList = async () => {
    console.log(cartList.value, 'cartList.value')
    if (cartList.value.length === 0) return
    const ids = cartList.value.map((item) => item.skuId)
    await removeFromCart(ids)
  }

  // 清空无效商品
  const clearIneffectiveItems = async () => {
    if (ineffectiveItems.value.length === 0) return
    const ids = ineffectiveItems.value.map((item) => item.skuId)
    await removeFromCart(ids)
  }

  return {
    // 状态
    cartList,
    loading,

    // 方法
    getCartList,
    addToCart,
    removeFromCart,
    updateCartNumber,
    updateCartSelected,
    updateAllSelected,
    clearCartList,
    clearIneffectiveItems,
    mergeLocalCartToServer,

    // 计算属性
    isAllSelected,
    selectedItems,
    selectedCount,
    selectedTotalPrice,
    totalCount,
    effectiveItems,
    ineffectiveItems,
  }
}
