<!-- 音频 audio -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse
      :title="$t('audio.audio')"
      @reset="resetQueryData"
      @search="search"
    >
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
      <el-tab-pane :label="$t('audio.audio')">
        <Toolbar
          :delete-btn="{
            disabled: checkList.length === 0,
          }"
          :imports="{
            url: '/audio/import',
            data: {},
          }"
          :exports="{
            api: $service.file.audio.export,
            fileName: '音频',
            data: {},
          }"
          :permission="{
            add: ['file:audio:add'],
            delete: ['file:audio:delete'],
            imports: ['file:audio:import'],
            exports: ['file:audio:export'],
          }"
          @addLine="addLine"
          @deleteLines="deleteLines"
        >
          <template slot="default">
            <c-button
              type="warning"
              icon="el-icon-upload2"
              class="btn"
              plain
              text="批量导入"
              @click="imports"
            />
          </template>
        </Toolbar>
        <CTable
          :permission="{
            edit: ['file:audio:edit'],
            delete: ['file:audio:delete'],
          }"
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
      width="800px"
      :has-check="dialogType !== 'detail'"
      @handleConfirm="handleConfirm"
    >
      <template slot="body">
        <CCard :title="$t('audio.audio')">
          <template slot="body">
            <CForm
              ref="form"
              :disabled="dialogType === 'detail'"
              :form-data="formData"
              :form-params="formParams"
            />
          </template>
        </CCard>

        <div style="margin-top: 10px; width: 100%"></div>

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
    </CDialog>

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
      //查询表单基础参数
      queryParams: [
        {
          type: "input",
          label: this.$t("audio.audioName"), //音频名称
          prop: "audioName",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("audio.type"), //音频分类
          prop: "type",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("audio.region"), //音频地区
          prop: "region",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("audio.audioType"), //音频类型
          prop: "audioType",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("audio.label"), //标签
          prop: "label",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("audio.singer"), //歌手名称
          prop: "singer",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("audio.lyricist"), //作词
          prop: "lyricist",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("audio.composing"), //作曲
          prop: "composing",
          span: 6,
          attributes: {},
          on: {},
        },
      ],
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
      //表列基础参数
      tableColumn: [
        {
          type: "selection",
        },
        {
          label: this.$t("system.no"), //序号
          type: "index",
        },
        {
          label: this.$t("audio.audioName"), //音频名称
          prop: "audioName",
          width: 150,
          sortable: true,
          type: "link",
          click: (row, index) => {
            this.audioPlay(row);
          },
        },
        {
          label: this.$t("audio.title"), //音频标题
          prop: "title",
          width: 150,
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
          label: this.$t("audio.url"), //url地址
          prop: "url",
          width: 150,
          sortable: true,
        },
        // {
        //   label: this.$t("audio.picture"), //音频图片
        //   prop: "picture",
        //   width: 150,
        //   sortable: true,
        // },
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
          label: this.$t("audio.remark"), //备注
          prop: "remark",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("audio.creator"), //创建人
          prop: "creator",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("audio.updater"), //更新人
          prop: "updater",
          width: 150,
          sortable: true,
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
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("audio.updateTime"), //更新时间
          prop: "updateTime",
          width: 150,
          sortable: true,
        },
        {
          type: "action",
          fixed: "right",
          width: 200,
        },
      ],
      //表格数据
      tableData: [],
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
  components: {
    UploadAudio,
    ImportUploadAudio,
  },
  created() {
    this.serviceDict();
  },
  methods: {
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
      this.dialogType = "add";
      this.resetForm();
      this.$refs.dialog.handleOpen();
    },
    //编辑
    editLine(row, index) {
      this.title = "编辑";
      this.dialogType = "edit";
      this.detail(row.id);
      this.$refs.dialog.handleOpen();
    },
    //详情
    detailLine(row, index) {
      this.title = "详情";
      this.dialogType = "detail";
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
            }
          });
        }
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
    //删除
    deleteLine(row) {
      this.$service.file.audio.delete([row]).then((res) => {
        if (res.code === 200) {
          this.$message.success("删除成功");
          this.search();
        }
      });
    },
    handleDelete() {
      this.formData.url = null;
    },
    //批量删除
    deleteLines() {
      this.$modal.confirm("是否删除").then(() => {
        this.$service.file.audio.delete(this.checkList).then((res) => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.search();
          }
        });
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
    //多选
    selection(list) {
      this.checkList = list;
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
    audioPlay(row) {
      this.$refs.audioView.handleOpen();
      this.$nextTick(() => {
        this.$refs.audioPlayer.src = JSON.parse(
          JSON.stringify(this.fileUrl + row?.url)
        );
        this.$refs.audioPlayer.load();
      });
    },
  },
  computed: {
    //新增表单基础参数
    formParams() {
      return [
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
      ];
    },
    importFormParams() {
      return [
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
          label: this.$t("audio.status"), //状态
          prop: "status",
          options: this.getDictData("audio_status"),
          span: 6,
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
        console.log(333, item);
        return { path: item.filePath, parentId: item.id };
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
