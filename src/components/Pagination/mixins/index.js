export default {
  props: {
    total: {
      text: '条数',
      type: [Number],
      required: true,
      default: 0
    },
    page: {
      text: '当前页',
      type: [Number],
      default: 1
    },
    limit: {
      text: '每页显示条目个数',
      type: [Number],
      default: 10
    },
    pageSizes: {
      text: '页容量',
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    // 移动端页码按钮的数量端默认值5
    pagerCount: {
      text: '总页数',
      type: Number,
      default: document.body.clientWidth < 992 ? 5 : 7
    },
    layout: {
      text: '页面风格',
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      text: '颜色',
      type: Boolean,
      default: true
    },
    hidden: {
      text: '是否需要分页',
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    //每页显示条目个数
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  }
}
