import type { AddressItem } from '@/types/address'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// export const useAdressStore = defineStore(
//   'address',
//   () => {
//     const address = ref<AddressItem>()
//     const setAddress = (val: AddressItem) => {
//       address.value = val
//     }

//     return {
//       address,
//       setAddress,
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

// export default useUserInfoStore
export const useAdressStore = defineStore('address', {
  state: () => {
    return {
      address: {} as AddressItem,
    }
  },
  getters: {
    getAddress: (state): AddressItem => state.address,
  },
  actions: {
    setAddress(val: AddressItem): void {
      this.address = val
    },
    removeAddress(): void {
      this.address = {} as AddressItem
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
