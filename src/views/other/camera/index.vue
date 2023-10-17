<template>
  <div>
    <div class="wrapper">
      <video ref="video" autoplay playsinline></video>
      <button @click="videotape">开启摄像头</button>
      <button @click="screenshot">截图</button>
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: true,
      cxt: null,
      imgUrl: "",
    };
  },
  mounted() {
    this.cxt = this.$refs.canvas.getContext("2d");
  },
  methods: {
    videotape() {
      const video = this.$refs.video;
      navigator.mediaDevices
        .getUserMedia({
          audio: false, //是否录制音频
          video: true, //是否录制视频
        })
        .then((stream) => {
          //开始视频
          video.srcObject = stream;
        })
        .catch((err) => {
          alert("error: " + err.message);
        });
    },
    //截图事件
    screenshot() {
      const video = this.$refs.video;
      const canvas = this.$refs.canvas;
      //画布开始绘制
      this.cxt.drawImage(video, 0, 0, canvas.width, canvas.height);
      //canvas转图片保存
      this.$refs.canvas.toBlob((blob) => {
        let url = URL.createObjectURL(blob);
        //获取到生成的url
        this.imgUrl = url;
      });
    },
  },
};
</script>

<style></style>
