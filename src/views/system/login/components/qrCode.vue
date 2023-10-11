<!-- 二维码 -->
<template>
  <div class="qrCode">
    <div class="qrCodeBox">
      <el-image :src="src" />
    </div>
    <div class="prompt">
      {{ "打开微信扫一扫" }}
    </div>
  </div>
</template>

<script>
export default {
  name: "QrCode",
  data() {
    return {
      src: "https://my-1307762674.cos.ap-guangzhou.myqcloud.com/picture/%E4%BA%8C%E7%BB%B4%E7%A0%81.png",
    };
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
