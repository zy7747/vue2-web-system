<!-- 字典 -->
<template>
  <div>
    <CPage ref="pageRef" :pageOption="pageOption">
      <template slot="dialog_body">
        <CCard title="视频列表" v-if="this.formData.id">
          <template slot="body">
            <div class="videoList">
              <UploadVideo
                isRowDrop
                sortRow="episode"
                v-model="videoList"
                ref="fileUpload"
                btnName="视频上传"
                :fileType="['mp4']"
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
        <Collapse title="视频集" isExpand :isSearch="false">
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
              <ImportUploadVideo
                isRowDrop
                sortRow="episode"
                v-model="importList"
                ref="fileUpload"
                btnName="视频导入"
                :fileType="['mp4']"
                :uploadData="importUploadData"
                :formData="importFormData"
              />
            </div>
          </template>
        </CCard>
      </template>
    </CDialog>

    <!-- 视频浏览界面 -->
    <CDialog ref="videoView" title="视频观看" width="1000px" :has-check="false">
      <template slot="body">
        <VideoPlayer ref="VideoPlayer" :videoInfo="videoInfo"></VideoPlayer>

        <div style="margin-top: 10px; width: 100%; height: max-content"></div>

        <CCard title="视频列表">
          <template slot="body">
            <ul class="videos">
              <li
                class="video"
                :class="{ active: action === index }"
                v-for="(item, index) in videoList"
                :key="item.id"
              >
                <a href="JavaScript:void(0)" @click="play(index)">
                  {{ item.videoName }}
                </a>
              </li>
            </ul>
          </template>
        </CCard>
      </template>
    </CDialog>
  </div>
</template>

<script>
import UploadVideo from "./components/UploadVideo";
import ImportUploadVideo from "./components/ImportUploadVideo";

