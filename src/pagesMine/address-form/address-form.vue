<script setup lang="ts">
import { addAddressApi, getAddressByIdApi, updateAddressApi } from '@/services/apis/adress'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 表单数据
const form = ref({
  receiver: '', // 收货人
  contact: '', // 联系方式
  fullLocation: '', // 省市区(前端展示)
  provinceCode: '', // 省份编码(后端参数)
  cityCode: '', // 城市编码(后端参数)
  countyCode: '', // 区/县编码(后端参数)
  address: '', // 详细地址
  isDefault: 0, // 默认地址，1为是，0为否
})

const query = defineProps<{
  id?: string // 如果是点击了修改，则id不为空
}>()
// const address = ref<AddressItem>()
const getAddress = async () => {
  const res = await getAddressByIdApi(query.id!)
  form.value = res.result
}

onLoad(() => {
  query.id && getAddress()
})

uni.setNavigationBarTitle({
  title: query.id ? '修改地址' : '新建地址',
})

const onChangeRegion: UniHelper.RegionPickerOnChange = (ev) => {
  form.value.fullLocation = ev.detail.value.join(' ')
  const [provinceCode, cityCode, countyCode] = ev.detail.code!
  form.value = {
    ...form.value,
    provinceCode,
    cityCode,
    countyCode,
  }
}
const onChangeSwitch: UniHelper.SwitchOnChange = (ev) => {
  // console.log(ev)
  form.value.isDefault = +ev.detail.value
}
const onSubmit = async () => {
  query.id ? await updateAddressApi(query.id, form.value) : await addAddressApi(form.value)

  uni.showToast({
    title: query.id ? '修改成功' : '新增成功',
    icon: 'none',
  })
  setTimeout(() => {
    uni.navigateBack()
  }, 500)
}
</script>

<template>
  <view class="content">
    <form>
      <!-- 表单内容 -->
      <view class="form-item">
        <text class="label">收货人</text>
        <input class="input" placeholder="请填写收货人姓名" v-model="form.receiver" />
      </view>
      <view class="form-item">
        <text class="label">手机号码</text>
        <input class="input" placeholder="请填写收货人手机号码" v-model="form.contact" />
      </view>
      <view class="form-item">
        <text class="label">所在地区</text>
        <picker class="picker" mode="region" @change="onChangeRegion">
          <view v-if="form.fullLocation">{{ form.fullLocation }}</view>
          <view v-else class="placeholder">请选择省/市/区(县)</view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">详细地址</text>
        <input class="input" placeholder="街道、楼牌号等信息" v-model="form.address" />
      </view>
      <view class="form-item">
        <label class="label">设为默认地址</label>
        <switch
          class="switch"
          @change="onChangeSwitch"
          color="#27ba9b"
          :checked="!!form.isDefault"
        />
      </view>
    </form>
  </view>
  <!-- 提交按钮 -->
  <button class="button" @click="onSubmit">保存并使用</button>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx 40rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;

    // 调整 uni-forms 样式
    .uni-forms-item__content {
      display: flex;
    }

    .uni-forms-item__error {
      margin-left: 200rpx;
    }

    &:last-child {
      border: none;
    }

    .label {
      width: 200rpx;
      color: #333;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .switch {
      position: absolute;
      right: -20rpx;
      transform: scale(0.8);
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }
}

.button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>
