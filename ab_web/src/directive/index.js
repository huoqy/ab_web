/**
 * 自定义指令-防止用户连续点击
 */
export default {
    stopReClick:{
      mounted(el,binding){
        el.addEventListener('click',() => {
          if(!el.disabled){
            el.disabled = true
            el.style.pointerEvents = 'none'
            setTimeout(() => {
              el.disabled = false
              el.style.pointerEvents = 'auto'
            },binding.value||1000)
          }
        })
      }
    }
  }