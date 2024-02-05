<!-- 页面配置 page -->
<template>
  <div>
    <CPage ref="pageRef" :pageOption="pageOption"> </CPage>
  </div>
</template>
<script>
import PageConfig from "../menu/components/PageConfig.vue";

export default {
  name: "Page",
  data() {
    return {
      //弹框标题
      title: "",
      //弹框类型
      dialogType: "",
      //多选
      checkList: [],
      //表格数据
      tableData: [],
      //查询数据
      queryData: {
        id: null,
        menuId: null,
        title: null,
        api: null,
        permission: null,
        content: null,
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
        menuId: null,
        title: null,
        api: null,
        permission: null,
        content: null,
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
    };
  },
  components: {
    PageConfig,
  },
  computed: {
    pageOption() {
      const self = this;
      return {
        formConfig: {
          title: self.$t("page.page"),
          queryParams: [
            {
              type: "input",
              label: this.$t("page.menuId"), //页面id
              prop: "menuId",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("page.status"), //状态
              prop: "status",
              span: 6,
            },
          ],
          queryData: this.queryData,
        },
        tableConfig: [
          {
            title: self.$t("page.page"),
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
                label: this.$t("page.menuId"), //页面id
                prop: "menuId",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("page.title"), //标题
                prop: "title",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("page.api"), //接口
                prop: "api",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("page.permission"), //权限
                prop: "permission",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("page.status"), //状态
                prop: "status",
                width: 150,
                sortable: true,
              },
              {
                type: "action",
                fixed: "right",
                "min-width": 150,
              },
            ],
            tools: [
              {
                type: "add",
                permission: ["configuration:page:add"],
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
                permission: ["configuration:page:delete"],
                options: {
                  disabled: self.checkList.length === 0,
                },
                on: {
                  click() {
                    self.$modal.confirm("是否删除").then(() => {
                      self.$service.configuration.page
                        .delete(self.checkList)
                        .then((res) => {
                          if (res.code === 200) {
                            self.$message.success("删除成功");
                            self.$refs.pageRef.search();
                          } else {
                            self.$message.warning(res.message);
                          }
                        });
                    });
                  },
                },
              },
              {
                type: "import",
                permission: ["configuration:page:import"],
                options: {
                  api() {
                    return self.$service.configuration.page.import();
                  },
                },
              },
              {
                type: "export",
                permission: ["configuration:page:export"],
                options: {
                  api() {
                    return self.$service.configuration.page.export();
                  },
                  fileName: self.$t("page.page"),
                },
              },
            ],
            actions: [
              {
                type: "edit",
                permission: ["configuration:page:edit"],
                click({ row, index }) {
                  self.title = "编辑";
                  self.dialogType = "edit";
                  self.detail(row.id);
                  self.$refs.pageRef.dialogOpen();
                },
              },
              {
                type: "detail",
                permission: ["configuration:page:detail"],
                click({ row, index }) {
                  self.title = "详情";
                  self.dialogType = "detail";
                  self.detail(row.id);
                  self.$refs.pageRef.dialogOpen();
                },
              },
              {
                type: "remove",
                permission: ["configuration:page:delete"],
                click({ row, index }) {
                  self.$service.configuration.page.delete([row]).then((res) => {
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
              return self.$service.configuration.page
                .page({ page, size, ...self.queryData })
                .then((res) => {
                  return res.data;
                });
            },
            dialogConfig: {
              "has-check": this.dialogType !== "detail",
              formData: this.formData,
              width: "1200px",
              title: self.$t("page.page"),
              handleConfirm() {
                // 新增/修改
                self.$service.configuration.page
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
                  type: "input",
                  label: this.$t("page.id"), //id
                  prop: "id",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("page.menuId"), //页面id
                  prop: "menuId",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("page.title"), //标题
                  prop: "title",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("page.api"), //接口
                  prop: "api",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("page.permission"), //权限
                  prop: "permission",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("page.content"), //页面内容
                  prop: "content",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("page.status"), //状态
                  prop: "status",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("page.remark"), //备注
                  prop: "remark",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("page.creator"), //创建人
                  prop: "creator",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("page.updater"), //更新人
                  prop: "updater",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("page.createTime"), //创建时间
                  prop: "createTime",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("page.updateTime"), //更新时间
                  prop: "updateTime",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("page.isDeleted"), //是否删除
                  prop: "isDeleted",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("page.tenantId"), //租户id
                  prop: "tenantId",
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("page.version"), //乐观锁
                  prop: "version",
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
      this.$service.configuration.page.detail({ id }).then((res) => {
        if (res.code === 200) {
          this.formData = res.data;
        }
      });
    },
    //重置新增修改表单数据
    resetForm() {
      this.formData = {
        id: null,
        menuId: null,
        title: null,
        api: null,
        permission: null,
        content: null,
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
