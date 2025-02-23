import { useMemberStore } from '@/stores'
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
    const memberstore = useMemberStore()
    const token = memberstore.profile?.token
    if (token) {
      options.header.Authorization = token
      console.log(options)
    }
  },
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)
