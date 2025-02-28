import { useUserInfoStore } from '@/stores/modules/user'
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
// 添加拦截器
const httpInterceptor = {
  //拦截前触发
  invoke(options: UniApp.RequestOptions) {
    //1.非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }

    //2.请求超时，默认 68s
    options.timeout = 10000
    //3.添加小程序端请求头标识
    options.header = { ...options.header, 'source-client': 'miniapp' }
    //4.添加 token 请求头标识
    const userStore = useUserInfoStore()
    const token = userStore.userInfo?.token
    if (token) {
      options.header.Authorization = token
      // console.log(options)
    }
  },
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

interface Data<T> {
  code: string
  msg: string
  result: T
}

export const request = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success: (res) => {
        // 响应成功
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          // 清理用户信息
          const userStore = useUserInfoStore()
          userStore.removeUserInfo()
          uni.navigateTo({
            url: '/pages/login/login',
          })
          reject(res)
        } else {
          // 其他错误
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求有误~~~',
          })
          reject(res)
        }
      },
      fail: (err) => {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试~~~',
        })
        reject(err)
      },
    })
  })
}
