export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    // 值
    value: {
      text: "数据对象",
      type: [String, Array],
      default: () => {
        return "";
      },
    },
    // 数量限制
    limit: {
      type: Number,
      default: 5,
    },
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 1000,
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => ["png", "jpg", "jpeg", "gif"],
    },
    uploadData: {
      type: [String, Object, Array],
      default: () => {
        return {};
      },
    },
  },
};
