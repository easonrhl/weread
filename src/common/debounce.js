const debounce = (fn, delay) => {
  let timer
  return function() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, ...arguments)
    }, delay)
  }
}

export default debounce
