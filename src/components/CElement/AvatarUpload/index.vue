<!--  -->
<template>
  <div class="avatarBox">
    <el-upload
      class="avatar-uploader"
      :action="baseUrl"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-error="handleUploadError"
      :data="uploadData"
      :headers="headers"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <img v-if="imageUrl" :src="fileUrl + imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import baseParams from "./mixins/index";
import { getToken } from "@/utils/auth";

export default {
  name: "AvatarUpload",
  mixins: [baseParams],
  data() {
    return {
      imageUrl: this.value,
      fileUrl: process.env.VUE_APP_FILE_API,
      baseUrl: process.env.VUE_APP_BASE_API + "/file/upload", // 请求地址
      headers: { Authorization: getToken() }, // 设置上传的请求头部
    };
  },
  methods: {
    // 上传成功回调
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        this.$set(this, "imageUrl", res.data.filePath);
        this.$modal.closeLoading();
      } else {
        this.$modal.msgError(res.message);
      }
    },
    beforeAvatarUpload(file) {
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

      return true;
    },
    // 上传失败
    handleUploadError(err) {
      this.$modal.msgError("上传图片失败，请重试");
      this.$modal.closeLoading();
    },
  },
  watch: {
    value(val) {
      this.imageUrl = val;
    },
    imageUrl(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
  width: 125px;
  height: 125px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.avatarBox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
