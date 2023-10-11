export default {
  props: {
    title: {
      text: '标题名称',
      type: [String],
      default: () => {
        return '卡片名称'
      }
    }
  }
}
