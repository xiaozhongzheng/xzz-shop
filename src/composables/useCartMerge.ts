import { computed, ref } from 'vue'
import type { CartItem } from '@/types/cart'
import type { SkuItem } from '@/types/goods'
import { useCart } from './useCart'

/**
 * 购物车合并组合式函数
 * 实现购物车合并逻辑和商品状态管理
 */
export const useCartMerge = () => {
  // 购物车相关
  const { cartList, addToCart, updateCartNumber, removeFromCart } = useCart()

  // 合并状态
  const mergeStatus = ref<'idle' | 'merging' | 'success' | 'error'>('idle')
  // 合并进度
  const mergeProgress = ref(0)
  // 合并结果
  const mergeResult = ref<{
    added: number
    updated: number
    removed: number
    errors: string[]
  }>({
    added: 0,
    updated: 0,
    removed: 0,
    errors: [],
  })

  // 检查商品是否已在购物车中
  const isInCart = (skuId: string): CartItem | null => {
    return cartList.value.find((item) => item.skuId === skuId) || null
  }

  // 检查商品是否可以合并（相同 SKU）
  const canMerge = (skuId: string): boolean => {
    return isInCart(skuId) !== null
  }

  // 合并商品到购物车
  const mergeToCart = async (skuId: string, count: number = 1): Promise<boolean> => {
    try {
      const existingItem = isInCart(skuId)

      if (existingItem) {
        // 商品已存在，更新数量
        const newCount = existingItem.count + count
        await updateCartNumber(skuId, newCount)
        mergeResult.value.updated++
        return true
      } else {
        // 商品不存在，添加到购物车
        const success = await addToCart(skuId, count)
        if (success) {
          mergeResult.value.added++
        }
        return success
      }
    } catch (error) {
      console.error('合并商品失败:', error)
      mergeResult.value.errors.push(`合并商品 ${skuId} 失败: ${error}`)
      return false
    }
  }

  // 批量合并商品
  const batchMergeToCart = async (items: Array<{ skuId: string; count: number }>) => {
    mergeStatus.value = 'merging'
    mergeProgress.value = 0
    mergeResult.value = { added: 0, updated: 0, removed: 0, errors: [] }

    try {
      const total = items.length

      for (let i = 0; i < total; i++) {
        const item = items[i]
        await mergeToCart(item.skuId, item.count)
        mergeProgress.value = ((i + 1) / total) * 100
      }

      mergeStatus.value = 'success'

      // 显示合并结果
      const { added, updated, errors } = mergeResult.value
      let message = ''
      if (added > 0) message += `新增 ${added} 件商品 `
      if (updated > 0) message += `更新 ${updated} 件商品 `
      if (errors.length > 0) message += `失败 ${errors.length} 件商品`

      uni.showToast({
        title: message || '合并完成',
        icon: errors.length > 0 ? 'none' : 'success',
      })
    } catch (error) {
      mergeStatus.value = 'error'
      console.error('批量合并失败:', error)
      uni.showToast({
        title: '批量合并失败',
        icon: 'error',
      })
    }
  }

  // 智能合并（处理重复商品）
  const smartMerge = async (items: Array<{ skuId: string; count: number }>) => {
    // 按 SKU ID 分组，合并相同商品的数量
    const groupedItems = new Map<string, number>()

    items.forEach((item) => {
      const existing = groupedItems.get(item.skuId) || 0
      groupedItems.set(item.skuId, existing + item.count)
    })

    // 转换为数组格式
    const mergedItems = Array.from(groupedItems.entries()).map(([skuId, count]) => ({
      skuId,
      count,
    }))

    await batchMergeToCart(mergedItems)
  }

  // 检查购物车商品状态
  const checkCartItemStatus = (item: CartItem) => {
    const status = {
      isValid: true,
      issues: [] as string[],
    }

    // 检查库存
    if (item.count > item.stock) {
      status.isValid = false
      status.issues.push('库存不足')
    }

    // 检查商品是否有效
    if (!item.isEffective) {
      status.isValid = false
      status.issues.push('商品已下架')
    }

    // 检查价格变化
    if (item.price !== item.nowPrice) {
      status.issues.push('价格已变动')
    }

    return status
  }

  // 获取购物车状态统计
  const getCartStats = computed(() => {
    const stats = {
      total: cartList.value.length,
      valid: 0,
      invalid: 0,
      selected: 0,
      totalCount: 0,
      totalPrice: 0,
      issues: [] as string[],
    }

    cartList.value.forEach((item) => {
      const status = checkCartItemStatus(item)

      if (status.isValid) {
        stats.valid++
      } else {
        stats.invalid++
        stats.issues.push(...status.issues)
      }

      if (item.selected) {
        stats.selected++
        stats.totalCount += item.count
        stats.totalPrice += item.nowPrice * item.count
      }
    })

    return stats
  })

  // 清理无效商品
  const cleanInvalidItems = async () => {
    const invalidItems = cartList.value.filter((item) => {
      const status = checkCartItemStatus(item)
      return !status.isValid
    })

    if (invalidItems.length === 0) {
      uni.showToast({
        title: '没有无效商品',
        icon: 'none',
      })
      return
    }

    const ids = invalidItems.map((item) => item.skuId)
    await removeFromCart(ids)

    uni.showToast({
      title: `清理了 ${invalidItems.length} 件无效商品`,
      icon: 'success',
    })
  }

  // 优化购物车（合并相同商品）
  const optimizeCart = async () => {
    // 按 SKU ID 分组
    const groupedItems = new Map<string, CartItem[]>()

    cartList.value.forEach((item) => {
      const existing = groupedItems.get(item.skuId) || []
      existing.push(item)
      groupedItems.set(item.skuId, existing)
    })

    // 找出需要合并的商品组
    const itemsToMerge = Array.from(groupedItems.entries())
      .filter(([_, items]) => items.length > 1)
      .map(([skuId, items]) => ({
        skuId,
        totalCount: items.reduce((sum, item) => sum + item.count, 0),
        items,
      }))

    if (itemsToMerge.length === 0) {
      uni.showToast({
        title: '购物车已是最优状态',
        icon: 'none',
      })
      return
    }

    // 执行合并
    for (const group of itemsToMerge) {
      // 删除重复的商品
      const idsToRemove = group.items.slice(1).map((item) => item.skuId)
      await removeFromCart(idsToRemove)

      // 更新第一个商品的数量
      await updateCartNumber(group.items[0].skuId, group.totalCount)
    }

    uni.showToast({
      title: `优化完成，合并了 ${itemsToMerge.length} 组商品`,
      icon: 'success',
    })
  }

  // 重置合并状态
  const resetMergeStatus = () => {
    mergeStatus.value = 'idle'
    mergeProgress.value = 0
    mergeResult.value = { added: 0, updated: 0, removed: 0, errors: [] }
  }

  return {
    // 状态
    mergeStatus,
    mergeProgress,
    mergeResult,

    // 方法
    isInCart,
    canMerge,
    mergeToCart,
    batchMergeToCart,
    smartMerge,
    checkCartItemStatus,
    cleanInvalidItems,
    optimizeCart,
    resetMergeStatus,

    // 计算属性
    getCartStats,
  }
}
