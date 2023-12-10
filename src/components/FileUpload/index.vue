<template>
  <div class="upload-file">
    <el-upload
      multiple
      :action="uploadFileUrl"
      :before-upload="handleBeforeUpload"
      :file-list="fileList"
      :limit="limit"
      :data="uploadData"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :show-file-list="false"
      :headers="headers"
      class="upload-file-uploader"
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
          大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
        </template>
        <template v-if="fileType">
          格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
        </template>
        的文件
      </div>
    </el-upload>

    <!-- 文件列表 -->
    <transition-group
      v-if="isFileList"
      class="upload-file-list el-upload-list el-upload-list--text"
      name="el-fade-in-linear"
      tag="ul"
    >
      <li
        class="el-upload-list__item ele-upload-list__item-content"
        v-for="(file, index) in fileList"
        :key="file.url"
      >
        <el-link
          :href="`${baseUrl + file.url}`"
          :underline="false"
          target="_blank"
        >
          <div class="fileName" v-if="file.name">
            <svg-icon icon-class="文件" class="icon" />
            <span>{{ getFileName(file.name) }}</span>
          </div>
        </el-link>
        <div class="ele-upload-list__item-content-action">
          <el-link
            :underline="false"
            @click="handleDelete(index, file)"
            :disabled="disabled"
            type="danger"
          >
            <svg-icon icon-class="删除" class="icon" />
            删除
          </el-link>
        </div>
      </li>
    </transition-group>
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
    // 是否显示文件列表
    isFileList: {
      type: Boolean,
      default: true,
    },
    uploadData: {
      type: [String, Object, Array],
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
      baseUrl: process.env.VUE_APP_BASE_API,
      uploadFileUrl: process.env.VUE_APP_BASE_API + "/file/upload", // 请求地址
      headers: { Authorization: getToken() }, // 设置上传的请求头部
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
            item = { name: item.name, url: item.url };
            return item;
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
    handleClick() {
      this.$nextTick(() => {
        this.$refs.fileUpload.$refs["upload-inner"].handleClick();
      });
    },
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
      this.$modal.loading("正在上传文件，请稍候...");
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
      this.$modal.msgError("上传图片失败，请重试");
      this.$modal.closeLoading();
    },
    // 上传成功回调
    handleUploadSuccess(res, file) {
      if (res.code === 200) {
        this.uploadList.push({ name: this.filename, url: res.data.url });
        this.filename = undefined;
        this.uploadedSuccessfully();
        this.$emit("handleUploadSuccess", res, file);
      } else {
        this.number--;
        this.$modal.closeLoading();
        this.$modal.msgError(res.message);
        this.$refs.fileUpload.handleRemove(file);
        this.uploadedSuccessfully();
      }
    },
    // 删除文件
    handleDelete(index, file) {
      this.fileList.splice(index, 1);
      this.$emit("handleDelete", index);
      this.$emit("input", this.fileList);
    },
    // 上传结束处理
    uploadedSuccessfully() {
      if (this.number > 0 && this.uploadList.length === this.number) {
        this.fileList = this.fileList.concat(this.uploadList);
        this.uploadList = [];
        this.number = 0;
        this.$emit("input", this.fileList);
        this.$modal.closeLoading();
      }
    },
    // 获取文件名称
    getFileName(name) {
      if (name && name.indexOf("/") > -1) {
        return name.slice(name.lastIndexOf("/") + 1);
      } else {
        return name;
      }
    },
    // 对象转成指定字符串分隔
    listToString(list, separator) {
      let strs = "";
      separator = separator || ",";
      for (let i in list) {
        strs += list[i].url + separator;
      }
      return strs != "" ? strs.substr(0, strs.length - 1) : "";
    },
  },
};
</script>

<style scoped lang="scss">
.upload-file-uploader {
  margin-bottom: 5px;
}
.upload-file-list .el-upload-list__item {
  border: 1px dashed #e4e7ed;
  line-height: 2;
  margin-bottom: 10px;
  position: relative;
}
.upload-file-list .ele-upload-list__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
}
.ele-upload-list__item-content-action .el-link {
  margin-right: 10px;
}

.fileName {
  font-size: 14px;
  margin-left: 15px;
  .icon {
    margin-right: 5px;
    font-size: 15px;
  }
}
</style>
