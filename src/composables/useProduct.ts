import { computed, ref } from 'vue'
import type { GoodsResult, SkuItem, SpecItem } from '@/types/goods'
import { useCart } from './useCart'

/**
 * 商品组合式函数
 * 封装商品相关的状态管理和价格计算逻辑
 */
export const useProduct = () => {
  // 商品详情
  const goodsInfo = ref<GoodsResult | null>(null)
  // 当前选中的 SKU
  const selectedSku = ref<SkuItem | null>(null)
  // 当前选中的规格
  const selectedSpecs = ref<Record<string, string>>({})
  // 商品数量
  const count = ref(1)
  // 加载状态
  const loading = ref(false)

  // 购物车相关
  const { addToCart } = useCart()

  // 设置商品信息
  const setGoodsInfo = (info: GoodsResult) => {
    goodsInfo.value = info
    // 如果有默认 SKU，设置为选中
    if (info.skus.length > 0) {
      selectedSku.value = info.skus[0]
    }
  }

  // 选择规格
  const selectSpec = (specName: string, valueName: string) => {
    selectedSpecs.value[specName] = valueName
    // 根据选中的规格找到对应的 SKU
    const matchedSku = findMatchedSku()
    if (matchedSku) {
      selectedSku.value = matchedSku
    }
  }

  // 根据选中的规格找到匹配的 SKU
  const findMatchedSku = (): SkuItem | null => {
    if (!goodsInfo.value) return null

    return (
      goodsInfo.value.skus.find((sku) => {
        return sku.specs.every((spec) => {
          return selectedSpecs.value[spec.name] === spec.valueName
        })
      }) || null
    )
  }

  // 更新商品数量
  const updateCount = (newCount: number) => {
    if (newCount < 1) return
    if (selectedSku.value && newCount > selectedSku.value.inventory) {
      uni.showToast({
        title: '库存不足',
        icon: 'none',
      })
      return
    }
    count.value = newCount
  }

  // 计算属性：当前价格
  const currentPrice = computed(() => {
    return selectedSku.value?.price || goodsInfo.value?.price || 0
  })

  // 计算属性：原价
  const oldPrice = computed(() => {
    return selectedSku.value?.oldPrice || goodsInfo.value?.oldPrice || 0
  })

  // 计算属性：折扣率
  const discountRate = computed(() => {
    if (oldPrice.value === 0) return 1
    return ((currentPrice.value / oldPrice.value) * 10).toFixed(1)
  })

  // 计算属性：是否打折
  const isDiscounted = computed(() => {
    return currentPrice.value < oldPrice.value
  })

  // 计算属性：总价
  const totalPrice = computed(() => {
    return currentPrice.value * count.value
  })

  // 计算属性：节省金额
  const savedAmount = computed(() => {
    return (oldPrice.value - currentPrice.value) * count.value
  })

  // 计算属性：库存状态
  const stockStatus = computed(() => {
    if (!selectedSku.value) return 'loading'
    if (selectedSku.value.inventory <= 0) return 'outOfStock'
    if (selectedSku.value.inventory < 10) return 'lowStock'
    return 'inStock'
  })

  // 计算属性：库存文本
  const stockText = computed(() => {
    switch (stockStatus.value) {
      case 'outOfStock':
        return '已售罄'
      case 'lowStock':
        return `仅剩 ${selectedSku.value?.inventory} 件`
      case 'inStock':
        return `库存 ${selectedSku.value?.inventory} 件`
      default:
        return '加载中...'
    }
  })

  // 计算属性：是否可以选择该规格值
  const isSpecValueAvailable = computed(() => {
    return (specName: string, valueName: string) => {
      if (!goodsInfo.value) return false

      // 临时设置规格值
      const tempSpecs = { ...selectedSpecs.value, [specName]: valueName }

      // 检查是否有匹配的 SKU
      return goodsInfo.value.skus.some((sku) => {
        return sku.specs.every((spec) => {
          return tempSpecs[spec.name] === spec.valueName
        })
      })
    }
  })

  // 计算属性：规格是否完整选择
  const isSpecsComplete = computed(() => {
    if (!goodsInfo.value) return false
    return goodsInfo.value.specs.every((spec) => {
      return selectedSpecs.value[spec.name]
    })
  })

  // 计算属性：是否可以购买
  const canPurchase = computed(() => {
    return isSpecsComplete.value && stockStatus.value !== 'outOfStock'
  })

  // 添加到购物车
  const addToCartAction = async () => {
    if (!canPurchase.value) {
      uni.showToast({
        title: '请选择完整规格',
        icon: 'none',
      })
      return false
    }

    if (!selectedSku.value) {
      uni.showToast({
        title: '请选择商品规格',
        icon: 'none',
      })
      return false
    }

    return await addToCart(selectedSku.value.id, count.value)
  }

  // 立即购买
  const buyNow = () => {
    if (!canPurchase.value) {
      uni.showToast({
        title: '请选择完整规格',
        icon: 'none',
      })
      return false
    }

    if (!selectedSku.value) {
      uni.showToast({
        title: '请选择商品规格',
        icon: 'none',
      })
      return false
    }

    // 跳转到订单确认页面
    uni.navigateTo({
      url: `/pagesOrders/create/create?skuId=${selectedSku.value.id}&count=${count.value}`,
    })
    return true
  }

  // 重置状态
  const reset = () => {
    goodsInfo.value = null
    selectedSku.value = null
    selectedSpecs.value = {}
    count.value = 1
  }

  // 格式化价格
  const formatPrice = (price: number) => {
    return `¥${price.toFixed(2)}`
  }

  // 格式化折扣
  const formatDiscount = (rate: string) => {
    return `${rate}折`
  }

  return {
    // 状态
    goodsInfo,
    selectedSku,
    selectedSpecs,
    count,
    loading,

    // 方法
    setGoodsInfo,
    selectSpec,
    updateCount,
    addToCartAction,
    buyNow,
    reset,
    formatPrice,
    formatDiscount,

    // 计算属性
    currentPrice,
    oldPrice,
    discountRate,
    isDiscounted,
    totalPrice,
    savedAmount,
    stockStatus,
    stockText,
    isSpecValueAvailable,
    isSpecsComplete,
    canPurchase,
  }
}
