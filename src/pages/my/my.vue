<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { request } from '@/utils/http'
const memberStore = useMemberStore()
// 测试请求
const getData = async () => {
  const res = await request<String[]>({
    method: 'GET',
    url: '/member/',
  })

  console.log('res')
}
</script>

<template>
  <view class="my">
    <view>会员信息：{{ memberStore.profile }}</view>
    <button
      @tap="
        memberStore.setProfile({
          nickname: '黑马先锋',
          token: '111',
        })
      "
      size="mini"
      plain
      type="primary"
    >
      保存用户信息
    </button>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
    <button @tap="getData()" size="mini" plain type="warn">请求</button>
  </view>
</template>

<style lang="scss">
//
</style>
