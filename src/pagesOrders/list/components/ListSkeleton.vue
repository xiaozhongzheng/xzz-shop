<template name="skeleton">
  <view class="sk-container">
    <view class="viewport viewport">
      <swiper class="swiper swiper" :current="0" :autoplay="false">
        <swiper-item
          style="
            position: absolute;
            width: 100%;
            height: 100%;
            transform: translate(0%, 0px) translateZ(0px);
          "
        >
          <view is="pagesOrders/list/components/OrdersList">
            <scroll-view
              :scroll-y="true"
              class="orders OrdersList--orders"
              enable-back-to-top="true"
            >
              <view class="card OrdersList--card">
                <view class="status OrdersList--status">
                  <text class="date OrdersList--date sk-transparent sk-text-14-2857-957 sk-text"
                    >2025-02-28 16:28:23</text
                  >
                  <text class="sk-transparent sk-text-14-2857-356 sk-text">待发货</text>
                  <text
                    class="icon-delete OrdersList--icon-delete sk-pseudo sk-pseudo-circle"
                  ></text>
                </view>
                <navigator class="goods OrdersList--goods" hover-class="none">
                  <view class="cover OrdersList--cover">
                    <image mode="aspectFit" class="sk-image"></image>
                  </view>
                  <view class="meta OrdersList--meta">
                    <view
                      class="name OrdersList--name ellipsis OrdersList--ellipsis sk-transparent sk-text-14-2857-582 sk-text"
                      >释放可爱天性，棉毛布造型领哈衣59-90cm</view
                    >
                    <view class="type OrdersList--type sk-transparent sk-text-22-2222-379 sk-text"
                      >灰蓝几何， 73cm</view
                    >
                  </view>
                </navigator>
                <view class="payment OrdersList--payment">
                  <text
                    class="quantity OrdersList--quantity sk-transparent sk-text-0-0000-773 sk-text"
                    style="background-position-x: 100%"
                    >共3件商品</text
                  >
                  <text
                    class="sk-transparent sk-text-0-0000-351 sk-text"
                    style="background-position-x: 100%"
                    >实付</text
                  >
                  <text class="amount OrdersList--amount sk-transparent"
                    ><text class="symbol OrdersList--symbol sk-transparent sk-opacity">¥</text
                    >186</text
                  >
                </view>
                <view class="action OrdersList--action">
                  <navigator
                    class="button OrdersList--button secondary OrdersList--secondary sk-transparent sk-text-14-2857-210 sk-text"
                    hover-class="none"
                  >
                    再次购买
                  </navigator>
                  <view
                    class="button OrdersList--button primary OrdersList--primary sk-transparent sk-text-14-2857-899 sk-text"
                    >确认收货</view
                  >
                </view>
              </view>
              <view class="card OrdersList--card">
                <view class="status OrdersList--status">
                  <text class="date OrdersList--date sk-transparent sk-text-14-2857-455 sk-text"
                    >2025-02-28 15:08:56</text
                  >
                  <text class="sk-transparent sk-text-14-2857-802 sk-text">待发货</text>
                  <text
                    class="icon-delete OrdersList--icon-delete sk-pseudo sk-pseudo-circle"
                  ></text>
                </view>
                <navigator class="goods OrdersList--goods" hover-class="none">
                  <view class="cover OrdersList--cover">
                    <image mode="aspectFit" class="sk-image"></image>
                  </view>
                  <view class="meta OrdersList--meta">
                    <view
                      class="name OrdersList--name ellipsis OrdersList--ellipsis sk-transparent sk-text-14-2857-127 sk-text"
                      >ins风小碎花泡泡袖衬110-160cm</view
                    >
                    <view class="type OrdersList--type sk-transparent sk-text-22-2222-377 sk-text"
                      >青出于蓝， 140</view
                    >
                  </view>
                </navigator>
                <view class="payment OrdersList--payment">
                  <text
                    class="quantity OrdersList--quantity sk-transparent sk-text-0-0000-766 sk-text"
                    style="background-position-x: 100%"
                    >共1件商品</text
                  >
                  <text
                    class="sk-transparent sk-text-0-0000-763 sk-text"
                    style="background-position-x: 100%"
                    >实付</text
                  >
                  <text class="amount OrdersList--amount sk-transparent"
                    ><text class="symbol OrdersList--symbol sk-transparent sk-opacity">¥</text
                    >99</text
                  >
                </view>
                <view class="action OrdersList--action">
                  <navigator
                    class="button OrdersList--button secondary OrdersList--secondary sk-transparent sk-text-14-2857-846 sk-text"
                    hover-class="none"
                  >
                    再次购买
                  </navigator>
                  <view
                    class="button OrdersList--button primary OrdersList--primary sk-transparent sk-text-14-2857-950 sk-text"
                    >确认收货</view
                  >
                </view>
              </view>
              <view class="card OrdersList--card">
                <view class="status OrdersList--status">
                  <text class="date OrdersList--date sk-transparent sk-text-14-2857-96 sk-text"
                    >2025-02-28 11:59:44</text
                  >
                  <text class="sk-transparent sk-text-14-2857-731 sk-text">待发货</text>
                  <text
                    class="icon-delete OrdersList--icon-delete sk-pseudo sk-pseudo-circle"
                  ></text>
                </view>
                <navigator class="goods OrdersList--goods" hover-class="none">
                  <view class="cover OrdersList--cover">
                    <image mode="aspectFit" class="sk-image"></image>
                  </view>
                  <view class="meta OrdersList--meta">
                    <view
                      class="name OrdersList--name ellipsis OrdersList--ellipsis sk-transparent sk-text-14-2857-932 sk-text"
                      >探险者黑胶防晒防雨遮阳伞户外钓鱼伞</view
                    >
                    <view class="type OrdersList--type sk-transparent sk-text-22-2222-486 sk-text"
                      >黑胶防晒钓鱼伞（2米）+暗月折叠椅</view
                    >
                  </view>
                </navigator>
              </view>
            </scroll-view>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<style>
