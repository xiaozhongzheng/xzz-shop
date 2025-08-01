// src/types/components.d.ts
import XtxSwiper from './XtxSwiper.vue'
import XtxGuess1 from './XtxGuess1.vue'
declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
    XtxGuess1: typeof XtxGuess1
  }
}

// 组件类型实例
export type GuessInstance = InstanceType<typeof XtxGuess1>
