<!-- 菜单 menu -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse :title="'菜单'" @reset="resetQueryData" @search="search">
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
      <el-tab-pane label="菜单">
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
          is-edit-line
          is-detail-line
          is-delete-line
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          :table-data="tableData"
          :table-column="tableColumn"
          @editLine="editLine"
          @detailLine="detailLine"
          @deleteLine="deleteLine"
          @handleSelectionChange="selection"
        >
          <template slot="action" slot-scope="{ scope }">
            <c-button
              v-if="scope.row.type !== 'button'"
              class="btn"
              text="新增"
              type="text"
              icon="el-icon-plus"
              @click="addLine(scope.row, scope.$index)"
            />
          </template>

          <template slot="icon" slot-scope="{ scope }">
            <div class="mss" style="width: 120px; font-size: 30px">
              <svg-icon
                :icon-class="scope.row.icon ? scope.row.icon : ''"
                class="icon"
              />
            </div>
          </template>
        </CTable>
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
        <CCard title="菜单">
          <template slot="body">
            <CForm
              ref="form"
              :disabled="title === '详情'"
              :form-data="formData"
              :form-params="formParams"
            >
              <template slot="icon">
                <IconSelect v-model="formData.icon" />
              </template>
            </CForm>
          </template>
        </CCard>
      </template>
    </CDialog>
  </div>
</template>

<script>
import baseParams from "./mixins";

export default {
  name: "menu",
  mixins: [baseParams],
  created() {
    this.query();
  },
  methods: {
    selected(name) {
      this.formData.icon = name;
    },
    //1.查询
    query(page, size) {
      return this.$service.baseData.menu.list(this.queryData).then((res) => {
        const menu = res.data;
        menu.sort((a, b) => a.sort - b.sort);
        this.tableData = this.$handleTree(menu);
      });
    },
    //新增
    addLine(row = {}) {
      this.title = "新增";
      this.$refs.dialog.handleOpen();
      this.resetForm(row);
    },
    //编辑
    editLine(row, index) {
      this.title = "编辑";
      this.$refs.dialog.handleOpen();
      this.detail(row.id);
    },
    //提交
    handleConfirm() {
      // 新增
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          this.$service.baseData.menu.saveList([this.formData]).then((res) => {
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
      this.$service.baseData.menu.delete([row]).then((res) => {
        this.search();
      });
    },
    //通过id获取详情
    detail(id) {
      this.$service.baseData.menu.detail({ id }).then((res) => {
        const data = res.data;
        this.formData = data;
      });
    },
    //批量删除
    deleteLines() {
      this.$modal
        .confirm("是否删除")
        .then(() => {
          this.$service.baseData.menu.delete(this.checkList).then((res) => {
            this.search();
          });
        })
        .catch(() => {});
    },
    //搜索
    search() {
      this.query();
    },
    //重置搜索表单数据
    resetQueryData() {
      //重置表单
      this.$refs.queryForm.reset();
      //刷新表格
      this.query();
    },
    //重置新增修改表单数据
    resetForm(row = {}) {
      let type = "menu";

      if (row.type === "directory") {
        type = "menu";
      } else if (row.type === "menu") {
        type = "button";
      }

      this.$set(this, "formData", {
        id: null,
        parentId: row.id ? row.id : null,
        name: null,
        title: null,
        path: null,
        type: type,
        component: null,
        permission: null,
        level: null,
        sort: null,
        visible: 0,
        keepAlive: 0,
        alwaysShow: 0,
        icon: null,
        description: null,
        meta: null,
        status: "0",
        remark: null,
        creator: null,
        updater: null,
        createTime: null,
        updateTime: null,
      });
    },
    //多选
    selection(list) {
      this.checkList = list;
    },
    //导出
    exportExcel() {
      this.$service.baseData.menu.export().then((res) => {
        this.$download.excel(res, "菜单.xls");
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
