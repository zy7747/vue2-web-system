export default {
  data() {
    return {
      exportLoading: false
    }
  },
  props: {
    excelExport: {
      text: '导出参数',
      type: [Object],
      default: () => {
        return {}
      }
    },
    excelParams: {
      text: '导出参数',
      type: [Object],
      default: () => {
        return {}
      }
    },
    excelTips: {
      text: '导出提示',
      type: [String],
      default: () => {
        return ''
      }
    },
    excelTitle: {
      text: '导出文件名称',
      type: [String],
      default: () => {
        return ''
      }
    },
    excelFun: {
      text: '导出接口',
      type: [Function]
    }
  },
  methods: {
    handleExport() {
      this.$modal
        .confirm(this.excelTip)
        .then(() => {
          this.exportLoading = true
          return this.excelFun(this.excelParams)
        })
        .then((response) => {
          this.$download.excel(response, this.excelTitle)
          this.exportLoading = false
        })
        .catch(() => {})
    }
  }
}
