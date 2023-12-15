<!-- 视频 video -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse :title="'视频'" @reset="resetQueryData" @search="search">
      <template slot="content">
        <CForm
          ref="queryForm"
          :form-data="queryData"
          :form-params="queryParams"
        />
      </template>
    </Collapse>
    <!-- 表单栏 -->
    <el-tabs type="border-card">
      <el-tab-pane label="视频">
        <Toolbar
          :delete-btn="{
            disabled: checkList.length === 0,
          }"
          :exports="{
            api: $service.file.video.export,
            fileName: '视频',
            data: {},
          }"
          @addLine="addLine"
          @deleteLines="deleteLines"
        />
        <CTable
          ref="table"
          :query="query"
          :table-column="tableColumn"
          @editLine="editLine"
          @detailLine="detailLine"
          @deleteLine="deleteLine"
          @handleSelectionChange="selection"
        />
      </el-tab-pane>
    </el-tabs>
    <!-- 新增/编辑/详情弹框 -->
    <CDialog
      ref="dialog"
      :title="title"
      width="1200px"
      :has-check="title !== '详情'"
      @handleConfirm="handleConfirm"
    >
      <template slot="body">
        <Collapse title="视频集" :isSearch="false">
          <template slot="content">
            <CForm
              :disabled="title === '详情'"
              ref="form"
              :form-data="formData"
              :form-params="formParams"
            />
          </template>
        </Collapse>
        <div style="margin-top: 10px; width: 100%"></div>
        <CCard title="视频列表" v-if="this.formData.id">
          <template slot="body">
            <div class="videoList">
              <FileUpload
                :disabled="true"
                v-model="videoList"
                ref="fileUpload"
                btnName="视频上传"
                :fileType="['mp4']"
                @handleDelete="handleDelete"
              ></FileUpload>
            </div>
          </template>
        </CCard>
      </template>
    </CDialog>

    <CDialog
      :destroyOnClose="true"
      ref="videoView"
      title="视频观看"
      width="1000px"
      :has-check="false"
    >
      <template slot="body">
        <VideoPlayer ref="VideoPlayer" :videoInfo="videoInfo"></VideoPlayer>
        <div style="margin-top: 10px; width: 100%"></div>
        <CCard title="视频列表">
          <template slot="body">
            <ul class="videos">
              <li
                class="video"
                :class="{ active: action === index }"
                v-for="(item, index) in videoList"
                :key="item.id"
              >
                <a href="JavaScript:void(0)" @click="play(index)">{{
                  item.videoName
                }}</a>
              </li>
            </ul>
          </template>
        </CCard>
      </template>
    </CDialog>
  </div>
