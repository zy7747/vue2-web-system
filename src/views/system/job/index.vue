<!--  -->
<template>
  <div>
    <CPage ref="pageRef" :pageOption="pageOption"> </CPage>
  </div>
</template>

<script>
export default {
  name: "Job",
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
        jobName: null,
        jobCode: null,
        startTime: null,
        executeCount: null,
        executeInterval: null,
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
      // 新增/修改/详情数据
      formData: {},
      //表格数据
      tableData: [],
    };
  },
  computed: {
    pageOption() {
      const self = this;

      return {
        formConfig: {
          title: self.$t("job.job"),
          queryParams: [
            {
              type: "input",
              label: this.$t("job.jobName"), //任务名称
              prop: "jobName",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("job.jobCode"), //任务编码
              prop: "jobCode",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("job.status"), //状态
              prop: "status",
              span: 6,
            },
          ],
        },
        tableConfig: [
          {
            title: self.$t("job.job"),
            tableColumn: [
              {
                type: "selection",
              },
              {
                label: this.$t("system.no"), //序号
                type: "index",
              },
              {
                label: this.$t("job.jobName"), //任务名称
                prop: "jobName",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("job.jobCode"), //任务编码
                prop: "jobCode",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("job.startTime"), //开始时间
                prop: "startTime",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("job.executeCount"), //执行次数
                prop: "executeCount",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("job.executeInterval"), //执行间隔
                prop: "executeInterval",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("job.status"), //状态
                prop: "status",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("job.creator"), //创建人
                prop: "creator",
                width: 150,
                sortable: true,
                translation: "user",
              },
              {
                label: this.$t("job.updater"), //更新人
                prop: "updater",
                width: 150,
                sortable: true,
                translation: "updater",
              },
              {
                label: this.$t("job.createTime"), //创建时间
                prop: "createTime",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("job.updateTime"), //更新时间
                prop: "updateTime",
                width: 150,
                sortable: true,
              },
              {
                type: "action",
                fixed: "right",
                width: 150,
              },
            ],
            tools: [
              {
                type: "add",
                permission: ["system:job:add"],
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
                permission: ["system:job:delete"],
                options: {
                  disabled: self.checkList.length === 0,
                },
                on: {
                  click() {
                    self.$service.system.job
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
                permission: ["system:job:import"],
                options: {
                  api() {
                    return self.$service.system.job.import();
                  },
                },
              },
              {
                type: "export",
                permission: ["system:job:export"],
                options: {
                  api() {
                    return self.$service.system.job.export();
                  },
                  fileName: self.$t("job.job"),
                },
              },
            ],
            actions: [
              {
                type: "edit",
                permission: ["system:job:edit"],
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
                permission: ["system:job:delete"],
                click({ row, index }) {
                  self.$service.system.job.delete([row]).then((res) => {
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
              return self.$service.system.job
                .page({ page, size, ...self.queryData })
                .then((res) => {
                  return res.data;
                });
            },
            dialogConfig: {
              "has-check": this.dialogType !== "detail",
              formData: this.formData,
              width: "1200px",
              title: this.$t("job.job"),
              handleConfirm() {
                // 新增/修改
                self.$service.system.job
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
                  label: "任务名称",
                  prop: "jobName",
                  span: 6,
                },
                {
                  type: "input",
                  label: "任务编码",
                  prop: "jobCode",
                  span: 6,
                },
                {
                  type: "datePicker",
                  label: "开始时间",
                  prop: "startTime",
                  attributes: {
                    type: "datetime",
                    format: "yyyy-MM-dd HH:mm:ss",
                    valueFormat: "yyyy-MM-dd HH:mm:ss",
                  },
                  span: 6,
                },
                {
                  type: "number",
                  label: "执行次数",
                  prop: "executeCount",
                  span: 6,
                },
                {
                  type: "number",
                  label: "执行间隔",
                  prop: "executeInterval",
                  span: 6,
                },
                {
                  type: "input",
                  label: "备注",
                  prop: "remark",
                  span: 12,
                },
                {
                  type: "select",
                  label: "状态",
                  prop: "status",
                  span: 6,
                  options: this.getDictData("job_status"),
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
      this.$service.system.job.detail({ id }).then((res) => {
        if (res.code === 200) {
          this.formData = res.data;
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    //重置新增修改表单数据
    resetForm(row = {}) {
      this.formData = {
        id: null,
        parentId: row.id ? row.id : null,
        name: null,
        code: null,
        permission: null,
        type: null,
        sort: null,
        visible: null,
        icon: null,
        description: null,
        status: "0",
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
