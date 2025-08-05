import { useUserInfoStore } from '@/stores/modules/user'
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 请求拦截器
function requestInterceptor(options: UniApp.RequestOptions) {
  // 1. 非 http 开头需拼接地址
  if (!options.url.startsWith('http')) {
    options.url = baseURL + options.url
  }
  // 2. 请求超时
  options.timeout = 50000
  // 3. 添加小程序端请求头标识
  options.header = { ...options.header, 'source-client': 'miniapp' }
  // 4. 添加 token 请求头标识
  const userStore = useUserInfoStore()
  const token = userStore.userInfo?.token
  if (token) {
    options.header.Authorization = token
  }
  return options
}

// 响应拦截器
function responseInterceptor<T>(res: UniApp.RequestSuccessCallbackResult): Promise<Data<T>> {
  return new Promise((resolve, reject) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      resolve(res.data as Data<T>)
    } else if (res.statusCode === 401) {
      // 清理用户信息
      const userStore = useUserInfoStore()
      userStore.removeUserInfo()
      uni.showToast({
        title: '用户还未登录，请先登录',
        icon: 'none',
      })
      setTimeout(() => {
        uni.navigateTo({ url: '/pages/login/login' })
      }, 500)
      reject(res)
    } else {
      // 其他错误
      uni.showToast({
        icon: 'none',
        title: (res.data as Data<T>).msg || '请求有误~~~',
      })
      reject(res)
    }
  })
}

interface Data<T> {
  code: string
  msg: string
  result: T
}
interface RequestOptions {
  isThrottle?: boolean
  showLoading?: boolean
}
const throttleMap = new Map()
let loadingCount = 0 // 处理并发请求
const showLoadingStatus = (text = '加载中...') => {
  loadingCount++
  loadingCount > 0 && uni.showLoading({ title: text, mask: true })
}
const hideLoading = () => {
  loadingCount--
  loadingCount <= 0 && uni.hideLoading()
}
export const request = <T>(options: UniApp.RequestOptions & RequestOptions) => {
  console.log(options, 'options')
  const { url, method, data = '', isThrottle = false, showLoading = false } = options
  if (isThrottle) {
    // 请求节流逻辑
    const key = `${url}_${method}_${data}`
    if (throttleMap.has(key)) {
      uni.showToast({
        icon: 'none',
        title: '请求太频繁了，请稍后重试~',
      })
      return Promise.reject('')
    }
    throttleMap.set(key, true)
    setTimeout(() => {
      throttleMap.delete(key)
    }, 2000)
  }

  showLoading && showLoadingStatus()

  return new Promise<Data<T>>((resolve, reject) => {
    const newOptions = requestInterceptor(options)
    uni.request({
      ...newOptions,
      success: (res) => {
        responseInterceptor<T>(res).then(resolve).catch(reject)
      },
      fail: (err) => {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试~~~',
        })
        reject(err)
      },
      complete: () => {
        if (showLoading) {
          hideLoading()
        }
      },
    })
  })
}
