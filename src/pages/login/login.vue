<script setup lang="ts">
import { loginWeiXinApi, loginWeiXinSimpleApi } from '@/services/apis/login'
import { onLoad } from '@dcloudio/uni-app'
import { useUserInfoStore } from '@/stores/modules/user'
import { useCart } from '@/composables'

let code = ''
let getWeiXinCode = async () => {
  let res = await wx.login()
  // console.log(res.code, 'code')
  code = res.code
}

// 企业用户才可使用
let onGetPhoneNumber: UniHelper.ButtonOnGetphonenumber = async (e) => {
  console.log(e.detail.encryptedData)
  const { encryptedData, iv } = e.detail
  let res = await loginWeiXinApi({
    code,
    encryptedData: encryptedData || '',
    iv: iv || '',
  })
}
let userInfoStore = useUserInfoStore()
// 个人开发
let simpleLogin = async () => {
  let phoneNumber = '19142094213'
  let res = await loginWeiXinSimpleApi(phoneNumber)
  userInfoStore.setUserInfo(res.result)
  // 将本地缓存购物车的商品合并到数据库中
  useCart().mergeLocalCartToServer()
  uni.showToast({
    icon: 'none',
    title: '登录成功',
  })
  setTimeout(() => {
    // uni.switchTab({
    //   url: '/pages/my/my',
    // })
    uni.navigateBack()
  }, 500)
}
onLoad(() => {
  // #ifdef MP-WEIXIN
  getWeiXinCode()
  // #endif
})
</script>

<template>
  <view class="viewport">
    <view class="logo">
      <image src="@/static/images/logo.jpg"></image>
    </view>
    <view class="login">
      <!-- #ifdef H5 -->
      <!-- 网页端表单登录 -->
      <input class="input" type="text" placeholder="请输入用户名/手机号码" />
      <input class="input" type="text" password placeholder="请输入密码" />
      <button class="button phone">登录</button>

      <!-- #endif -->

      <!-- #ifdef MP-WEIXIN -->
      <!-- 网页端表单登录 -->
      <button class="button phone" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">
        <text class="icon icon-phone"></text>
        手机号快捷登录
      </button>
      <!-- #endif -->

      <view class="extra">
        <view class="caption">
          <text>其他登录方式</text>
        </view>
        <view class="options" @tap="simpleLogin">
          <!-- 通用模拟登录 -->
          <button>
            <text class="icon icon-phone">模拟快捷登录</text>
          </button>
        </view>
      </view>
      <view class="tips">登录/注册即视为你同意《服务条款》和《潮童购隐私协议》</view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;
}

.logo {
  text-align: center;
  image {
    width: 440rpx;
    height: 220rpx;
    margin-top: 30rpx;
  }
}

.login {
  display: flex;
  flex-direction: column;
  height: 60vh;
  padding: 40rpx 20rpx 20rpx;

  .input {
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    border: 1px solid #ddd;
    padding-left: 30rpx;
    margin-bottom: 20rpx;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    color: #fff;
    .icon {
      font-size: 40rpx;
      margin-right: 6rpx;
    }
  }

  .phone {
    background-color: #28bb9c;
  }

  .wechat {
    background-color: #06c05f;
  }

  .extra {
    flex: 1;
    padding: 70rpx 70rpx 0;
    .caption {
      width: 440rpx;
      line-height: 1;
      border-top: 1rpx solid #ddd;
      font-size: 26rpx;
      color: #999;
      position: relative;
      text {
        transform: translate(-40%);
        background-color: #fff;
        position: absolute;
        top: -12rpx;
        left: 50%;
      }
    }

    .options {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 70rpx;
      button {
        padding: 0;
        background-color: transparent;
      }
    }

    .icon {
      font-size: 24rpx;
      color: #444;
      display: flex;
      flex-direction: column;
      align-items: center;

      &::before {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 6rpx;
        font-size: 40rpx;
        border: 1rpx solid #444;
        border-radius: 50%;
      }
    }
    .icon-weixin::before {
      border-color: #06c05f;
      color: #06c05f;
    }
  }
}

.tips {
  position: absolute;
  bottom: 80rpx;
  left: 20rpx;
  right: 20rpx;
  font-size: 22rpx;
  color: #999;
  text-align: center;
}
</style>
