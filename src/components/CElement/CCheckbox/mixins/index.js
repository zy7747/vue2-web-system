export default {
  props: {
    value: {
      text: '数据对象',
      type: [Array],
      default: () => {
        return []
      }
    },
    options: {
      text: '下拉框值',
      type: [Array, Function],
      default: () => {
        return []
      }
    }
  }
}
