<!--  -->
<template>
  <div>
    <CPage ref="pageRef" :pageOption="pageOption">
      <template slot="dialog_form_icon">
        <IconSelect :loadIconList="['flagIcon']" v-model="formData.icon" />
      </template>

      <template slot="table_icon" slot-scope="{ row, index }">
        <svg-icon
          style="font-size: 30px"
          :icon-class="row.icon ? row.icon : ''"
          class="icon"
        />
      </template>
    </CPage>
  </div>
</template>

<script>
export default {
  name: "Area",
  data() {
    return {
      //弹框标题
      title: "",
      //弹框类型
      dialogType: "",
      //多选
      checkList: [],
      //查询数据
      queryData: {
        id: null,
        parentId: null,
        name: null,
        cname: null,
        fullName: null,
        fullCname: null,
        otherName: null,
        address: null,
        type: null,
        code: null,
        axis: null,
        acreage: null,
        population: null,
        climate: null,
        capital: null,
        sort: null,
        level: null,
        icon: null,
        description: null,
        status: null,
        remark: null,
        creator: null,
        updater: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
        tenantId: null,
        version: null,
      },
      //新增/修改/详情数据
      formData: {
        id: null,
        parentId: null,
        name: null,
        cname: null,
        fullName: null,
        fullCname: null,
        otherName: null,
        address: null,
        type: null,
        code: null,
        axis: null,
        acreage: null,
        population: null,
        climate: null,
        capital: null,
        sort: null,
        level: null,
        icon: null,
        description: null,
        status: null,
        remark: null,
        creator: null,
        updater: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
        tenantId: null,
        version: null,
      },
      //表格数据
      tableData: [],
    };
  },
  computed: {
    pageOption() {
      const self = this;

      return {
        formConfig: {
          title: self.$t("area.area"),
          queryParams: [
            {
              type: "input",
              label: this.$t("area.name"), //名称
              prop: "name",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("area.cname"), //中文名称
              prop: "cname",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("area.fullName"), //全称
              prop: "fullName",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("area.fullCname"), //中文全称
              prop: "fullCname",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("area.otherName"), //别称
              prop: "otherName",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("area.address"), //地址
              prop: "address",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("area.type"), //区域类型
              prop: "type",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("area.code"), //区域编码
              prop: "code",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("area.axis"), //坐标
              prop: "axis",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("area.acreage"), //面积
              prop: "acreage",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("area.population"), //人口
              prop: "population",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("area.climate"), //气候
              prop: "climate",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("area.capital"), //首都
              prop: "capital",
              span: 6,
            },
          ],
          queryData: this.queryData,
        },
        tableConfig: [
          {
            resizable: true,
            "row-id": "id",
            tableType: "vxeTable",
            "tree-config": {
              transform: true,
              rowField: "id",
              parentField: "parentId",
              iconOpen: "vxe-icon-square-minus-fill",
              iconClose: "vxe-icon-square-plus-fill",
            },
            title: self.$t("area.area"),
            tableColumn: [
              {
                type: "selection",
              },
              {
                label: this.$t("system.no"), //序号
                type: "index",
              },
              {
                label: this.$t("area.name"), //名称
                prop: "name",
                width: 200,
                sortable: true,
                treeNode: true,
              },
              {
                label: this.$t("area.icon"), //地区图标
                prop: "icon",
                width: 150,
                sortable: true,
                type: "custom",
                componentName: "icon",
              },
              {
                label: this.$t("area.cname"), //中文名称
                prop: "cname",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("area.fullName"), //全称
                prop: "fullName",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("area.fullCname"), //中文全称
                prop: "fullCname",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("area.otherName"), //别称
                prop: "otherName",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("area.address"), //地址
                prop: "address",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("area.type"), //区域类型
                prop: "type",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("area.code"), //区域编码
                prop: "code",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("area.axis"), //坐标
                prop: "axis",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("area.acreage"), //面积
                prop: "acreage",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("area.population"), //人口
                prop: "population",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("area.climate"), //气候
                prop: "climate",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("area.capital"), //首都
                prop: "capital",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("area.sort"), //排序
                prop: "sort",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("area.level"), //层级
                prop: "level",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("area.status"), //状态
                prop: "status",
                width: 150,
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
                permission: ["configuration:area:add"],
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
                permission: ["configuration:area:delete"],
                options: {
                  disabled: self.checkList.length === 0,
                },
                on: {
                  click() {
                    self.$service.configuration.dict
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
                permission: ["configuration:area:import"],
                options: {
                  api() {
                    return self.$service.configuration.area.import();
                  },
                },
              },
              {
                type: "export",
                permission: ["configuration:area:export"],
                options: {
                  api() {
                    return self.$service.configuration.area.export();
                  },
                  fileName: self.$t("area.area"),
                },
              },
            ],
            actions: [
              {
                type: "edit",
                permission: ["configuration:area:edit"],
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
                permission: ["configuration:area:delete"],
                click({ row, index }) {
                  self.$service.configuration.dict.delete([row]).then((res) => {
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
            tableData: this.tableData,
            query: (page, size) => {
              return this.$service.configuration.area
                .list(this.queryData)
                .then((res) => {
                  this.tableData = res.data;
                });
            },
            dialogConfig: {
              "has-check": this.dialogType !== "detail",
              formData: this.formData,
              width: "800px",
              title: this.$t("area.area"),
              handleConfirm() {
                // 新增/修改
                self.$service.configuration.area
                  .saveList([self.formData])
                  .then((res) => {
                    if (res.code === 200) {
                      self.$message.success("提交成功");
                      self.$refs.pageRef.search();
                      self.$refs.pageRef.dialogClose();
                    }
                  });
              },
              formParams: [
                {
                  type: "custom",
                  label: this.$t("area.icon"), //地区图标
                  prop: "icon",
                  componentName: "icon",
                  span: 12,
                },
                {
                  type: "input",
                  label: this.$t("area.id"), //id
                  prop: "id",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("area.parentId"), //父节点id
                  prop: "parentId",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("area.name"), //名称
                  prop: "name",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("area.cname"), //中文名称
                  prop: "cname",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("area.fullName"), //全称
                  prop: "fullName",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("area.fullCname"), //中文全称
                  prop: "fullCname",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("area.otherName"), //别称
                  prop: "otherName",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("area.address"), //地址
                  prop: "address",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("area.type"), //区域类型
                  prop: "type",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("area.code"), //区域编码
                  prop: "code",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("area.axis"), //坐标
                  prop: "axis",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("area.acreage"), //面积
                  prop: "acreage",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("area.population"), //人口
                  prop: "population",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("area.climate"), //气候
                  prop: "climate",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("area.capital"), //首都
                  prop: "capital",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("area.sort"), //排序
                  prop: "sort",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("area.level"), //层级
                  prop: "level",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("area.status"), //状态
                  prop: "status",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("area.remark"), //备注
                  prop: "remark",
                  span: 6,
                },
              ],
            },
          },
        ],
      };
    },
  },
  methods: {
    //通过id获取详情
    detail(id) {
      this.$service.configuration.area.detail({ id }).then((res) => {
        if (res.code === 200) {
          this.formData = res.data;
        }
      });
    },
    //重置新增修改表单数据
    resetForm() {
      this.formData = {
        id: null,
        parentId: null,
        name: null,
        cname: null,
        fullName: null,
        fullCname: null,
        otherName: null,
        address: null,
        type: null,
        code: null,
        axis: null,
        acreage: null,
        population: null,
        climate: null,
        capital: null,
        sort: null,
        level: null,
        icon: null,
        description: null,
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
    },
  },
};
</script>

<style lang="scss" scoped></style>
