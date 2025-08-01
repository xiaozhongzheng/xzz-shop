// 用于封装组合式函数（hooks）
import type { GuessInstance } from '@/components/components'
import { ref } from 'vue'

// // 导出现有的 useGuessList
// export const useGuessList = () => {
//   const guessRef = ref<GuessInstance>()
//   const onScrolltolower = () => {
//     guessRef.value?.getGuessList()
//   }
//   return {
//     guessRef,
//     onScrolltolower,
//   }
// }

// 导出购物车相关 composables
export { useCart } from './useCart'
export { useProduct } from './useProduct'
