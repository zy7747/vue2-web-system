export default {
  props: {
    tableData: {
      text: '数据列表',
      type: [Array, Function],
      default: () => {
        return []
      }
    },
    tableColumn: {
      text: '列信息',
      type: [Array, Function],
      default: () => {
        return []
      }
    },
    query: {
      text: '表单请求方法/数据',
      type: [Function],
      default: null
    },
    hasPagination: {
      text: '是否需要分页',
      type: [Boolean],
      default: () => {
        return true
      }
    }
  }
}
