<template name="skeleton">
  <view class="categories categories">
    <scroll-view :scroll-y="true" class="primary primary">
      <view class="item active sk-pseudo sk-pseudo-circle">
        <text class="name sk-transparent sk-text-14-2857-666 sk-text">居家</text>
      </view>
      <view class="item sk-pseudo sk-pseudo-circle">
        <text class="name sk-transparent sk-text-14-2857-330 sk-text">美食</text>
      </view>
      <view class="item sk-pseudo sk-pseudo-circle">
        <text class="name sk-transparent sk-text-14-2857-440 sk-text">服饰</text>
      </view>
      <view class="item sk-pseudo sk-pseudo-circle">
        <text class="name sk-transparent sk-text-14-2857-360 sk-text">母婴</text>
      </view>
      <view class="item sk-pseudo sk-pseudo-circle">
        <text class="name sk-transparent sk-text-14-2857-89 sk-text">个护</text>
      </view>
      <view class="item sk-pseudo sk-pseudo-circle">
        <text class="name sk-transparent sk-text-14-2857-153 sk-text">严选</text>
      </view>
      <view class="item sk-pseudo sk-pseudo-circle">
        <text class="name sk-transparent sk-text-14-2857-201 sk-text">数码</text>
      </view>
      <view class="item sk-pseudo sk-pseudo-circle">
        <text class="name sk-transparent sk-text-14-2857-94 sk-text">运动</text>
      </view>
      <view class="item sk-pseudo sk-pseudo-circle">
        <text class="name sk-transparent sk-text-14-2857-340 sk-text">杂项</text>
      </view>
    </scroll-view>
    <scroll-view :scroll-y="true" class="secondary secondary">
      <view is="components/XtxSwiper" class="banner banner">
        <view class="carousel XtxSwiper--carousel">
          <swiper :circular="true" :interval="3000" :current="0" :autoplay="false">
            <swiper-item
              style="
                position: absolute;
                width: 100%;
                height: 100%;
                transform: translate(0%, 0px) translateZ(0px);
              "
            >
              <navigator class="navigator XtxSwiper--navigator" hover-class="none">
                <image class="image XtxSwiper--image sk-image" mode="aspectFill"></image>
              </navigator>
            </swiper-item>
            <swiper-item
              style="
                position: absolute;
                width: 100%;
                height: 100%;
                transform: translate(100%, 0px) translateZ(0px);
              "
            >
              <navigator class="navigator XtxSwiper--navigator" hover-class="none">
                <image class="image XtxSwiper--image sk-image" mode="aspectFill"></image>
              </navigator>
            </swiper-item>
          </swiper>
          <view class="indicator XtxSwiper--indicator">
            <text class="dot XtxSwiper--dot active XtxSwiper--active"></text>
            <text class="dot XtxSwiper--dot"></text>
            <text class="dot XtxSwiper--dot"></text>
            <text class="dot XtxSwiper--dot"></text>
            <text class="dot XtxSwiper--dot"></text>
          </view>
        </view>
      </view>
      <view class="panel panel">
        <view class="title title">
          <text class="name sk-transparent sk-text-26-6667-603 sk-text">居家生活用品</text>
          <navigator
            class="more sk-transparent sk-text-30-0000-248 sk-text sk-pseudo sk-pseudo-circle"
            hover-class="none"
            >全部</navigator
          >
        </view>
        <view class="section section">
          <navigator class="goods goods" hover-class="none">
            <image class="image sk-image"></image>
            <view class="name ellipsis sk-transparent sk-text-14-2857-651 sk-text"
              >极光限定 珠光蓝珐琅锅</view
            >
            <view class="price price">
              <text class="symbol sk-transparent sk-opacity">¥</text>
              <text class="number sk-transparent sk-text-14-2857-336 sk-text">199.00</text>
            </view>
          </navigator>
        </view>
      </view>
      <view class="panel panel">
        <view class="title title">
          <text class="name sk-transparent sk-text-26-6667-270 sk-text">收纳</text>
          <navigator
            class="more sk-transparent sk-text-30-0000-136 sk-text sk-pseudo sk-pseudo-circle"
            hover-class="none"
            >全部</navigator
          >
        </view>
        <view class="section section">
          <navigator class="goods goods" hover-class="none">
            <image class="image sk-image"></image>
            <view class="name ellipsis sk-transparent sk-text-14-2857-273 sk-text"
              >给衣柜减减肥，真空防潮压缩袋</view
            >
            <view class="price price">
              <text class="symbol sk-transparent sk-opacity">¥</text>
              <text class="number sk-transparent sk-text-14-2857-462 sk-text">79.00</text>
            </view>
          </navigator>
          <navigator class="goods goods" hover-class="none">
            <image class="image sk-image"></image>
            <view class="name ellipsis sk-transparent sk-text-14-2857-610 sk-text"
              >爆款明星好物，抽屉式透明储物柜</view
            >
            <view class="price price">
              <text class="symbol sk-transparent sk-opacity">¥</text>
              <text class="number sk-transparent sk-text-14-2857-810 sk-text">129.00</text>
            </view>
          </navigator>
          <navigator class="goods goods" hover-class="none">
            <image class="image sk-image"></image>
            <view class="name ellipsis sk-transparent sk-text-14-2857-24 sk-text"
              >衣柜省空间神器，棉麻涤·收纳挂袋</view
            >
            <view class="price price">
              <text class="symbol sk-transparent sk-opacity">¥</text>
              <text class="number sk-transparent sk-text-14-2857-293 sk-text">55.00</text>
            </view>
          </navigator>
          <navigator class="goods goods" hover-class="none">
            <image class="image sk-image"></image>
          </navigator>
          <navigator class="goods goods" hover-class="none">
            <image class="image sk-image"></image>
          </navigator>
          <navigator class="goods goods" hover-class="none">
            <image class="image sk-image"></image>
          </navigator>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped>
.sk-transparent {
  color: transparent !important;
}
.sk-text-14-2857-76 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.2rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-14-2857-666 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-330 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-440 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-360 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-89 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-153 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-201 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-94 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-340 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-26-6667-603 {
  background-image: linear-gradient(
    transparent 26.6667%,
    #eeeeee 0%,
    #eeeeee 73.3333%,
    transparent 0%
  ) !important;
  background-size: 100% 60rpx;
  position: relative !important;
}
.sk-text-30-0000-248 {
  background-image: linear-gradient(
    transparent 30%,
    #eeeeee 0%,
    #eeeeee 70%,
    transparent 0%
  ) !important;
  background-size: 100% 60rpx;
  position: relative !important;
}
.sk-text-14-2857-651 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-opacity {
  opacity: 0 !important;
}
.sk-text-14-2857-336 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-26-6667-270 {
  background-image: linear-gradient(
    transparent 26.6667%,
    #eeeeee 0%,
    #eeeeee 73.3333%,
    transparent 0%
  ) !important;
  background-size: 100% 60rpx;
  position: relative !important;
}
.sk-text-30-0000-136 {
  background-image: linear-gradient(
    transparent 30%,
    #eeeeee 0%,
    #eeeeee 70%,
    transparent 0%
  ) !important;
  background-size: 100% 60rpx;
  position: relative !important;
}
.sk-text-14-2857-273 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-text-14-2857-462 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-610 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-text-14-2857-810 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-24 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-text-14-2857-293 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
