<!-- 字典 -->
<template>
  <div>
    <CPage ref="pageRef" :pageOption="pageOption">
      <template slot="dialog_body">
        <CCard title="音频列表">
          <template slot="body">
            <div class="videoList">
              <UploadAudio
                v-model="formData.url"
                ref="fileUpload"
                btnName="音频上传"
                :fileType="['mp3']"
                :uploadData="uploadData"
                :formData="formData"
                @handleDelete="handleDelete"
              />
            </div>
          </template>
        </CCard>
      </template>
    </CPage>

    <!-- 批量导入界面 -->
    <CDialog
      ref="importDialog"
      :has-check="false"
      title="批量导入"
      width="1200px"
    >
      <template slot="body">
        <Collapse title="音频集" isExpand :isSearch="false">
          <template slot="content">
            <CForm
              ref="form"
              :form-data="importFormData"
              :form-params="importFormParams"
            />
          </template>
        </Collapse>

        <div style="margin-top: 10px; width: 100%"></div>

        <CCard title="视频列表">
          <template slot="body">
            <div class="videoList">
              <ImportUploadAudio
                isRowDrop
                sortRow="episode"
                v-model="importList"
                ref="fileUpload"
                btnName="音频导入"
                :fileType="['mp3']"
                :uploadData="importUploadData"
                :formData="importFormData"
              />
            </div>
          </template>
        </CCard>
      </template>
    </CDialog>

    <!-- 音频播放界面 -->
    <CDialog ref="audioView" title="听歌" width="1000px" :has-check="false">
      <template slot="body">
        <audio
          ref="audioPlayer"
          class="audio"
          style="width: 100%"
          controls
        ></audio>
      </template>
    </CDialog>
  </div>
</template>

<script>
import UploadAudio from "./components/UploadAudio";
import ImportUploadAudio from "./components/ImportUploadAudio";

