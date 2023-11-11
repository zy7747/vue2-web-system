<!-- 文件夹 -->
<template>
  <div class="fileView">
    <!-- 搜索栏 -->
    <div class="header">文件</div>
    <div class="main">
      <!-- 工具栏 -->
      <div class="toolbar">
        <div class="leftButton">
          <c-button
            size="small"
            text="创建文件夹"
            @click="createFolder"
          ></c-button>
        </div>
        <!-- 文件名 -->
        <div class="title">{{ fileName }}</div>
        <div class="action">
          <FileUpload
            ref="fileUpload"
            :isShowTip="false"
            :isFileList="false"
            :uploadData="uploadData"
            @handleUploadSuccess="handleUploadSuccess"
          ></FileUpload>
        </div>
      </div>
      <!-- 主视图 -->
      <div class="view">
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
                @contextmenu.prevent.stop="
                  (event) => treeClick(event, node.data)
                "
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
        <div
          class="right"
          @contextmenu.prevent.stop="(event) => rightClick(event)"
          @click="closeMenu()"
        >
          <div class="breadcrumb">
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
              prefix-icon="el-icon-search"
              placeholder="文件搜索"
              v-model="filterFile"
            />
          </div>
          <!-- 文件 -->
          <div class="files" @dragover.prevent @drop="handleDrop">
            <draggable
              v-if="fileFilterList.length > 0"
              v-model="fileList"
              group="people"
              @start="start"
              @end="end"
              animation="10"
            >
              <!-- <transition-group>
              </transition-group> -->
              <ul class="list-box" v-infinite-scroll="load">
                <li
                  class="item"
                  v-for="item in fileFilterList"
                  :key="item.id"
                  @dblclick="openFile(item)"
                  @contextmenu.prevent.stop="(event) => fileClick(item, event)"
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
                        :preview-src-list="[baseUrl + item.filePath]"
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
            </draggable>

            <el-empty v-else description="文件夹里空空如也"></el-empty>
          </div>
        </div>
      </div>
    </div>

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

    <CDialog
      ref="updateFolder"
      title="修改文件夹"
      width="500px"
      @handleConfirm="updateConfirm"
    >
      <template slot="body">
        <CForm ref="form" :form-data="updateParams" :form-params="formParams" />
      </template>
    </CDialog>

    <!-- 右键事件 -->
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li v-if="isFolder" @click="openFile(fileClickData)">
        <i class="el-icon-folder-opened"></i> 打开
      </li>
      <li v-if="!isFolder" @click="openFile(fileClickData)">
        <i class="el-icon-download"></i> 下载
      </li>
      <li @click="updateFolder(fileClickData)">
        <i class="el-icon-edit-outline"></i> 重命名
      </li>
      <li><i class="el-icon-document-copy"></i> 复制</li>
      <li><i class="el-icon-scissors"></i> 剪切</li>
      <li><i class="el-icon-tickets"></i> 粘贴</li>
      <li @click="deleteFolder(fileClickData)">
        <i class="el-icon-delete"></i> 删除
      </li>
    </ul>

    <ul
      v-show="visible2"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="createFolder">
        <i class="el-icon-circle-plus-outline"></i> 新建
      </li>
      <li @click="fileUpload"><i class="el-icon-upload2"></i> 上传</li>
    </ul>

    <ul
      v-show="visible3"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="addFolder">
        <i class="el-icon-circle-plus-outline"></i> 新增
      </li>
      <li @click="updateFolder(folderClickData)">
        <i class="el-icon-edit-outline"></i> 重命名
      </li>
      <li @click="deleteFolder(folderClickData)">
        <i class="el-icon-delete"></i> 删除
      </li>
    </ul>

    <ul
      v-show="visible4"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="addFolder">
        <i class="el-icon-circle-plus-outline"></i> 新增
      </li>
    </ul>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: { draggable },
  data() {
    return {
      title: "创建文件夹",
      filterText: "", //过滤字段
      filterFile: "", //过滤文件列表
      fileList: [], //文件列表
      folderList: [], //文件夹列表
      //菜单树形显示字段
      defaultProps: {
        children: "children",
        label: "fileName",
      },
      id: null, //当前选中节点id
      path: null, //当前选中节点路径
      fileName: "", //当前选中节点名称
      formData: {
        fileName: null,
      }, //新增文件夹数据
      updateParams: {}, //修改文件夹数据
      formParams: [
        {
          type: "input",
          label: "文件夹名称",
          prop: "fileName",
          span: 24,
          on: {},
        },
      ],
      parentInfo: {}, //父节点信息
      top: 0, //右键菜单位置
      left: 0, //右键菜单位置
      visible: false, //右键菜单显示隐藏
      visible2: false, //右键菜单显示隐藏
      visible3: false, //右键树形菜单显示隐藏
      visible4: false, //右键树形菜单显示隐藏
      folderClickData: {}, //文件夹右键参数
      fileClickData: {}, //文件右键事件参数
      baseUrl: process.env.VUE_APP_BASE_API, //基础url
      isFolder: null, //点的是文件夹还是文件
      count: 32,
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
      return this.$service.file.file.fileList({ id: this.id }).then((res) => {
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
        return this.baseUrl + item.url;
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
      // 新增
      this.$service.file.file
        .createFolder({
          ...this.formData,
          fileType: "folder",
          parentId: this.id,
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
    },
    //确认修改文件夹
    updateConfirm() {
      const newPath = this.updateParams.filePath.split("/");
      let updateParam;
      if (newPath.length > 2) {
        newPath.pop();
        updateParam = {
          ...this.updateParams,
          filePath: newPath.join("/") + "/" + this.updateParams.fileName,
        };
      } else {
        updateParam = {
          ...this.updateParams,
          filePath: "/" + this.updateParams.fileName,
        };
      }

      this.$service.file.file.saveList([updateParam]).then((res) => {
        if (res.code === 200) {
          this.$message.success("提交成功");
          this.query();
          this.$refs.updateFolder.handleClose();
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    //新增文件夹弹窗
    createFolder() {
      this.$set(this.formData, "fileName", "");
      this.$refs.createFolder.handleOpen();
    },
    //新增文件夹
    addFolder() {
      this.$set(this.formData, "fileName", "");
      this.$refs.createFolder.handleOpen();
      this.id = this.folderClickData.id;
    },
    //点击节点
    nodeClick(data) {
      this.id = data.id;
      this.path = data.filePath;
      this.fileName = data.fileName;
      this.queryFile();
    },
    //清除节点信息
    clearId() {
      this.id = null;
      this.path = null;
      this.fileName = "";
      this.queryFile();
    },
    //打开文件或者文件夹
    openFile(item) {
      if (item.fileType === "folder") {
        this.nodeClick(item);
      } else {
        return window.open(this.baseUrl + item.filePath);
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
      if (this.id === null) {
        this.clearId();
      } else {
        this.$service.file.file.getFileParent({ id: this.id }).then((res) => {
          if (res.message === "根目录") {
            this.clearId();
          } else {
            this.nodeClick(res.data);
          }
        });
      }
    },
    // 开始拖拽
    start(event) {
      console.log(event, this.fileList);
    },
    // 结束拖拽
    end(event) {
      // event.item  拖拽的本身
      // event.to      拖拽的目标列表
      // event.from    拖拽之前的列表
      // event.oldIndex    拖拽前的位置
      // event.newIndex    拖拽后的位置
      console.log(event, this.fileList);
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
    //修改文件夹名称
    updateFolder(folderClickData) {
      this.updateParams = JSON.parse(JSON.stringify(folderClickData));
      this.$refs.updateFolder.handleOpen();
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
        formData.append("path", this.uploadData.path);
        formData.append("parentId", this.uploadData.parentId);

        this.$service.file.file.upload(formData).then((res) => {
          this.queryFile();
        });
      }
    },
    load() {
      this.count += 8;
    },
  },
  computed: {
    uploadData() {
      return { path: this.path, parentId: this.id };
    },
    //路径
    folderPath() {
      let folderPath = [];
      if (this.path) {
        folderPath = this.path.split("/");
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
  width: 100%;
  overflow: hidden;
  padding: 15px 15px;
  background-color: #fff;
  .view {
    display: flex;
    width: 100%;
    height: 660px;
  }

  .toolbar {
    display: flex;
    overflow: hidden;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    margin-bottom: 5px;
    .leftButton {
      display: flex;
      align-items: center;
      width: 300px;
      height: 100%;
    }

    .title {
      width: 200px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #3b4255;
    }

    .action {
      width: 300px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }

  .catalog {
    width: 15%;
    .el-tree {
      overflow: auto;
      margin-top: 8px;
      border-right: 1px solid #f1f2f3;
      height: calc(100% - 5%);
    }
  }

  .right {
    padding-left: 15px;
    width: 85%;
    .breadcrumb {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 30px;
      width: 100%;

      .breadcrumb-item:hover {
        cursor: pointer;
        color: #1683bd;
      }
    }

    .list-box {
      width: 100%;
      overflow: auto;
      height: 650px;
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

.fileView {
  position: relative;
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
