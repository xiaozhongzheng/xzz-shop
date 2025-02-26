// 用于封装组合式函数（hooks）
import type { GuessInstance } from '@/components/components'
import { ref } from 'vue'
export const useGuessList = () => {
  let guessRef = ref<GuessInstance>()
  let onScrolltolower = () => {
    guessRef.value?.getGuessList()
  }
  return {
    guessRef,
    onScrolltolower,
  }
}
