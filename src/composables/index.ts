// 用于封装组合式函数（hooks）
import type { GuessInstance } from '@/components/components'
import { ref } from 'vue'
export const useGuessList = () => {
  const guessRef = ref<GuessInstance>()
  const onScrolltolower = () => {
    guessRef.value?.getGuessList()
  }
  return {
    guessRef,
    onScrolltolower,
  }
}
