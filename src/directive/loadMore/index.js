export default {
  bind(el, binding) {
    // 获取element-ui定义好的scroll盒子
    const SELECT_WRAP_DOM = el.querySelector(
      '.el-select-dropdown .el-select-dropdown__wrap'
    )
    SELECT_WRAP_DOM.addEventListener('scroll', function() {
      const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight

      if (CONDITION) {
        binding.value('down')
      }

      if (this.scrollTop === 0) {
        binding.value()
      }
    })
  }
}
