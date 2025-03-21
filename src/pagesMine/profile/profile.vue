<script setup lang="ts">
import { getUserInfoApi, updateUserInfoApi } from '@/services/apis/user'
import type { Gender, UserDetail, UserParames } from '@/types/user'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { useUserInfoStore } from '@/stores/modules/user'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const user = ref<UserDetail>({} as UserDetail)

const getUserInfo = async () => {
  let res = await getUserInfoApi()
  user.value = res.result
}

// 修改用户头像
const updateUserAvatar = () => {
  // 调用拍照/选择图片
  uni.chooseMedia({
    // 文件个数
    count: 1,
    // 文件类型
    mediaType: ['image'],
    success: (res) => {
      // console.log(res)
      let { tempFilePath } = res.tempFiles[0]
      // 文件上传
      uni.uploadFile({
        url: '/member/profile/avatar',
        name: 'file',
        filePath: tempFilePath,
        success: (res) => {
          console.log(res)
        },
      })
    },
  })
}
const userStore = useUserInfoStore()

const onChangeSex: UniHelper.RadioGroupOnChange = (ev) => {
  // console.log(ev.detail.value)
  user.value.gender = ev.detail.value as Gender
}
const onChangeBirthday: UniHelper.DatePickerOnChange = (ev) => {
  // console.log(ev.detail.value)
  user.value.birthday = ev.detail.value
}
let fullLocationCode: string[] = []

const onChangeRegion: UniHelper.RegionPickerOnChange = (ev) => {
  // console.log(ev.detail)
  user.value.fullLocation = ev.detail.value.join(' ')
  fullLocationCode = ev.detail.code || []
}
const onSubmit = async () => {
  const { nickname, gender, birthday } = user.value!
  const [provinceCode, cityCode, countyCode] = fullLocationCode
  const res = await updateUserInfoApi({
    nickname,
    gender,
    birthday,
    provinceCode,
    cityCode,
    countyCode,
  })
  userStore.userInfo!.nickname = nickname
  user.value = res.result
  uni.showToast({
    title: '修改成功',
    icon: 'none',
  })
  setTimeout(() => {
    uni.navigateBack()
  }, 500)
}

onShow(() => {
  getUserInfo()
})
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar">
      <view class="avatar-content" @click="updateUserAvatar">
        <image class="image" :src="user?.avatar" mode="aspectFill" />
        <text class="text">点击修改头像</text>
      </view>
    </view>

    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ user?.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input class="input" type="text" placeholder="请填写昵称" v-model="user.nickname" />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onChangeSex">
            <label class="radio">
              <radio value="男" color="#27ba9b" :checked="user?.gender === '男'" />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#27ba9b" :checked="user?.gender === '女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            class="picker"
            mode="date"
            start="1900-01-01"
            :end="new Date()"
            :value="user?.birthday"
            @change="onChangeBirthday"
          >
            <view v-if="user?.birthday">{{ user?.birthday }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <picker
            class="picker"
            @change="onChangeRegion"
            mode="region"
            :value="user?.fullLocation?.split(' ')"
          >
            <view v-if="user?.fullLocation">{{ user?.fullLocation }}</view>
            <view class="placeholder" v-else>请选择城市</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input class="input" type="text" placeholder="请填写职业" :value="user?.profession" />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button" @tap="onSubmit">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