export default {
  name: "VideoPage",
  created() {
    this.serviceDict();
  },
  components: {
    UploadVideo,
    ImportUploadVideo,
  },
  data() {
    return {
      fileUrl: process.env.VUE_APP_FILE_API,
      //弹框标题
      title: "",
      //多选
      checkList: [],
      fileData: [],
      importList: [],
      videoList: [],
      videoInfo: {},
      fileList: [],
      rowId: undefined,
      action: 0,
      //弹框类型
      dialogType: "",
      //数据
      queryData: {
        id: null,
        parentId: null,
        videoName: null,
        title: null,
        type: null,
        region: null,
        url: null,
        picture: null,
        videoType: null,
        profile: null,
        label: null,
        author: null,
        sortWay: null,
        season: null,
        episode: null,
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
        isCollection: null,
      },
      //新增/修改/详情数据
      formData: {
        id: null,
        parentId: null,
        videoName: null,
        title: null,
        type: null,
        region: null,
        url: null,
        picture: null,
        videoType: null,
        profile: null,
        label: null,
        author: null,
        season: null,
        episode: null,
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
        isCollection: null,
      },
      //批量导入数据
      importFormData: {
        id: null,
        parentId: null,
        videoName: null,
        title: null,
        type: null,
        region: null,
        url: null,
        picture: null,
        videoType: null,
        profile: null,
        label: null,
        author: null,
        season: null,
        episode: null,
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
        isCollection: 0,
      },
    };
  },
  computed: {
    pageOption() {
      const self = this;
      return {
        formConfig: {
          title: self.$t("video.video"),
          queryParams: [
            {
              type: "input",
              label: this.$t("video.videoName"), //视频名称
              prop: "videoName",
              span: 6,
              attributes: {},
            },
            {
              type: "select",
              label: this.$t("video.type"), //视频分类
              prop: "type",
              options: this.getDictData("video_category"),
              span: 6,
              attributes: {},
            },
            {
              type: "select",
              label: this.$t("video.videoType"), //视频类型
              prop: "videoType",
              options: this.getDictData("video_type"),
              span: 6,
              attributes: {},
            },
            {
              type: "select",
              label: this.$t("video.region"), //视频地区
              prop: "region",
              options: this.getDictData("video_area"),
              span: 6,
              attributes: {},
            },
            {
              type: "select",
              label: "排序方式",
              prop: "sortWay",
              options: this.getDictData("video_sort_way"),
              span: 6,
            },
            {
              type: "input",
              label: this.$t("video.label"), //标签
              prop: "label",
              span: 6,
              attributes: {},
            },
            {
              type: "input",
              label: this.$t("video.author"), //作者
              prop: "author",
              span: 6,
              attributes: {},
            },
            {
              type: "select",
              label: this.$t("video.status"), //状态
              prop: "status",
              span: 6,
              options: this.getDictData("video_status"),
              attributes: {},
            },
            {
              type: "datePicker",
              label: "月份", //月份
              prop: "month",
              span: 6,
              attributes: {
                type: "month",
                "value-format": "yyyy-MM",
                format: "yyyy-MM",
              },
            },
            {
              type: "dateTimePicker",
              label: "日期范围", //日期范围
              prop: "starTime",
              propEnd: "endTime",
              span: 12,
              attributes: {
                type: "datetimerange",
                "value-format": "yyyy-MM",
                format: "yyyy-MM",
              },
            },
          ],
          queryData: this.queryData,
        },
        tableConfig: [
          {
            title: self.$t("video.video"),
            tableColumn: [
              {
                type: "selection",
                width: 55,
              },
              {
                label: this.$t("system.no"), //序号
                type: "index",
                width: 55,
              },
              {
                label: this.$t("video.picture"), //视频图片
                prop: "picture",
                type: "picture",
                width: 120,
                sortable: true,
              },
              {
                label: this.$t("video.videoName"), //视频名称
                prop: "videoName",
                type: "link",
                width: 300,
                sortable: true,
                click: (row, index) => {
                  this.videoPlay(row.id);
                },
              },
              {
                label: this.$t("video.title"), //视频标题
                prop: "title",
                width: 300,
                sortable: true,
              },
              {
                label: this.$t("video.type"), //视频分类
                prop: "type",
                translation: "video_category",
                width: 120,
                sortable: true,
              },
              {
                label: this.$t("video.region"), //视频地区
                prop: "region",
                translation: "video_area",
                width: 120,
                sortable: true,
              },
              {
                label: this.$t("video.videoType"), //视频类型
                prop: "videoType",
                translation: "video_type",
                width: 120,
                sortable: true,
              },
              {
                label: this.$t("video.author"), //作者
                prop: "author",
                width: 120,
                sortable: true,
              },
              {
                label: this.$t("video.createYear"), //创作年份
                prop: "createYear",
                width: 120,
                sortable: true,
              },
              {
                label: this.$t("video.label"), //标签
                prop: "label",
                width: 120,
                sortable: true,
              },
              {
                label: this.$t("video.season"), //季
                prop: "season",
                width: 100,
                sortable: true,
              },
              {
                label: this.$t("video.episode"), //集
                prop: "episode",
                width: 100,
                sortable: true,
              },
              {
                label: this.$t("video.duration"), //时长
                prop: "duration",
                width: 100,
                sortable: true,
              },
              {
                label: "点赞量",
                prop: "starsNum",
                width: 100,
                sortable: true,
              },
              {
                label: "收藏量",
                prop: "collectionNum",
                width: 100,
                sortable: true,
              },
              {
                label: "播放量",
                prop: "playNum",
                width: 100,
                sortable: true,
              },

              {
                label: this.$t("video.status"), //状态
                prop: "status",
                width: 100,
                sortable: true,
                translation: "video_status",
              },
              {
                label: this.$t("video.creator"), //创建人
                prop: "creator",
                width: 150,
                sortable: true,
                translation: "user",
              },
              {
                label: this.$t("video.updater"), //更新人
                prop: "updater",
                width: 150,
                sortable: true,
                translation: "user",
              },
              {
                label: this.$t("video.createTime"), //创建时间
                prop: "createTime",
                width: 300,
                sortable: true,
              },
              {
                label: this.$t("video.updateTime"), //更新时间
                prop: "updateTime",
                width: 300,
                sortable: true,
              },
              {
                label: "操作",
                type: "action",
                fixed: "right",
                width: 160,
              },
            ],
            tools: [
              {
                type: "add",
                permission: ["file:video:add"],
                on: {
                  click() {
                    self.title = "新增";
                    self.dialogType = "add";
                    self.rowId = undefined;
                    self.resetForm();
                    self.$refs.pageRef.dialogOpen();
                  },
                },
              },
              {
                type: "remove",
                permission: ["file:video:delete"],
                options: {
                  disabled: self.checkList.length === 0,
                },
                on: {
                  click() {
                    self.$service.file.video
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
                text: "批量导入",
                permission: ["file:video:import"],
                icon: "el-icon-upload2",
                type: "info",
                on: {
                  click() {
                    self.imports();
                  },
                },
              },
              {
                type: "export",
                permission: ["file:video:export"],
                options: {
                  api() {
                    return self.$service.file.video.export();
                  },
                  fileName: self.$t("video.video"),
                },
              },
            ],
            actions: [
              {
                type: "edit",
                permission: ["file:video:edit"],
                click({ row, index }) {
                  self.title = "编辑";
                  self.dialogType = "edit";
                  self.rowId = row.id;
                  self.detail(row.id);
                  self.$refs.pageRef.dialogOpen();
                },
              },
              {
                type: "detail",
                click({ row, index }) {
                  self.title = "详情";
                  self.dialogType = "detail";
                  self.rowId = row.id;
                  self.detail(row.id);
                  self.$refs.pageRef.dialogOpen();
                },
              },
              {
                type: "remove",
                permission: ["file:video:delete"],
                click({ row, index }) {
                  self.$service.file.video.delete([row]).then((res) => {
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
              console.log({ page, size, ...self.queryData });
              return self.$service.file.video
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
                self.handleConfirm();
              },
              formParams: [
                {
                  type: "radio",
                  label: this.$t("video.isCollection"), //是否是集合
                  prop: "isCollection",
                  span: 6,
                  options: this.getDictData("isNo"),
                  rules: [
                    {
                      required: true,
                      message: "是否是集合不能为空",
                      trigger: "blur",
                    },
                  ],
                },
                {
                  type: "selectTree",
                  label: "视频保存路径",
                  prop: "savePath",
                  span: 18,
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
                  type: "input",
                  label: this.$t("video.videoName"), //视频名称
                  prop: "videoName",
                  span: 6,
                  rules: [
                    {
                      required: true,
                      message: "视频名称不能为空",
                      trigger: "blur",
                    },
                  ],
                },
                {
                  type: "input",
                  label: this.$t("video.title"), //视频标题
                  prop: "title",
                  span: 6,
                  rules: [
                    {
                      required: true,
                      message: "视频标题不能为空",
                      trigger: "blur",
                    },
                  ],
                },
                {
                  type: "select",
                  label: this.$t("video.type"), //视频分类
                  prop: "type",
                  span: 6,
                  rules: [
                    {
                      required: true,
                      message: "视频分类不能为空",
                      trigger: "blur",
                    },
                  ],
                  options: this.getDictData("video_category"),
                },
                {
                  type: "select",
                  label: this.$t("video.videoType"), //视频类型
                  prop: "videoType",
                  span: 6,
                  rules: [
                    {
                      required: true,
                      message: "视频类型不能为空",
                      trigger: "blur",
                    },
                  ],
                  options: this.getDictData("video_type"),
                },
                {
                  type: "select",
                  label: this.$t("video.region"), //视频地区
                  prop: "region",
                  span: 6,
                  rules: [
                    {
                      required: true,
                      message: "视频地区不能为空",
                      trigger: "blur",
                    },
                  ],
                  options: this.getDictData("video_area"),
                },
                {
                  type: "input",
                  label: this.$t("video.label"), //标签
                  prop: "label",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("video.author"), //作者
                  prop: "author",
                  span: 6,
                },
                {
                  type: "select",
                  label: this.$t("video.status"), //状态
                  prop: "status",
                  span: 6,
                  rules: [
                    {
                      required: true,
                      message: "状态不能为空",
                      trigger: "blur",
                    },
                  ],
                  options: this.getDictData("video_status"),
                },
                {
                  type: "avatarUpload",
                  label: this.$t("video.picture"), //视频图片
                  prop: "picture",
                  span: 6,
                  attributes: {
                    uploadData: {
                      parentId: "1738494567264088065",
                    },
                  },
                },

                {
                  type: "datePicker",
                  label: this.$t("video.createYear"), //创作年份
                  prop: "createYear",
                  span: 6,
                  attributes: {
                    format: "yyyy-MM-dd",
                    valueFormat: "yyyy-MM-dd",
                  },
                },
                {
                  type: "number",
                  label: this.$t("video.season"), //季
                  prop: "season",
                  span: 6,
                },
                {
                  type: "number",
                  label: this.$t("video.episode"), //集
                  attributes: {
                    disabled: true,
                  },
                  prop: "episode",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("video.profile"), //视频简介
                  prop: "profile",
                  span: 18,
                  attributes: {
                    type: "textarea",
                    autosize: { minRows: 4, maxRows: 4 },
                  },
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
        },
        {
          type: "select",
          label: this.$t("video.videoType"), //视频类型
          prop: "videoType",
          span: 8,
          options: this.getDictData("video_type"),
        },
        {
          type: "select",
          label: this.$t("video.region"), //视频地区
          prop: "region",
          span: 8,
          options: this.getDictData("video_area"),
        },
      ];
    },

    uploadData() {
      if (this.formData.id) {
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
      this.$service.file.video.delete([row]).then((res) => {
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
    //提交
    async handleConfirm() {
      //生成一个文件夹存放视频
      let savePath = JSON.parse(JSON.stringify(this.formData.savePath));

      if (!this.formData.id) {
        // 新增
        const fileRes = await this.$service.file.file.createFolder({
          fileName: this.formData.videoName,
          fileType: "folder",
          parentId: this.formData.savePath,
        });

        savePath = fileRes.data.id;
      }

      let queryData = [];

      //集合与非集合的保存数据
      if (this.formData.isCollection === 0) {
        queryData = [
          { ...this.formData, episode: this.videoList.length, savePath },
        ];
      } else {
        queryData = [
          { ...this.formData, episode: this.videoList.length, savePath },
          ...this.videoList.map((item, index) => {
            return { ...item, episode: index + 1 };
          }),
        ];
      }

      //如果是修改则直接走变更
      this.$service.file.video.saveList(queryData).then((res) => {
        if (res.code === 200) {
          this.$message.success("提交成功");
          this.$refs.pageRef.search();
          this.$refs.pageRef.dialogClose();
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    //通过id获取详情
    detail(id) {
      this.serviceDict();
      this.$service.file.video.detail({ id }).then((res) => {
        this.formData = res.data;
        this.videoList = res.data.videoList.map((item) => {
          return { ...item, name: item.videoName };
        });
      });
    },
    //重置新增修改表单数据
    resetForm() {
      this.$set(this, "formData", {
        id: null,
        parentId: null,
        videoName: null,
        title: null,
        type: null,
        region: null,
        url: null,
        picture: null,
        videoType: null,
        profile: null,
        label: null,
        author: null,
        season: null,
        episode: null,
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
    },
    //视频播放
    videoPlay(id) {
      this.$service.file.video.detail({ id }).then((res) => {
        this.formData = res.data;
        this.videoList = res.data.videoList.map((item) => {
          return { ...item, name: item.videoName };
        });
        this.videoInfo = this.videoList[0];
        this.action = 0;
        this.$refs.videoView.handleOpen();
        this.$nextTick(() => {
          this.$refs.VideoPlayer.setVideo(this.fileUrl + this.videoInfo?.url);
        });
      });
    },
    //播放切换
    play(index) {
      this.videoInfo = this.videoList[index];
      this.action = index;
      this.$refs.VideoPlayer.setVideo(this.fileUrl + this.videoInfo.url);
    },
    imports() {
      this.$set(this, "importFormData", {
        id: null,
        parentId: null,
        videoName: null,
        title: null,
        type: null,
        region: null,
        url: null,
        picture: null,
        videoType: null,
        profile: null,
        label: null,
        author: null,
        season: null,
        episode: null,
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
        isCollection: 0,
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
  height: 400px;
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