/*
此文件为开发者工具生成，生成时间: 2025/2/28下午9:27:44

在 E:\my-project\小兔仙儿\xzz-shop\dist\dev\mp-weixin\pagesOrders\list\list.wxss 中引入样式
```
@import "./list.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
*/
.sk-transparent {
  color: transparent !important;
}
.sk-text-26-6667-444 {
  background-image: linear-gradient(
    transparent 26.6667%,
    #eeeeee 0%,
    #eeeeee 73.3333%,
    transparent 0%
  ) !important;
  background-size: 100% 60rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-26-6667-820 {
  background-image: linear-gradient(
    transparent 26.6667%,
    #eeeeee 0%,
    #eeeeee 73.3333%,
    transparent 0%
  ) !important;
  background-size: 100% 60rpx;
  position: relative !important;
}
.sk-text-26-6667-96 {
  background-image: linear-gradient(
    transparent 26.6667%,
    #eeeeee 0%,
    #eeeeee 73.3333%,
    transparent 0%
  ) !important;
  background-size: 100% 60rpx;
  position: relative !important;
}
.sk-text-26-6667-712 {
  background-image: linear-gradient(
    transparent 26.6667%,
    #eeeeee 0%,
    #eeeeee 73.3333%,
    transparent 0%
  ) !important;
  background-size: 100% 60rpx;
  position: relative !important;
}
.sk-text-26-6667-580 {
  background-image: linear-gradient(
    transparent 26.6667%,
    #eeeeee 0%,
    #eeeeee 73.3333%,
    transparent 0%
  ) !important;
  background-size: 100% 60rpx;
  position: relative !important;
}
.sk-text-14-2857-957 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.2rpx;
  position: relative !important;
}
.sk-text-14-2857-356 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.2rpx;
  position: relative !important;
}
.sk-text-14-2857-582 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-22-2222-379 {
  background-image: linear-gradient(
    transparent 22.2222%,
    #eeeeee 0%,
    #eeeeee 77.7778%,
    transparent 0%
  ) !important;
  background-size: 100% 43.2rpx;
  position: relative !important;
}
.sk-text-0-0000-773 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 24rpx;
  position: relative !important;
}
.sk-text-0-0000-351 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 28rpx;
  position: relative !important;
}
.sk-opacity {
  opacity: 0 !important;
}
.sk-text-14-2857-210 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-899 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-455 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.2rpx;
  position: relative !important;
}
.sk-text-14-2857-802 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.2rpx;
  position: relative !important;
}
.sk-text-14-2857-127 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-22-2222-377 {
  background-image: linear-gradient(
    transparent 22.2222%,
    #eeeeee 0%,
    #eeeeee 77.7778%,
    transparent 0%
  ) !important;
  background-size: 100% 43.2rpx;
  position: relative !important;
}
.sk-text-0-0000-766 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 24rpx;
  position: relative !important;
}
.sk-text-0-0000-763 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 28rpx;
  position: relative !important;
}
.sk-text-14-2857-846 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-950 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-96 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.2rpx;
  position: relative !important;
}
.sk-text-14-2857-731 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.2rpx;
  position: relative !important;
}
.sk-text-14-2857-932 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-22-2222-486 {
  background-image: linear-gradient(
    transparent 22.2222%,
    #eeeeee 0%,
    #eeeeee 77.7778%,
    transparent 0%
  ) !important;
  background-size: 100% 43.2rpx;
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
