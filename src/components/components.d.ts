// src/types/components.d.ts
import XtxSwiper from './XtxSwiper.vue'
import XtxGuess from './XtxGuess.vue'
declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
    XtxGuess: typeof XtxGuess
  }
}

// 组件类型实例
export type GuessInstance = InstanceType<typeof XtxGuess>
