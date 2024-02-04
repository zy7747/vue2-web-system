<!--  -->
<template>
  <div>
    <CPage ref="pageRef" :pageOption="pageOption"> </CPage>
  </div>
</template>

<script>
export default {
  name: "Notice",
  data() {
    return {
      // 弹框标题
      title: "",
      //弹框类型
      dialogType: "",
      // 多选
      checkList: [],
      // 查询数据
      queryData: {
        id: null,
        noticeName: null,
        noticeContent: null,
        pushModule: null,
        type: null,
        isRead: null,
        status: null,
        remark: null,
        receiver: [],
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
        noticeName: null,
        noticeContent: null,
        pushModule: null,
        type: null,
        isRead: null,
        status: null,
        remark: null,
        receiverList: [],
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
          title: self.$t("notice.notice"),
          queryParams: [
            {
              type: "input",
              label: this.$t("notice.noticeName"), //消息名称
              prop: "noticeName",
              span: 6,
            },
            {
              type: "select",
              label: this.$t("notice.type"), //类型
              prop: "type",
              options: this.getDictData("notice_type"),
              span: 6,
            },
            {
              type: "select",
              label: this.$t("notice.isRead"), //是否已读
              prop: "isRead",
              options: this.getDictData("isRead"),
              span: 6,
            },
            {
              type: "select",
              label: this.$t("notice.receiver"), //接收人
              prop: "receiver",
              span: 6,
              options: this.getDictData("user"),
            },
          ],
        },
        tableConfig: [
          {
            title: self.$t("notice.notice"),
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
                label: this.$t("notice.noticeName"), //消息名称
                prop: "noticeName",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("notice.noticeContent"), //消息内容
                prop: "noticeContent",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("notice.pushModule"), //推送模块
                prop: "pushModule",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("notice.type"), //类型
                prop: "type",
                width: 150,
                sortable: true,
                translation: "notice_type",
              },
              {
                label: this.$t("notice.isRead"), //是否已读
                prop: "isRead",
                width: 150,
                sortable: true,
                translation: "isRead",
              },
              // {
              //   label: this.$t("notice.status"), //状态
              //   prop: "status",
              //   width: 150,
              //   sortable: true,
              //   translation: "notice_status",
              // },
              {
                label: this.$t("notice.receiver"), //接收人
                prop: "receiver",
                width: 150,
                translation: "user",
                sortable: true,
              },
              {
                label: this.$t("notice.creator"), //创建人
                prop: "creator",
                width: 150,
                sortable: true,
                translation: "user",
              },
              {
                label: this.$t("notice.createTime"), //创建时间
                prop: "createTime",
                sortable: true,
              },
              {
                label: this.$t("system.action"), //操作
                type: "action",
                fixed: "right",
                width: 160,
              },
            ],
            tools: [
              {
                type: "add",
                permission: ["functional:notice:add"],
                on: {
                  click() {
                    self.title = "新增";
                    self.dialogType = "add";
                    self.$refs.pageRef.dialogOpen();
                  },
                },
              },
              {
                type: "remove",
                permission: ["functional:notice:delete"],
                options: {
                  disabled: self.checkList.length === 0,
                },
                on: {
                  click() {
                    self.$modal.confirm("是否删除").then(() => {
                      self.$service.functional.notice
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
                permission: ["functional:notice:import"],
                options: {
                  api() {
                    return self.$service.functional.notice.import();
                  },
                },
              },
              {
                type: "export",
                permission: ["functional:notice:export"],
                options: {
                  api() {
                    return self.$service.functional.notice.export();
                  },
                  fileName: self.$t("notice.notice"),
                },
              },
            ],
            actions: [
              {
                type: "edit",
                permission: ["functional:notice:edit"],
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
                permission: ["functional:notice:delete"],
                click({ row, index }) {
                  self.$service.functional.notice.delete([row]).then((res) => {
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
              return self.$service.functional.notice
                .page({ page, size, ...self.queryData })
                .then((res) => {
                  return res.data;
                });
            },
            dialogConfig: {
              "has-check": this.dialogType !== "detail",
              formData: this.formData,
              width: "1200px",
              title: this.$t("notice.notice"),
              handleConfirm() {
                // 新增/修改
                self.$service.functional.notice
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
                  label: this.$t("notice.noticeName"), //消息名称
                  prop: "noticeName",
                  span: 6,
                  on: {},
                },
                {
                  type: "input",
                  label: this.$t("notice.pushModule"), //推送模块
                  prop: "pushModule",
                  span: 6,
                  on: {},
                },
                {
                  type: "select",
                  label: this.$t("notice.type"), //类型
                  prop: "type",
                  options: this.getDictData("notice_type"),
                  span: 6,
                  on: {},
                },
                {
                  type: "select",
                  label: this.$t("notice.isRead"), //是否已读
                  prop: "isRead",
                  options: this.getDictData("isRead"),
                  span: 6,
                  on: {},
                },
                {
                  type: "selectTree",
                  label: this.$t("notice.receiver"), //接收人
                  prop: "receiverList",
                  options: [
                    {
                      label: "全部",
                      value: "1",
                      id: "1",
                      children: this.getDictData("user"),
                    },
                  ],
                  attributes: {
                    multiple: true,
                  },
                  span: 24,
                  on: {},
                },
                {
                  type: "input",
                  label: this.$t("notice.noticeContent"), //消息内容
                  prop: "noticeContent",
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
  },
  methods: {
    // 通过id获取详情
    detail(id) {
      this.$service.functional.notice.detail({ id }).then((res) => {
        if (res.code === 200) {
          this.formData = { ...res.data, receiverList: [res.data.receiver] };
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    //重置新增修改表单数据
    resetForm(row = {}) {
      this.formData = {
        id: null,
        noticeName: null,
        noticeContent: null,
        pushModule: null,
        type: null,
        isRead: null,
        status: null,
        remark: null,
        receiverList: [],
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