</template>
<script>
export default {
  name: "VideoPage",
  data() {
    return {
      fileUrl: process.env.VUE_APP_FILE_API,
      //弹框标题
      title: "",
      //多选
      checkList: [],
      //查询表单基础参数
      queryParams: [
        {
          type: "input",
          label: "视频名称",
          prop: "videoName",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: "视频分类",
          prop: "type",
          options: this.getDictData("video_category"),
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: "视频类型",
          prop: "videoType",
          options: this.getDictData("video_type"),
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: "视频地区",
          prop: "region",
          options: this.getDictData("video_area"),
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: "排序方式",
          prop: "sortWay",
          options: this.getDictData("video_sort_way"),
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "标签",
          prop: "label",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "作者名称",
          prop: "author",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: "状态",
          prop: "status",
          span: 6,
          options: this.getDictData("video_status"),
          attributes: {},
          on: {},
        },
      ],
      action: 0,
      //表列基础参数
      tableColumn: [
        {
          type: "selection",
          width: 55,
        },
        {
          label: "序号",
          type: "index",
          width: 55,
        },
        {
          label: "视频图片",
          prop: "picture",
          type: "picture",
          width: 150,
          sortable: true,
        },
        {
          label: "视频名称",
          prop: "videoName",
          type: "link",
          width: 150,
          sortable: true,
          click: (row, index) => {
            this.videoPlay(row.id);
          },
        },
        {
          label: "视频标题",
          prop: "title",
          width: 150,
          sortable: true,
        },
        {
          label: "视频分类",
          prop: "type",
          translation: "video_category",
          width: 150,
          sortable: true,
        },
        {
          label: "视频地区",
          prop: "region",
          translation: "video_area",
          width: 150,
          sortable: true,
        },
        {
          label: "视频类型",
          prop: "videoType",
          translation: "video_type",
          width: 150,
          sortable: true,
        },
        {
          label: "作者名称",
          prop: "author",
          width: 150,
          sortable: true,
        },
        {
          label: "创作年份",
          prop: "createYear",
          width: 150,
          sortable: true,
        },
        {
          label: "标签",
          prop: "label",
          width: 150,
          sortable: true,
        },
        {
          label: "季",
          prop: "season",
          width: 150,
          sortable: true,
        },
        {
          label: "集",
          prop: "episode",
          width: 150,
          sortable: true,
        },
        {
          label: "时长",
          prop: "duration",
          width: 150,
          sortable: true,
        },
        {
          label: "点赞量",
          prop: "starsNum",
          width: 150,
          sortable: true,
        },
        {
          label: "收藏量",
          prop: "collectionNum",
          width: 150,
          sortable: true,
        },
        {
          label: "播放量",
          prop: "playNum",
          width: 150,
          sortable: true,
        },

        {
          label: "状态",
          prop: "status",
          width: 150,
          sortable: true,
          translation: "video_status",
        },
        {
          label: "备注",
          prop: "remark",
          width: 150,
          sortable: true,
        },
        {
          label: "创建人",
          prop: "creator",
          width: 150,
          sortable: true,
          translation: "user",
        },
        {
          label: "更新人",
          prop: "updater",
          width: 150,
          sortable: true,
          translation: "user",
        },

        {
          label: "创建时间",
          prop: "createTime",
          width: 150,
          sortable: true,
        },
        {
          label: "更新时间",
          prop: "updateTime",
          width: 150,
          sortable: true,
        },
        {
          label: "操作",
          type: "action",
          fixed: "right",
          width: 160,
        },
      ],
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
        season: null,
        episode: null,
        duration: null,
        starsNum: null,
        collectionNum: null,
        playNum: null,
        status: null,
        remark: null,
        creator: null,
        updater: null,
        createYear: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
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
        starsNum: null,
        collectionNum: null,
        playNum: null,
        status: null,
        remark: null,
        creator: null,
        updater: null,
        createYear: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
      },
      videoList: [],
      videoInfo: {},
      //新增表单基础参数
      formParams: [
        {
          type: "input",
          label: "视频名称",
          prop: "videoName",
          span: 6,
          rules: [
            { required: true, message: "视频名称不能为空", trigger: "blur" },
          ],
          on: {},
        },
        {
          type: "input",
          label: "视频标题",
          prop: "title",
          span: 6,
          rules: [
            { required: true, message: "视频标题不能为空", trigger: "blur" },
          ],
          on: {},
        },
        {
          type: "select",
          label: "视频分类",
          prop: "type",
          span: 6,
          rules: [
            { required: true, message: "视频分类不能为空", trigger: "blur" },
          ],
          options: this.getDictData("video_category"),
          on: {},
        },
        {
          type: "select",
          label: "视频类型",
          prop: "videoType",
          span: 6,
          rules: [
            { required: true, message: "视频类型不能为空", trigger: "blur" },
          ],
          options: this.getDictData("video_type"),
          on: {},
        },
        {
          type: "select",
          label: "视频地区",
          prop: "region",
          span: 6,
          rules: [
            { required: true, message: "视频地区不能为空", trigger: "blur" },
          ],
          options: this.getDictData("video_area"),
          on: {},
        },
        {
          type: "input",
          label: "标签",
          prop: "label",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "作者名称",
          prop: "author",
          span: 6,
          on: {},
        },
        {
          type: "select",
          label: "状态",
          prop: "status",
          span: 6,
          rules: [{ required: true, message: "状态不能为空", trigger: "blur" }],
          options: this.getDictData("video_status"),
          on: {},
        },
        {
          type: "avatarUpload",
          label: "视频图片",
          prop: "picture",
          span: 6,
          attributes: {
            uploadData: {
              path: "/资源管理器/视频封面",
              parentId: "1708480352590258177",
            },
          },
          on: {},
        },
        {
          type: "datePicker",
          label: "创作年份",
          prop: "createYear",
          span: 6,
          attributes: {
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
          },
          on: {},
        },
        {
          type: "number",
          label: "季",
          prop: "season",
          span: 6,
          on: {},
        },
        {
          type: "number",
          label: "集",
          prop: "episode",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "视频简介",
          prop: "profile",
          span: 18,
          attributes: {
            type: "textarea",
            autosize: { minRows: 4, maxRows: 4 },
          },
          on: {},
        },
      ],
    };
  },
  methods: {
    //1.查询
    query(page, size) {
      return this.$service.file.video
        .page({ page, size, ...this.queryData })
        .then((res) => {
          return res.data;
        });
    },
    //新增
    addLine() {
      this.title = "新增";
      this.resetForm();
      this.$refs.dialog.handleOpen();
    },
    //编辑
    editLine(row, index) {
      this.title = "编辑";
      this.detail(row.id);
      this.$refs.dialog.handleOpen();
    },
    //提交
    handleConfirm() {
      // 新增
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          this.$service.file.video.saveList([this.formData]).then((res) => {
            if (res.code === 200) {
              this.$message.success("提交成功");
              this.search();
              this.$refs.dialog.handleClose();
            } else {
              this.$message.warning(res.message);
            }
          });
        }
      });
    },
    //详情
    detailLine(row, index) {
      this.title = "详情";
      this.$refs.dialog.handleOpen();
      this.detail(row.id);
    },
    //删除
    deleteLine(row, index) {
      this.$service.file.video.delete([row]).then((res) => {
        this.search();
      });
    },
    //删除上传
    handleDelete(index) {
      this.$service.file.video.delete([this.videoList[index]]).then((res) => {
        this.detail(this.formData.id);
      });
    },
    //通过id获取详情
    detail(id) {
      this.$service.file.video.detail({ id }).then((res) => {
        this.formData = res.data;
        this.videoList = res.data.videoList.map((item) => {
          return { ...item, name: item.videoName };
        });
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
    //批量删除
    deleteLines() {
      this.$modal
        .confirm("是否删除")
        .then(() => {
          this.$service.file.video.delete(this.checkList).then((res) => {
            this.search();
          });
        })
        .catch(() => {});
    },
    //搜索
    search() {
      this.$refs.table.queryTableData();
    },
    //重置搜索表单数据
    resetQueryData() {
      //重置表单
      this.$refs.queryForm.reset();
      //刷新表格
      this.$refs.table.refreshTable();
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
        starsNum: null,
        collectionNum: null,
        playNum: null,
        status: null,
        remark: null,
        creator: null,
        updater: null,
        createYear: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
      });
    },
    //多选
    selection(list) {
      this.checkList = list;
    },
  },
};
</script>
<style lang="scss" scoped>
.videoList {
  width: 100%;
  max-height: 300px;
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
