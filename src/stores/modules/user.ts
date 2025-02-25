import type { LoginResult } from '@/types/member'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserInfoStore = defineStore(
  'userInfo',
  () => {
    const userInfo = ref<LoginResult>()
    const setUserInfo = (val: LoginResult) => {
      userInfo.value = val
    }
    return {
      userInfo,
      setUserInfo,
    }
  },
  {
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)

// export default useUserInfoStore
