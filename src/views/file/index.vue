<!-- 文件夹 -->
<template>
  <div class="fileView">
    <!-- 搜索栏 -->
    <div class="header">
      {{ !nodeInfo.fileName ? "文件管理" : nodeInfo.fileName }}
    </div>
    <!-- 主视图 -->
    <div class="main">
      <!-- 树形 -->
      <div
        class="catalog"
        @click="clearId"
        @contextmenu.prevent.stop="treeOtherClick"
      >
        <c-input
          prefix-icon="el-icon-search"
          placeholder="目录搜索"
          v-model="filterText"
        />
        <el-tree
          :data="folderList"
          :props="defaultProps"
          @node-click="nodeClick"
          :filter-node-method="filterNode"
          node-key="id"
          ref="tree"
        >
          <template v-slot="{ node }">
            <span
              class="node-item"
              @contextmenu.prevent.stop="(event) => treeClick(event, node.data)"
            >
              <span class="node-icon">
                <img
                  style="width: 20px"
                  src="@/assets/images/file/folder.png"
                  alt=""
                />
              </span>
              <span>{{ node.label }}</span>
            </span>
          </template>
        </el-tree>
      </div>
      <!-- 文件窗口 -->
      <div class="window">
        <!-- 顶部操作 -->
        <div class="breadcrumbBox">
          <div style="display: flex; align-items: center">
            <el-page-header @back="goBack"> </el-page-header>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                <a
                  href="JavaScript:void(0)"
                  @click="clearId()"
                  class="breadcrumb-item"
                  >{{ "根目录" }}</a
                >
              </el-breadcrumb-item>
              <el-breadcrumb-item
                v-for="(item, index) in folderPath"
                :key="index"
              >
                <a
                  href="JavaScript:void(0)"
                  @click="folderPathChange(item)"
                  class="breadcrumb-item"
                  >{{ item }}</a
                >
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <c-input
            style="width: 300px"
            prefix-icon="el-icon-search"
            placeholder="文件搜索"
            v-model="filterFile"
          />
        </div>
        <!-- 切换栏 -->
        <el-tabs type="border-card" tab-position="top">
          <el-tab-pane label="卡片">
            <div
              class="right"
              @contextmenu.prevent.stop="(event) => rightClick(event)"
              @click="closeMenu()"
            >
              <!-- 文件 -->
              <div class="files" @dragover.prevent @drop="handleDrop">
                <ul
                  v-if="fileFilterList.length > 0"
                  class="list-box"
                  v-infinite-scroll="load"
                >
                  <li
                    class="item"
                    v-for="item in fileFilterList"
                    :key="item.id"
                    @dblclick="openFile(item)"
                    @contextmenu.prevent.stop="
                      (event) => fileClick(item, event)
                    "
                    @click="closeMenu(item)"
                  >
                    <div class="picture-box">
                      <div class="picture">
                        <el-image
                          v-if="
                            item.fileType === 'jpg' ||
                            item.fileType === 'png' ||
                            item.fileType === 'gif'
                          "
                          style="width: 100px; height: 100px"
                          :src="fileIcon(item)"
                          :preview-src-list="[fileUrl + item.filePath]"
                        >
                        </el-image>
                        <img
                          v-else
                          style="width: 100%"
                          :src="fileIcon(item)"
                          alt=""
                        />
                      </div>
                    </div>
                    <div class="fileName">
                      <span class="container" :title="item.fileName">
                        {{ item.fileName }}
                      </span>
                    </div>
                  </li>
                </ul>

                <el-empty v-else description="文件夹里空空如也"></el-empty>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="视图">
            <div class="right">
              <CTable ref="tableRef" :tableOption="tableConfig" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 新增/修改文件夹 -->
    <CDialog
      ref="createFolder"
      :title="title"
      width="500px"
      @handleConfirm="handleConfirm"
    >
      <template slot="body">
        <CForm ref="form" :form-data="formData" :form-params="formParams" />
      </template>
    </CDialog>

    <!-- 右键事件 -->
    <div>
      <ul
        v-show="visible"
        :style="{ left: left + 'px', top: top + 'px' }"
        class="contextmenu"
      >
        <li v-if="isFolder" @click="openFile(fileClickData)">
          <i class="el-icon-folder-opened"></i>
          <span> 打开</span>
        </li>
        <li v-if="!isFolder" @click="openFile(fileClickData)">
          <i class="el-icon-download"></i>
          <span> 下载</span>
        </li>
        <li @click="updateFolder(fileClickData)">
          <i class="el-icon-edit-outline"></i>
          <span> 重命名</span>
        </li>
        <li>
          <i class="el-icon-document-copy"></i>
          <span> 复制</span>
        </li>
        <li>
          <i class="el-icon-scissors"></i>
          <span> 剪切</span>
        </li>
        <li>
          <i class="el-icon-tickets"></i>
          <span> 粘贴</span>
        </li>
        <li @click="deleteFolder(fileClickData)">
          <i class="el-icon-delete"></i>
          <span> 删除</span>
        </li>
      </ul>

      <ul
        v-show="visible2"
        :style="{ left: left + 'px', top: top + 'px' }"
        class="contextmenu"
      >
        <li @click="createFolder">
          <i class="el-icon-circle-plus-outline"></i>
          <span> 新建</span>
        </li>
        <li @click="fileUpload">
          <i class="el-icon-upload2"></i>
          <span> 上传</span>
        </li>
      </ul>

      <ul
        v-show="visible3"
        :style="{ left: left + 'px', top: top + 'px' }"
        class="contextmenu"
      >
        <li @click="addFolder">
          <i class="el-icon-circle-plus-outline"></i>
          <span> 新增</span>
        </li>
        <li @click="updateFolder(folderClickData)">
          <i class="el-icon-edit-outline"></i>
          <span> 重命名</span>
        </li>
        <li @click="deleteFolder(folderClickData)">
          <i class="el-icon-delete"></i>
          <span> 删除</span>
        </li>
      </ul>

      <ul
        v-show="visible4"
        :style="{ left: left + 'px', top: top + 'px' }"
        class="contextmenu"
      >
        <li @click="addFolder">
          <i class="el-icon-circle-plus-outline"></i>
          <span> 新增</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "File",
  data() {
    return {
      title: "创建文件夹",
      filterText: "", //树形过滤关键字
      filterFile: "", //过滤文件关键字
      fileList: [], //过滤后文件列表
      folderList: [], //正常文件夹列表
      parentInfo: {}, //当前选中节点父节点信息
      nodeInfo: {}, //当前选中节点信息
      fileClickData: {}, //文件右键事件参数
      folderClickData: {}, //文件夹右键参数
      top: 0, //右键菜单位置
      left: 0, //右键菜单位置
      visible: false, //右键菜单显示隐藏
      visible2: false, //右键菜单显示隐藏
      visible3: false, //右键树形菜单显示隐藏
      visible4: false, //右键树形菜单显示隐藏
      fileUrl: process.env.VUE_APP_FILE_API, //基础文件url
      isFolder: null, //点的是文件夹还是文件
      count: 32, //默认显示文件数量
      //菜单树形显示字段
      defaultProps: {
        children: "children",
        label: "fileName",
      },
      formData: {
        fileName: null,
      },
      //新增文件夹表单数据
      formParams: [
        {
          type: "input",
          label: "文件夹名称",
          prop: "fileName",
          span: 24,
          on: {},
        },
      ],
    };
  },
  created() {
    this.query();
    document.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });
  },
  methods: {
    //查询文件夹
    query() {
      return this.$service.file.file.list().then((res) => {
        this.queryFile();
        const folderList = [];
        res.data.forEach((item) => {
          if (item.fileType === "folder") {
            folderList.push(item);
          }
        });

        this.$set(this, "folderList", this.$handleTree(folderList));
      });
    },
    //查询文件夹内容
    queryFile() {
      return this.$service.file.file
        .fileList({ id: this.nodeInfo.id })
        .then((res) => {
          const fileList = res.data;

          this.$set(this, "fileList", fileList);
        });
    },
    //搜索框过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.fileName.indexOf(value) !== -1;
    },
    //文件图标
    fileIcon(item) {
      if (item.fileType === "folder") {
        return require("@/assets/images/file/folder.png");
      } else if (
        item.fileType === "jpg" ||
        item.fileType === "png" ||
        item.fileType === "gif"
      ) {
        return this.fileUrl + item.url;
      } else if (item.fileType === "pdf") {
        return require("@/assets/images/file/pdf.png");
      } else if (item.fileType === "xls" || item.fileType === "xlsx") {
        return require("@/assets/images/file/excel.png");
      } else if (item.fileType === "docx") {
        return require("@/assets/images/file/word.png");
      } else if (item.fileType === "txt") {
        return require("@/assets/images/file/text.png");
      } else if (item.fileType === "mp3") {
        return require("@/assets/images/file/mp3.png");
      } else if (item.fileType === "mp4") {
        return require("@/assets/images/file/mp4.png");
      } else {
        return require("@/assets/images/file/file.png");
      }
    },
    //确认新增文件夹
    handleConfirm() {
      if (!this.formData.id) {
        // 新增
        this.$service.file.file
          .createFolder({
            ...this.formData,
            fileType: "folder",
            parentId: this.nodeInfo.id,
          })
          .then((res) => {
            if (res.code === 200) {
              this.$message.success("提交成功");
              this.query();
              this.$refs.createFolder.handleClose();
            } else {
              this.$message.warning(res.message);
            }
          });
      } else {
        this.updateConfirm();
      }
    },
    //确认修改文件夹
    updateConfirm() {
      const newPath = this.formData.filePath.split("/");
      let updateParam;
      if (newPath.length > 2) {
        newPath.pop();
        updateParam = {
          ...this.formData,
          filePath: newPath.join("/") + "/" + this.formData.fileName,
        };
      } else {
        updateParam = {
          ...this.formData,
          filePath: "/" + this.formData.fileName,
        };
      }

      this.$service.file.file.saveList([updateParam]).then((res) => {
        if (res.code === 200) {
          this.$message.success("提交成功");
          this.query();
          this.$refs.createFolder.handleClose();
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    //文件窗口新增文件夹弹窗
    createFolder() {
      this.title = "新建文件夹";
      this.$set(this.formData, "fileName", "");
      this.$refs.createFolder.handleOpen();
    },
    //修改文件夹名称
    updateFolder(folderClickData) {
      this.title = "修改文件夹";
      this.formData = JSON.parse(JSON.stringify(folderClickData));
      this.$refs.createFolder.handleOpen();
    },
    //树形新增文件夹
    addFolder() {
      this.title = "新建文件夹";
      this.$set(this.formData, "fileName", "");
      this.$refs.createFolder.handleOpen();
      this.nodeInfo.id = JSON.parse(JSON.stringify(this.folderClickData.id));
    },
    //点击节点
    nodeClick(data) {
      this.nodeInfo = data;
      this.queryFile();
    },
    //清除节点信息
    clearId() {
      this.nodeInfo = {
        id: null,
        parentId: null,
        fileName: null,
        url: null,
        fileType: null,
        filePath: null,
        fileSize: null,
        status: null,
        remark: null,
        creator: null,
        updater: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
        tenantId: null,
        version: null,
      };
      this.queryFile();
    },
    //打开文件或者文件夹
    openFile(item) {
      if (item.fileType === "folder") {
        this.nodeClick(item);
      } else {
        return window.open(this.fileUrl + item.filePath);
      }
    },
    //节点跳转
    folderPathChange(value) {
      let result = [];

      for (let i = 0; i < this.folderPath.length; i++) {
        if (this.folderPath[i] === value) {
          result = this.folderPath.slice(0, i + 1);
          break;
        }
      }

      this.$service.file.file
        .getFileParent({ filePath: "/" + result.join("/") })
        .then((res) => {
          this.nodeClick(res.data);
        });
    },
    //退后
    goBack() {
      if (this.nodeInfo.id === null) {
        this.clearId();
      } else {
        this.$service.file.file
          .getFileParent({ id: this.nodeInfo.id })
          .then((res) => {
            if (res.message === "根目录") {
              this.clearId();
            } else {
              this.nodeClick(res.data);
            }
          });
      }
    },
    //右键事件
    fileClick(item, event) {
      this.openMenu(event, "file");
      if (item.fileType === "folder") {
        this.isFolder = true;
      } else {
        this.isFolder = false;
      }
      this.fileClickData = item;
      event.stopPropagation();
    },
    rightClick(event) {
      this.openMenu(event, "right");
      event.stopPropagation();
    },
    treeClick(event, item) {
      this.openMenu(event, "tree");
      this.folderClickData = item;
      event.stopPropagation();
    },
    treeOtherClick(event) {
      this.openMenu(event, "otherTree");
      event.stopPropagation();
    },
    //打开窗口位置
    openMenu(e, openMenu) {
      const menuMinWidth = 105; //菜单宽度
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft + 15; // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }

      this.top = e.clientY - 100; //调整Y轴距离

      if (openMenu === "file") {
        this.visible = true;
        this.visible2 = false;
        this.visible3 = false;
        this.visible4 = false;
      } else if (openMenu === "right") {
        this.visible2 = true;
        this.visible = false;
        this.visible3 = false;
        this.visible4 = false;
      } else if (openMenu === "tree") {
        this.visible3 = true;
        this.visible2 = false;
        this.visible = false;
        this.visible4 = false;
      } else if (openMenu === "otherTree") {
        this.visible4 = true;
        this.visible3 = false;
        this.visible2 = false;
        this.visible = false;
      }
    },
    //关闭窗口
    closeMenu() {
      this.visible = false;
      this.visible2 = false;
      this.visible3 = false;
      this.visible4 = false;
    },
    //删除文件夹和文件
    deleteFolder(file) {
      this.$service.file.file.delete([file]).then((res) => {
        if (res.code === 200) {
          this.$message.success("删除成功");
          this.query();
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    //文件上传
    fileUpload() {
      this.$refs.fileUpload.handleClick();
    },
    //上传成功刷新列表
    handleUploadSuccess(res, file) {
      this.queryFile();
    },
    //拖拽上传
    handleDrop(e) {
      e.preventDefault();
      const files = e.dataTransfer.files;

      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();

        formData.append("file", files[i]);
        formData.append("filePath", this.uploadData.filePath);
        formData.append("parentId", this.uploadData.parentId);

        this.$service.file.file.upload(formData).then((res) => {
          this.queryFile();
        });
      }
    },
    //懒加载
    load() {
      this.count += 8;
    },
  },
  computed: {
    uploadData() {
      return { filePath: this.nodeInfo.filePath, parentId: this.nodeInfo.id };
    },
    tableConfig() {
      const self = this;
      return {
        tableType: "vxeTable",
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
            label: this.$t("file.fileName"), //文件名称
            prop: "fileName",
            width: 200,
            sortable: true,
          },
          {
            label: this.$t("file.url"), //url地址
            prop: "url",
            width: 250,
            sortable: true,
          },
          {
            label: this.$t("file.fileType"), //文件类型
            prop: "fileType",
            width: 110,
            sortable: true,
          },
          {
            label: this.$t("file.filePath"), //文件路径
            prop: "filePath",
            sortable: true,
            width: 250,
          },
          {
            label: this.$t("file.fileSize"), //文件大小
            prop: "fileSize",
            width: 120,
            sortable: true,
            formatter: (row, value) => {
              if (value) {
                return Number(value / 1024 / 1024).toFixed(2) + "MB";
              } else {
                return null;
              }
            },
          },
          {
            label: this.$t("file.creator"), //创建人
            prop: "creator",
            width: 120,
            sortable: true,
            translation: "user",
          },
          {
            label: this.$t("file.createTime"), //创建时间
            prop: "createTime",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("system.action"), //操作
            type: "action",
            fixed: "right",
            width: 150,
          },
        ],
        actions: [
          {
            type: "edit",
            permission: [],
            click({ row, index }) {
              self.updateFolder(row);
            },
          },
          {
            type: "remove",
            permission: [],
            click({ row, index }) {
              self.$service.file.file.delete([row]).then((res) => {
                if (res.code === 200) {
                  self.$message.success("删除成功");
                  self.$refs.tableRef.search();
                }
              });
            },
          },
        ],
        tableData: this.fileFilterList,
      };
    },
    //路径
    folderPath() {
      let folderPath = [];

      if (this.nodeInfo.filePath) {
        folderPath = this.nodeInfo.filePath.split("/");
        folderPath.shift();
      }
      return folderPath;
    },
    //文件筛选
    fileFilterList() {
      const value = this.filterFile;
      let list;

      if (value !== "") {
        list = this.fileList.filter((item) => {
          return item.fileName.indexOf(value) !== -1;
        });
      } else {
        list = this.fileList;
      }

      return list.slice(0, this.count);
    },
  },
  watch: {
    //过滤
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    //显示隐藏菜单
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
    visible2(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
    visible3(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
    visible4(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fileView {
  position: relative;
  .header {
    display: flex;
    align-items: center;
    padding-left: 15px;
    background-color: rgb(22, 131, 189);
    color: #fff;
    font-size: 14px;
    font-weight: 550;
    width: 100%;
    height: 50px;
  }

  .main {
    display: flex;
    width: 100%;
    overflow: hidden;
    padding: 15px 15px;
    height: 740px;
    background-color: #fff;

    .catalog {
      width: 15%;
      margin-right: 1%;
      height: 100%;
      .el-tree {
        overflow: auto;
        margin-top: 8px;
        border-right: 1px solid #f1f2f3;
        height: calc(100% - 5%);
      }
    }

    .window {
      width: 84%;
    }

    .breadcrumbBox {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 30px;
      width: 100%;
      margin-bottom: 5px;
      .breadcrumb-item:hover {
        cursor: pointer;
        color: #1683bd;
      }
    }

    .right {
      padding-left: 15px;

      .list-box {
        width: 100%;
        overflow: auto;
        height: 600px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        .item {
          position: relative;
          margin: 5px;
          width: 150px;
          height: 170px;
          overflow: hidden;
          margin-right: 10px;
          .picture-box {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 75%;
            overflow: hidden;
            .picture {
              width: 100px;
              height: 100px;
              overflow: hidden;
            }
          }

          .fileName {
            padding: 0 30px;
            width: 100%;
            height: 15%;
            display: flex;
            justify-content: center;

            .container {
              align-items: center;
              font-size: 12px;
              height: 100%;
              white-space: nowrap; /* 文字不换行 */
              overflow: hidden; /* 溢出隐藏 */
              text-overflow: ellipsis; /* 以省略号显示溢出部分 */
            }
          }
        }

        .item:hover {
          background-color: #e6f1ff;
          border: 1px solid #cddef5;
        }
      }
    }

    .node-item {
      width: 150px;
      font-size: 14px;
      display: flex;
      align-items: center;
      .node-icon {
        display: flex;
        align-items: center;
        margin-right: 5px;
      }
    }

    .selected {
      opacity: 0.5;
      pointer-events: none;
      background-color: #e6f1ff;
      border: 1px solid #cddef5;
      z-index: 2;
    }
  }
}

//右键弹窗菜单
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 10;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
