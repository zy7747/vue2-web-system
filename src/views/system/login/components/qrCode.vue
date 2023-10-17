<!-- 二维码 -->
<template>
  <div class="qrCode">
    <div class="qrCodeBox" @click="refresh">
      <canvas ref="qrCodeCanvas" style="width: 200px; height: 200px"> </canvas>
    </div>
    <div class="prompt">
      {{ "打开微信扫一扫" }}
    </div>
  </div>
</template>

<script>
import qrcode from "qrcode";

export default {
  name: "QrCode",
  mounted() {
    this.createQrCode();
  },
  methods: {
    createQrCode() {
      qrcode.toCanvas(this.$refs.qrCodeCanvas, "要生成二维码的内容", {
        width: 200, //自定义宽度
        color: {
          dark: "#000", //自定义码的颜色
          light: "#f6f5f5", //自定义背景颜色
        },
      });
    },
    refresh() {},
  },
};
</script>

<style lang="scss" scoped>
.qrCode {
  background: #f6f5f5;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .qrCodeBox {
    cursor: pointer;
    width: 200px;
    height: 200px;
    border-radius: 15px;
    overflow: hidden;
    border: 1px solid rgb(196, 194, 194);
    .el-image {
      width: 100%;
      height: 100%;
    }
  }
  .prompt {
    margin-top: 5px;
  }
}

.qrCode:before {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  width: 0;
  height: 0;
  border-top: 36px solid #f6f5f5; /* 三角形高度 */
  border-right: 36px solid #f6f5f5; /* 三角形颜色 */
  z-index: 1;
  clip-path: polygon(100% 100%, 0% 100%, 0% 120%, 120% 0%);
}
</style>
