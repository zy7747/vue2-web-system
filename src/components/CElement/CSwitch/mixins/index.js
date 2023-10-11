export default {
  props: {
    value: {
      text: '数据对象',
      type: [String, Number],
      default: () => {
        return ''
      }
    },
    width: {
      type: [String],
      default: '100%'
    },
    minWidth: {
      type: [String],
      default: '90px'
    },
    options: {
      text: '下拉框值',
      type: [Array, Function],
      default: () => {
        return []
      }
    },
    size: {
      text: '下拉框大小',
      type: [String],
      default: () => {
        return 'small'
      }
    },
    filterable: {
      text: '筛选',
      type: [Boolean, Function],
      default: () => {
        return false
      }
    },
    disabled: {
      text: '禁用',
      type: [Boolean, Function],
      default: () => {
        return false
      }
    },
    placeholder: {
      text: '提示语句',
      type: [String],
      default: () => {
        return '请选择'
      }
    }
  }
}
