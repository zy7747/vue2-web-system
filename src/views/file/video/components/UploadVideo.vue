<template>
  <div class="upload-file">
    <c-input
      placeholder="输入关键字进行过滤"
      v-model="filterText"
      style="margin-bottom: 15px"
    />
    <el-upload
      multiple
      :action="baseUrl"
      :before-upload="handleBeforeUpload"
      :file-list="filterList"
      :limit="limit"
      :data="uploadData"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :on-remove="handleDelete"
      :show-file-list="true"
      :headers="headers"
      ref="fileUpload"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <!-- 上传按钮 -->
      <el-button size="mini" type="primary" :disabled="disabled">
        {{ btnName }}
      </el-button>
      <!-- 上传提示 -->
      <div class="el-upload__tip" slot="tip" v-if="showTip">
        请上传

        <template v-if="fileSize">
          大小不超过
          <b style="color: #f56c6c">{{ fileSize }}MB</b>
        </template>

        <template v-if="fileType">
          格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
        </template>

        的文件
      </div>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import Sortable from "sortablejs";

export default {
  name: "FileUpload",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    btnName: {
      type: String,
      default: "文件上传",
    },
    // 值
    value: [String, Object, Array],
    // 数量限制
    limit: {
      type: Number,
      default: 99,
    },
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 9999,
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => [
        "png",
        "jpg",
        "jpeg",
        "doc",
        "xls",
        "xlsx",
        "txt",
        "pdf",
        "mp4",
        "mp3",
        "gif",
      ],
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true,
    },
    uploadData: {
      type: [String, Object, Array],
      default: () => {
        return {};
      },
    },
    isRowDrop: {
      text: "是否可拖拽排序",
      type: [Boolean],
      default: () => {
        return false;
      },
    },
    sortRow: {
      text: "可拖拽排序的字段",
      type: String,
      default: "sort",
    },
    formData: {
      text: "表头数据",
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  mounted() {
    if (this.isRowDrop) {
      this.rowDrop();
    }
  },
  data() {
    return {
      filename: undefined,
      number: 0,
      filterText: "",
      uploadList: [],
      fileUrl: process.env.VUE_APP_FILE_API,
      baseUrl: process.env.VUE_APP_BASE_API + "/file/upload", // 请求地址
      headers: {
        Authorization: getToken(),
        UserId: this.$store.getters.userId,
      }, // 设置上传的请求头部
      fileList: [],
      filterList: [],
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          let temp = 1;
          // 首先将值转为数组
          const list = Array.isArray(val) ? val : this.value.split(",");
          // 然后将数组转为对象数组
          this.fileList = list.map((item) => {
            return { ...item, name: item.name, url: item.url };
          });
          this.filterList = JSON.parse(JSON.stringify(this.fileList));
        } else {
          this.fileList = [];
          return [];
        }
      },
      deep: true,
      immediate: true,
    },
    filterText(val) {
      if (!val || val === "") {
        this.filterList = JSON.parse(JSON.stringify(this.fileList));
        return;
      }
      this.filterList = this.filterNode(val, this.fileList);
    },
  },
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize);
    },
  },
  methods: {
    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      // 校检文件类型
      if (this.fileType) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        const isTypeOk = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true;
          if (fileExtension && fileExtension.indexOf(type) > -1) return true;
          return false;
        });
        if (!isTypeOk) {
          this.$modal.msgError(
            `文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`
          );
          return false;
        }
      }
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$modal.msgError(`上传文件大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
      }

      this.number++;
      this.filename = file.name;
      return true;
    },
    //搜索框过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.filter((item) => {
        return item.name.indexOf(value) !== -1;
      });
    },
    // 文件个数超出
    handleExceed() {
      this.$modal.msgError(`上传文件数量不能超过 ${this.limit} 个!`);
    },
    // 上传失败
    handleUploadError(err) {
      this.$modal.msgError(err, "上传失败，请重试");
    },
    // 上传成功回调
    async handleUploadSuccess(res, file) {
      if (res.code === 200) {
        this.uploadSuccess({
          filename: file.name,
          url: res.data.url,
          status: file.status,
        });
      } else {
        this.number--;

        this.$modal.msgError(res.message);
        this.$refs.fileUpload.handleRemove(file);
        this.uploadedSuccessfully();
      }
    },
    //文件上传成功
    uploadSuccess({ filename, url, status }) {
      let formData = [];
      //如果提交的不是集合url存在头数据当中
      const videoName = this.getFileName(filename);
      if (!this.formData.isCollection) {
        formData = [{ ...this.formData, url, status, episode: 1 }];
      } else {
        //如果提交的是集合则创建一个新文件夹，url存在子数据当中
        formData = [
          {
            parentId: this.formData.id,
            url,
            status,
            videoName,
            episode: this.fileList.length,
          },
        ];
      }

      this.$service.file.video.saveList(formData).then((res) => {
        this.uploadList.push({ ...res.data[0], name: videoName });
        this.filename = undefined;

        this.uploadedSuccessfully();
      });
    },
    // 删除文件
    handleDelete(file) {
      this.$emit("handleDelete", file);
    },
    // 上传结束处理
    uploadedSuccessfully() {
      if (this.number > 0 && this.uploadList.length === this.number) {
        if (this.formData.isCollection === 0) {
          this.fileList = JSON.parse(JSON.stringify(this.uploadList));
        } else {
          this.fileList = this.fileList.concat(this.uploadList);
        }

        this.uploadList = [];
        this.number = 0;
        this.$emit("input", this.fileList);
      }
    },
    // 获取文件名称
    getFileName(name) {
      if (name && name.indexOf(".") > -1) {
        return name.split(".")[0];
      } else {
        return name;
      }
    },
    // 拖拽排序
    rowDrop() {
      const el = document.querySelector(".el-upload-list");

      Sortable.create(el, {
        onEnd: (evt) => {
          const targetRow = this.value.splice(evt.oldIndex, 1)[0];
          this.value.splice(evt.newIndex, 0, targetRow);

          for (let index in this.value) {
            this.$set(this.value[index], [this.sortRow], parseInt(index) + 1);
          }
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-upload-list {
  max-height: 150px !important;
  overflow: auto !important;
  transition: none;
}
</style>
