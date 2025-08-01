import { computed, ref } from 'vue'
import type { GoodsResult, SkuItem } from '@/types/goods'
import type { CartItem } from '@/types/cart'
import type { SkuPopupLocaldata } from '@/components/vk-data-goods-sku-popup/vk-data-goods-sku-popup'
import { useCart } from './useCart'
import { getGoodsApi } from '@/services/apis/category'

/**
 * 商品组合式函数
 * 根据 goods 页面实际需求重构，适配 SKU 组件和业务逻辑
 */
export const useProduct = () => {
  // 商品详情
  const goodsInfo = ref<GoodsResult | null>(null)
  // 是否显示 SKU 组件
  const isShowSku = ref(false)
  // SKU 组件所需数据格式
  const localdata = ref<SkuPopupLocaldata>({} as SkuPopupLocaldata)
  // 加载状态
  const loading = ref(false)
  // 轮播图当前索引
  const current = ref(1)
  // 购物车相关
  const { addToCart } = useCart()

  // 设置商品信息
  const setGoodsInfo = (info: GoodsResult) => {
    goodsInfo.value = info
    // 转换为 SKU 组件所需格式
    localdata.value = {
      _id: info.id,
      name: info.name,
      goods_thumb: info.mainPictures[0],
      spec_list: info.specs.map((v) => ({
        name: v.name,
        list: v.values,
      })),
      sku_list: info.skus.map((v) => ({
        _id: v.id,
        goods_id: info.id,
        goods_name: info.name,
        image: v.picture,
        price: v.price * 100, // 注意：需要乘以 100
        stock: v.inventory,
        sku_name_arr: v.specs.map((vv) => vv.valueName),
      })),
    }
  }

  // 获取商品详情
  const getGoodsDetail = async (id: string) => {
    try {
      loading.value = true
      // 这里需要根据实际的 API 调用
      const { result } = await getGoodsApi(id)
      setGoodsInfo(result)
    } catch (error) {
      console.error('获取商品详情失败:', error)
      uni.showToast({
        title: '获取商品详情失败',
        icon: 'error',
      })
    } finally {
      loading.value = false
    }
  }

  // 轮播图切换
  const onSwiperChange = (e: any) => {
    current.value = e.detail.current + 1
  }

  // 预览图片
  const previewImage = (current: string) => {
    if (!goodsInfo.value?.mainPictures) return

    uni.previewImage({
      current,
      urls: goodsInfo.value.mainPictures,
    })
  }

  // 显示/隐藏 SKU 组件
  const showSkuPopup = () => {
    isShowSku.value = true
  }

  const hideSkuPopup = () => {
    isShowSku.value = false
  }

  // 添加到购物车
  const addToCartAction = async (ev: any) => {
    const { buy_num, goods_name, price, sku_name_arr, stock, _id, image } = ev

    const cartItem: CartItem = {
      id: _id,
      skuId: _id,
      name: goods_name,
      picture: image,
      count: buy_num,
      price: price / 100,
      nowPrice: price / 100,
      stock,
      selected: true,
      attrsText: sku_name_arr.join(''),
      isEffective: true,
    }

    const success = await addToCart(cartItem)
    if (success) {
      uni.showToast({
        title: '添加成功',
        icon: 'success',
      })
      hideSkuPopup()
    }
  }

  // 立即购买
  const buyNow = (ev: any) => {
    const { _id, buy_num } = ev
    uni.navigateTo({
      url: `/pagesOrders/create/create?skuId=${_id}&count=${buy_num}`,
    })
    hideSkuPopup()
  }

  // 计算属性：商品价格
  const currentPrice = computed(() => {
    return goodsInfo.value?.price || 0
  })

  // 计算属性：商品原价
  const oldPrice = computed(() => {
    return goodsInfo.value?.oldPrice || 0
  })

  // 计算属性：是否打折
  const isDiscounted = computed(() => {
    return currentPrice.value < oldPrice.value
  })

  // 计算属性：折扣率
  const discountRate = computed(() => {
    if (oldPrice.value === 0) return 1
    return ((currentPrice.value / oldPrice.value) * 10).toFixed(1)
  })

  // 计算属性：商品图片总数
  const imageCount = computed(() => {
    return goodsInfo.value?.mainPictures?.length || 0
  })

  // 计算属性：是否有库存
  const hasStock = computed(() => {
    return goodsInfo.value?.skus?.some((sku) => sku.inventory > 0) || false
  })

  // 计算属性：最低价格
  const minPrice = computed(() => {
    if (!goodsInfo.value?.skus?.length) return currentPrice.value
    return Math.min(...goodsInfo.value.skus.map((sku) => sku.price))
  })

  // 计算属性：最高价格
  const maxPrice = computed(() => {
    if (!goodsInfo.value?.skus?.length) return currentPrice.value
    return Math.max(...goodsInfo.value.skus.map((sku) => sku.price))
  })

  // 计算属性：价格区间文本
  const priceRangeText = computed(() => {
    if (minPrice.value === maxPrice.value) {
      return `¥${minPrice.value.toFixed(2)}`
    }
    return `¥${minPrice.value.toFixed(2)} - ¥${maxPrice.value.toFixed(2)}`
  })

  // 格式化价格
  const formatPrice = (price: number) => {
    return `¥${price.toFixed(2)}`
  }

  // 格式化折扣
  const calFormatDiscount = (rate: any) => {
    // 假设 rate 是 0.85 这样的数字，显示为 "85折"
    if (typeof rate !== 'number') return ''
    return `${Math.round(rate * 10)}折`
  }

  // 重置状态
  const reset = () => {
    goodsInfo.value = null
    isShowSku.value = false
    localdata.value = {} as SkuPopupLocaldata
    current.value = 1
  }

  return {
    // 状态
    goodsInfo,
    isShowSku,
    localdata,
    loading,
    current,

    // 方法
    setGoodsInfo,
    getGoodsDetail,
    onSwiperChange,
    previewImage,
    showSkuPopup,
    hideSkuPopup,
    addToCartAction,
    buyNow,
    formatPrice,
    calFormatDiscount,
    reset,

    // 计算属性
    currentPrice,
    oldPrice,
    isDiscounted,
    discountRate,
    imageCount,
    hasStock,
    minPrice,
    maxPrice,
    priceRangeText,
  }
}
