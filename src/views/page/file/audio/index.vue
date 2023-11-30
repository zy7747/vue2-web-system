<!-- 音频 audio -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse :title="'音频'" @reset="resetQueryData" @search="search">
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
      <el-tab-pane label="音频">
        <Toolbar
          :delete-btn="{
            disabled: checkList.length === 0,
          }"
          @addLine="addLine"
          @deleteLines="deleteLines"
          @exportExcel="exportExcel"
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
      width="1000px"
      :has-check="title !== '详情'"
      @handleConfirm="handleConfirm"
    >
      <template slot="body">
        <CCard title="音频">
          <template slot="body">
            <CForm
              ref="form"
              :disabled="title === '详情'"
              :form-data="formData"
              :form-params="formParams"
            >
              <template slot="url">
                <FileUpload
                  v-model="formData.url"
                  ref="fileUpload"
                  btnName="音频上传"
                  :fileType="['mp3']"
                  :uploadData="{
                    path: '/音频',
                    parentId: '1709204168643567618',
                  }"
                  @handleDelete="handleDelete"
                ></FileUpload>
              </template>
            </CForm>
          </template>
        </CCard>
      </template>
    </CDialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //弹框标题
      title: "",
      //多选
      checkList: [],
      //查询表单基础参数
      queryParams: [
        {
          type: "input",
          label: "音频名称",
          prop: "audioName",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "音频分类",
          prop: "type",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "音频地区",
          prop: "region",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "音频类型",
          prop: "videoType",
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
          label: "歌手名称",
          prop: "singer",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "作词",
          prop: "lyricist",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "作曲",
          prop: "composing",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "状态",
          prop: "status",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "创作年份",
          prop: "createYear",
          span: 6,
          attributes: {},
          on: {},
        },
      ],
      //数据
      queryData: {
        id: null,
        audioName: null,
        title: null,
        type: null,
        region: null,
        url: [],
        picture: null,
        videoType: null,
        profile: null,
        label: null,
        singer: null,
        lyricist: null,
        composing: null,
        lyrics: null,
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
        tenantId: null,
        version: null,
      },
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
          label: "音频名称",
          prop: "audioName",
          width: 150,
          sortable: true,
        },
        {
          label: "音频标题",
          prop: "title",
          width: 150,
          sortable: true,
        },
        {
          label: "音频分类",
          prop: "type",
          translation: "audio_type",
          width: 150,
          sortable: true,
        },
        {
          label: "音频地区",
          prop: "region",
          width: 150,
          translation: "video_area",
          sortable: true,
        },
        {
          label: "url地址",
          prop: "url",
          width: 150,
          sortable: true,
        },
        {
          label: "音频图片",
          prop: "picture",
          width: 150,
          sortable: true,
        },
        {
          label: "音频类型",
          prop: "videoType",
          width: 150,
          sortable: true,
        },
        {
          label: "音频简介",
          prop: "profile",
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
          label: "歌手名称",
          prop: "singer",
          width: 150,
          sortable: true,
        },
        {
          label: "作词",
          prop: "lyricist",
          width: 150,
          sortable: true,
        },
        {
          label: "作曲",
          prop: "composing",
          width: 150,
          sortable: true,
        },
        {
          label: "歌词",
          prop: "lyrics",
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
          label: "创作年份",
          prop: "createYear",
          width: 150,
          sortable: true,
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
      //表格数据
      tableData: [],
      //新增表单基础参数
      formParams: [
        {
          type: "input",
          label: "音频名称",
          prop: "audioName",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "音频标题",
          prop: "title",
          span: 6,
          on: {},
        },
        {
          type: "select",
          label: "音频地区",
          prop: "region",
          options: this.getDictData("video_area"),
          span: 6,
          on: {},
        },
        {
          type: "select",
          label: "状态",
          prop: "status",
          span: 6,
          options: this.getDictData("video_status"),
          on: {},
        },
        {
          type: "input",
          label: "音频类型",
          prop: "videoType",
          span: 6,
          on: {},
        },
        {
          type: "select",
          label: "音频分类",
          prop: "type",
          options: this.getDictData("audio_type"),
          span: 6,
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
          type: "input",
          label: "歌手名称",
          prop: "singer",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "作词",
          prop: "lyricist",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "作曲",
          prop: "composing",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "歌词",
          prop: "lyrics",
          span: 6,
          on: {},
        },
        {
          type: "avatarUpload",
          label: "音频图片",
          prop: "picture",
          span: 6,
          attributes: {
            uploadData: {
              path: "/资源管理器/音频封面",
              parentId: "1719598971615318017",
            },
          },
          on: {},
        },
        {
          type: "input",
          label: "音频简介",
          prop: "profile",
          span: 18,
          attributes: {
            type: "textarea",
            autosize: { minRows: 8, maxRows: 8 },
          },
          on: {},
        },
        {
          type: "custom",
          label: "url地址",
          prop: "url",
          componentName: "url",
          span: 24,
          on: {},
        },
      ],
      //新增/修改/详情数据
      formData: {
        id: null,
        audioName: null,
        title: null,
        type: null,
        region: null,
        url: [],
        picture: null,
        videoType: null,
        profile: null,
        label: null,
        singer: null,
        lyricist: null,
        composing: null,
        lyrics: null,
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
        tenantId: null,
        version: null,
      },
    };
  },
  methods: {
    //1.查询
    query(page, size) {
      return this.$service.file.audio
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
    //详情
    detailLine(row, index) {
      this.title = "详情";
      this.detail(row.id);
      this.$refs.dialog.handleOpen();
    },
    //提交
    handleConfirm() {
      // 新增/修改
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          this.$service.file.audio.saveList([this.formData]).then((res) => {
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
    //删除
    deleteLine(row, index) {
      this.$service.file.audio.delete([row]).then((res) => {
        this.search();
      });
    },
    //通过id获取详情
    detail(id) {
      this.$service.file.audio.detail({ id }).then((res) => {
        this.formData = res.data;
      });
    },
    //批量删除
    deleteLines() {
      this.$modal
        .confirm("是否删除")
        .then(() => {
          this.$service.file.audio.delete(this.checkList).then((res) => {
            this.search();
          });
        })
        .catch(() => {});
    },
    //删除上传
    handleDelete(index) {
      this.$service.file.audio
        .delete([this.formData.url[index]])
        .then((res) => {
          this.detail(this.formData.id);
        });
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
        audioName: null,
        title: null,
        type: null,
        region: null,
        url: null,
        picture: null,
        videoType: null,
        profile: null,
        label: null,
        singer: null,
        lyricist: null,
        composing: null,
        lyrics: null,
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
        tenantId: null,
        version: null,
      });
    },
    //多选
    selection(list) {
      this.checkList = list;
    },
    //导出
    exportExcel() {
      this.$service.file.audio.export().then((res) => {
        this.$download.excel(res, "音频.xlsx");
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
