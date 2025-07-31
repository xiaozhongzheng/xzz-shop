import { computed, ref } from 'vue'
import type { CartItem } from '@/types/cart'
import {
  getCartListApi,
  removeCartApi,
  updateCartNumberApi,
  updateCartStatusApi,
  addCartApi,
} from '@/services/apis/cart'
import { useUserInfoStore } from '@/stores/modules/user'

/**
 * 购物车组合式函数
 * 封装购物车相关的状态管理和操作逻辑
 */
export const useCart = () => {
  // 购物车列表
  const cartList = ref<CartItem[]>([])
  // 加载状态
  const loading = ref(false)
  // 用户状态
  const userStore = useUserInfoStore()

  // 获取购物车列表
  const getCartList = async () => {
    if (!userStore.userInfo) return

    try {
      loading.value = true
      const { result } = await getCartListApi()
      cartList.value = result
    } catch (error) {
      console.error('获取购物车列表失败:', error)
      uni.showToast({
        title: '获取购物车失败',
        icon: 'error',
      })
    } finally {
      loading.value = false
    }
  }

  // 添加商品到购物车
  const addToCart = async (skuId: string, count: number = 1) => {
    if (!userStore.userInfo) {
      uni.showToast({
        title: '请先登录',
        icon: 'none',
      })
      return false
    }

    try {
      await addCartApi({ skuId, count })
      uni.showToast({
        title: '添加成功',
        icon: 'success',
      })
      // 刷新购物车列表
      await getCartList()
      return true
    } catch (error) {
      console.error('添加购物车失败:', error)
      uni.showToast({
        title: '添加失败',
        icon: 'error',
      })
      return false
    }
  }

  // 删除购物车商品
  const removeFromCart = async (ids: string[]) => {
    try {
      await removeCartApi(ids)
      uni.showToast({
        title: '删除成功',
        icon: 'success',
      })
      await getCartList()
    } catch (error) {
      console.error('删除购物车商品失败:', error)
      uni.showToast({
        title: '删除失败',
        icon: 'error',
      })
    }
  }

  // 更新商品数量
  const updateCartNumber = async (skuId: string, count: number) => {
    try {
      await updateCartNumberApi(skuId, { count })
      // 更新本地数据
      const item = cartList.value.find((item) => item.skuId === skuId)
      if (item) {
        item.count = count
      }
    } catch (error) {
      console.error('更新商品数量失败:', error)
      uni.showToast({
        title: '更新数量失败',
        icon: 'error',
      })
    }
  }

  // 更新商品选中状态
  const updateCartSelected = async (skuId: string, selected: boolean) => {
    try {
      await updateCartNumberApi(skuId, { selected })
      // 更新本地数据
      const item = cartList.value.find((item) => item.skuId === skuId)
      if (item) {
        item.selected = selected
      }
    } catch (error) {
      console.error('更新选中状态失败:', error)
      uni.showToast({
        title: '更新状态失败',
        icon: 'error',
      })
    }
  }

  // 全选/取消全选
  const updateAllSelected = async (selected: boolean) => {
    try {
      await updateCartStatusApi(selected)
      // 更新本地数据
      cartList.value.forEach((item) => {
        item.selected = selected
      })
    } catch (error) {
      console.error('更新全选状态失败:', error)
      uni.showToast({
        title: '更新状态失败',
        icon: 'error',
      })
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
    return selectedItems.value.reduce((sum, item) => sum + item.nowPrice * item.count, 0)
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
  const clearCart = async () => {
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
    clearCart,
    clearIneffectiveItems,

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
