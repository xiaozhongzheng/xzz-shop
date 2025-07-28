export const debounce = (fn, time) => {
  let timer = null
  return () => {
    timer = setTimeout(() => {
      if (timer) {
        clearTimeout(timer)
      } else {
        fn()
      }
    }, time)
  }
}