export default {
  name: "Audio",
  created() {
    this.serviceDict();
  },
  components: {
    UploadAudio,
    ImportUploadAudio,
  },
  data() {
    return {
      //弹框标题
      title: "",
      //弹框类型
      dialogType: "",
      fileUrl: process.env.VUE_APP_FILE_API,
      //多选
      checkList: [],
      fileList: [],
      fileData: [],
      importList: [],
      //查询数据
      queryData: {
        audioName: null,
        title: null,
        type: null,
        savePath: null,
        region: null,
        url: null,
        picture: null,
        audioType: null,
        profile: null,
        label: null,
        singer: null,
        lyricist: null,
        composing: null,
        lyrics: null,
        duration: null,
        playNum: null,
        status: null,
        remark: null,
        creator: null,
        updater: null,
        createYear: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
        tenantId: null,
        version: null,
      },
      //新增/修改/详情数据
      formData: {
        audioName: null,
        title: null,
        type: null,
        savePath: null,
        region: null,
        url: null,
        picture: null,
        audioType: null,
        profile: null,
        label: null,
        singer: null,
        lyricist: null,
        composing: null,
        lyrics: null,
        duration: null,
        playNum: null,
        status: null,
        remark: null,
        creator: null,
        updater: null,
        createYear: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
        tenantId: null,
        version: null,
      },
      //批量导入数据
      importFormData: {
        audioName: null,
        title: null,
        type: null,
        savePath: null,
        region: null,
        url: null,
        picture: null,
        audioType: null,
        profile: null,
        label: null,
        singer: null,
        lyricist: null,
        composing: null,
        lyrics: null,
        duration: null,
        playNum: null,
        status: null,
        remark: null,
        creator: null,
        updater: null,
        createYear: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
        tenantId: null,
        version: null,
      },
    };
  },
  computed: {
    pageOption() {
      const self = this;
      return {
        formConfig: {
          title: self.$t("audio.audio"),
          queryParams: [
            {
              type: "input",
              label: this.$t("audio.audioName"), //音频名称
              prop: "audioName",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("audio.type"), //音频分类
              prop: "type",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("audio.region"), //音频地区
              prop: "region",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("audio.audioType"), //音频类型
              prop: "audioType",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("audio.label"), //标签
              prop: "label",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("audio.singer"), //歌手名称
              prop: "singer",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("audio.lyricist"), //作词
              prop: "lyricist",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("audio.composing"), //作曲
              prop: "composing",
              span: 6,
            },
          ],
          queryData: this.queryData,
        },
        tableConfig: [
          {
            title: self.$t("audio.audio"),
            tableColumn: [
              {
                type: "selection",
              },
              {
                label: this.$t("system.no"), //序号
                type: "index",
              },
              {
                label: this.$t("audio.picture"), //音频图片
                prop: "picture",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("audio.audioName"), //音频名称
                prop: "audioName",
                width: 200,
                sortable: true,
                type: "link",
                click: (row, index) => {
                  this.audioPlay(row);
                },
              },
              {
                label: this.$t("audio.title"), //音频标题
                prop: "title",
                width: 200,
                sortable: true,
              },
              {
                label: this.$t("audio.type"), //音频分类
                prop: "type",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("audio.region"), //音频地区
                prop: "region",
                width: 150,
                sortable: true,
              },

              {
                label: this.$t("audio.audioType"), //音频类型
                prop: "audioType",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("audio.label"), //标签
                prop: "label",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("audio.singer"), //歌手名称
                prop: "singer",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("audio.lyricist"), //作词
                prop: "lyricist",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("audio.composing"), //作曲
                prop: "composing",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("audio.lyrics"), //歌词
                prop: "lyrics",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("audio.duration"), //时长
                prop: "duration",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("audio.playNum"), //播放量
                prop: "playNum",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("audio.status"), //状态
                prop: "status",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("audio.creator"), //创建人
                prop: "creator",
                width: 150,
                sortable: true,
                translation: "user",
              },
              {
                label: this.$t("audio.updater"), //更新人
                prop: "updater",
                width: 150,
                sortable: true,
                translation: "user",
              },
              {
                label: this.$t("audio.createYear"), //创作年份
                prop: "createYear",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("audio.createTime"), //创建时间
                prop: "createTime",
                width: 200,
                sortable: true,
              },
              {
                label: this.$t("audio.updateTime"), //更新时间
                prop: "updateTime",
                width: 200,
                sortable: true,
              },
              {
                type: "action",
                fixed: "right",
                width: 200,
              },
            ],
            tools: [
              {
                type: "add",
                permission: ["file:audio:add"],
                on: {
                  click() {
                    self.title = "新增";
                    self.dialogType = "add";
                    self.resetForm();
                    self.$refs.pageRef.dialogOpen();
                  },
                },
              },
              {
                type: "remove",
                permission: ["file:audio:delete"],
                options: {
                  disabled: self.checkList.length === 0,
                },
                on: {
                  click() {
                    self.$service.file.audio
                      .delete(self.checkList)
                      .then((res) => {
                        if (res.code === 200) {
                          self.$message.success("删除成功");
                          self.$refs.pageRef.search();
                        } else {
                          self.$message.warning(res.message);
                        }
                      });
                  },
                },
              },
              {
                type: "import",
                permission: ["file:audio:import"],
                options: {
                  api() {
                    return self.$service.file.audio.import();
                  },
                },
              },
              {
                type: "export",
                permission: ["file:audio:export"],
                options: {
                  api() {
                    return self.$service.file.audio.export();
                  },
                  fileName: self.$t("audio.audio"),
                },
              },
            ],
            actions: [
              {
                type: "edit",
                permission: ["file:audio:edit"],
                click({ row, index }) {
                  self.title = "编辑";
                  self.dialogType = "edit";
                  self.detail(row.id);
                  self.$refs.pageRef.dialogOpen();
                },
              },
              {
                type: "detail",
                click({ row, index }) {
                  self.title = "详情";
                  self.dialogType = "detail";
                  self.detail(row.id);
                  self.$refs.pageRef.dialogOpen();
                },
              },
              {
                type: "remove",
                permission: ["file:audio:delete"],
                click({ row, index }) {
                  self.$service.file.audio.delete([row]).then((res) => {
                    if (res.code === 200) {
                      self.$message.success("删除成功");
                      self.$refs.pageRef.search();
                    }
                  });
                },
              },
            ],
            options: {
              selection(list) {
                self.checkList = list;
              },
            },
            query: (page, size) => {
              return self.$service.file.audio
                .page({ page, size, ...self.queryData })
                .then((res) => {
                  return res.data;
                });
            },
            dialogConfig: {
              "has-check": this.dialogType !== "detail",
              formData: this.formData,
              width: "1400px",
              title: this.title,
              //提交
              handleConfirm() {
                self.$service.file.audio
                  .saveList([self.formData])
                  .then((res) => {
                    if (res.code === 200) {
                      self.$message.success("提交成功");
                      self.$refs.pageRef.search();
                      self.$refs.pageRef.dialogClose();
                      //修改完字典重新获取
                      self.$store.dispatch("GetDict");
                    } else {
                      self.$message.warning(res.message);
                    }
                  });
              },
              formParams: [
                {
                  type: "selectTree",
                  label: this.$t("audio.savePath"), //音频存储节点
                  prop: "savePath",
                  options: this.fileData,
                  attributes: {
                    label: "label",
                    id: "value",
                  },
                  rules: [
                    {
                      required: true,
                      message: "视频保存路径不能为空",
                      trigger: "blur",
                    },
                  ],
                  span: 12,
                  on: {},
                },
                {
                  type: "input",
                  label: this.$t("audio.audioName"), //音频名称
                  prop: "audioName",
                  span: 6,
                  on: {},
                },
                {
                  type: "input",
                  label: this.$t("audio.title"), //音频标题
                  prop: "title",
                  span: 6,
                  on: {},
                },
                {
                  type: "select",
                  label: this.$t("audio.type"), //音频分类
                  prop: "type",
                  options: this.getDictData("audio_type"),
                  span: 6,
                  on: {},
                },
                {
                  type: "select",
                  label: this.$t("audio.region"), //音频地区
                  prop: "region",
                  options: this.getDictData("audio_region"),
                  span: 6,
                  on: {},
                },

                {
                  type: "select",
                  label: this.$t("audio.audioType"), //音频类型
                  prop: "audioType",
                  options: this.getDictData("audio_type"),
                  span: 6,
                  on: {},
                },

                // {
                //   type: "input",
                //   label: this.$t("audio.label"), //标签
                //   prop: "label",
                //   span: 6,
                //   on: {},
                // },
                {
                  type: "input",
                  label: this.$t("audio.singer"), //歌手名称
                  prop: "singer",
                  span: 6,
                  on: {},
                },
                {
                  type: "input",
                  label: this.$t("audio.lyricist"), //作词
                  prop: "lyricist",
                  span: 6,
                  on: {},
                },
                {
                  type: "input",
                  label: this.$t("audio.composing"), //作曲
                  prop: "composing",
                  span: 6,
                  on: {},
                },
                {
                  type: "select",
                  label: this.$t("audio.status"), //状态
                  prop: "status",
                  options: this.getDictData("audio_status"),
                  span: 6,
                  on: {},
                },
                {
                  type: "datePicker",
                  label: this.$t("audio.createYear"), //创作年份
                  prop: "createYear",
                  span: 6,
                  attributes: {
                    format: "yyyy-MM-dd",
                    valueFormat: "yyyy-MM-dd",
                  },
                  on: {},
                },
                {
                  type: "avatarUpload",
                  label: this.$t("audio.picture"), //音频图片
                  prop: "picture",
                  span: 6,
                  attributes: {
                    uploadData: {
                      parentId: "1738494567264088065",
                    },
                  },
                  on: {},
                },
                {
                  type: "input",
                  label: this.$t("audio.profile"), //音频简介
                  prop: "profile",
                  span: 18,
                  attributes: {
                    type: "textarea",
                    autosize: { minRows: 4, maxRows: 4 },
                  },
                  on: {},
                },
              ],
            },
          },
        ],
      };
    },
    //批量导入基础参数
    importFormParams() {
      return [
        {
          type: "selectTree",
          label: "视频保存路径",
          prop: "savePath",
          span: 24,
          options: this.fileData,
          attributes: {
            label: "label",
            id: "value",
          },
          rules: [
            {
              required: true,
              message: "视频保存路径不能为空",
              trigger: "blur",
            },
          ],
        },
        {
          type: "select",
          label: this.$t("video.type"), //视频分类
          prop: "type",
          span: 8,
          options: this.getDictData("video_category"),
          on: {},
        },
        {
          type: "select",
          label: this.$t("video.videoType"), //视频类型
          prop: "videoType",
          span: 8,
          options: this.getDictData("video_type"),
          on: {},
        },
        {
          type: "select",
          label: this.$t("video.region"), //视频地区
          prop: "region",
          span: 8,
          options: this.getDictData("video_area"),
          on: {},
        },
      ];
    },
    uploadData() {
      if (this.formData.savePath) {
        const item = this.fileList.find((i) => i.id === this.formData.savePath);
        return { path: item.filePath, parentId: item.id };
      }
    },
    importUploadData() {
      if (this.importFormData.savePath) {
        const item = this.fileList.find(
          (i) => i.id === this.importFormData.savePath
        );

        return { path: item.filePath, parentId: item.id };
      }
    },
  },
  methods: {
    //删除上传
    handleDelete(row) {
      this.$service.file.audio.delete([row]).then((res) => {
        this.detail(this.formData.id);
      });
    },
    //通过接口请求的下拉
    serviceDict() {
      //获取文件树列表
      this.getServiceData([
        { serviceCode: "getFileList", params: { fileType: "folder" } },
      ]).then((res) => {
        //平铺的数据
        this.fileList = res.getFileList;
        //树形数据
        this.fileData = this.$handleTree(res.getFileList);
      });
    },
    //通过id获取详情
    detail(id) {
      this.$service.file.audio.detail({ id }).then((res) => {
        if (res.code === 200) {
          this.formData = res.data;
        }
      });
    },
    //重置新增修改表单数据
    resetForm() {
      this.formData = {
        audioName: null,
        title: null,
        type: null,
        savePath: null,
        region: null,
        url: null,
        picture: null,
        audioType: null,
        profile: null,
        label: null,
        singer: null,
        lyricist: null,
        composing: null,
        lyrics: null,
        duration: null,
        playNum: null,
        status: null,
        remark: null,
        creator: null,
        updater: null,
        createYear: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
        tenantId: null,
        version: null,
      };
    },
    //视频播放
    audioPlay(row) {
      this.$refs.audioView.handleOpen();
      this.$nextTick(() => {
        this.$refs.audioPlayer.src = JSON.parse(
          JSON.stringify(this.fileUrl + row?.url)
        );
        this.$refs.audioPlayer.load();
      });
    },
    imports() {
      this.$set(this, "importFormData", {
        audioName: null,
        title: null,
        type: null,
        savePath: null,
        region: null,
        url: null,
        picture: null,
        audioType: null,
        profile: null,
        label: null,
        singer: null,
        lyricist: null,
        composing: null,
        lyrics: null,
        duration: null,
        playNum: null,
        status: null,
        remark: null,
        creator: null,
        updater: null,
        createYear: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
        tenantId: null,
        version: null,
      });
      this.importList = [];
      this.$refs.importDialog.handleOpen();
    },
  },
};
</script>

<style lang="scss" scoped>
.videoList {
  width: 100%;
  height: 200px;
  overflow: auto;
}

.videos {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  .video {
    display: block;
    width: 140px;
    height: 30px;
    margin: 5px;
    padding: 3px 8px;
    border: 1px solid black;
    a {
      display: block;
      text-align: center;
      line-height: 22px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .active {
    background-color: pink;
  }
}
</style>
