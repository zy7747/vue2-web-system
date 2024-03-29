<template>
  <div class="upload-file">
    <el-upload
      multiple
      :action="baseUrl"
      :before-upload="handleBeforeUpload"
      :file-list="fileList"
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
      default: 999,
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
    formData: {
      text: "表头数据",
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      filename: undefined,
      number: 0,
      uploadList: [],
      fileUrl: process.env.VUE_APP_FILE_API,
      baseUrl: process.env.VUE_APP_BASE_API + "/file/upload", // 请求地址
      headers: {
        Authorization: getToken(),
        UserId: this.$store.getters.userId,
      }, // 设置上传的请求头部
      fileList: [],
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
            return {
              name: this.formData.audioName,
              url: item.url,
              status: "success",
            };
          });
        } else {
          this.fileList = [];
          return [];
        }
      },
      deep: true,
      immediate: true,
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
      //如果提交的不是集合url存在头数据当中
      const audioName = this.getFileName(filename);

      this.uploadList.push({ url, name: audioName, status });
      this.filename = undefined;

      this.uploadedSuccessfully();
    },
    // 删除文件
    handleDelete(file) {
      this.$emit("handleDelete", file);
    },
    // 上传结束处理
    uploadedSuccessfully() {
      if (this.number > 0 && this.uploadList.length === this.number) {
        this.fileList = JSON.parse(JSON.stringify(this.uploadList));

        this.uploadList = [];
        this.number = 0;
        this.$emit("input", this.fileList[0].url);
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
  },
};
</script>

<style scoped lang="scss"></style>
