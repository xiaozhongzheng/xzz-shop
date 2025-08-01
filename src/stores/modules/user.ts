import type { LoginResult } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// export const useUserInfoStore = defineStore(
//   'userInfo',
//   () => {
//     const userInfo = ref<LoginResult>()
//     const setUserInfo = (val: LoginResult) => {
//       userInfo.value = val
//     }
//     const removeUserInfo = () => {
//       userInfo.value = undefined
//     }
//     return {
//       userInfo,
//       setUserInfo,
//       removeUserInfo,
//     }
//   },
//   {
//     persist: {
//       storage: {
//         getItem(key) {
//           return uni.getStorageSync(key)
//         },
//         setItem(key, value) {
//           uni.setStorageSync(key, value)
//         },
//       },
//     },
//   },
// )

export const useUserInfoStore = defineStore('userInfo', {
  state: () => {
    return {
      userInfo: {},
    }
  },
  getters: {
    getUserInfo: (state): LoginResult => state.userInfo as LoginResult,
    isExistUserInfo(state): boolean {
      return Object.keys(state.userInfo).length > 0
    },
  },
  actions: {
    setUserInfo(val: LoginResult): void {
      this.userInfo = val
    },
    removeUserInfo(): void {
      this.userInfo = {} as LoginResult
    },
  },
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
})
