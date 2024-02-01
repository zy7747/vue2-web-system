<!-- 字典 -->
<template>
  <div>
    <CPage ref="pageRef" :pageOption="pageOption">
      <template slot="dialog_body">
        <CCard title="字典集" v-if="dialogType !== 'add'">
          <template slot="body">
            <CTable ref="dictSubList" :tableOption="tableOption" />
          </template>
        </CCard>
      </template>
    </CPage>
  </div>
</template>

<script>
export default {
  name: "Dict",
  data() {
    return {
      //新增/修改/详情数据
      formData: {},
      //弹框标题
      title: "",
      //弹框类型
      dialogType: "",
      //多选
      checkList: [],
      //多选
      dictSubList: [],
      //字典集列表数据
      dictSubListData: [],
      //数据
      queryData: {
        id: null,
        parentId: null,
        dictName: null,
        dictCode: null,
        dictType: null,
        label: null,
        value: "",
        color: null,
        css: null,
        sort: null,
        params: null,
        status: null,
        remark: null,
        creator: null,
        updater: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
      },
    };
  },
  computed: {
    pageOption() {
      const self = this;
      return {
        formConfig: {
          title: self.$t("dict.dict"),
          queryParams: [
            {
              type: "input",
              label: this.$t("dict.dictName"), //字典名称
              prop: "dictName",
              span: 6,
              attributes: {},
              on: {},
            },
            {
              type: "input",
              label: this.$t("dict.dictCode"), //字典编码
              prop: "dictCode",
              span: 6,
              attributes: {},
              on: {},
            },
            {
              label: this.$t("dict.status"), //状态
              prop: "status",
              type: "select",
              options: this.getDictData("dict_status"),
              span: 6,
              attributes: {},
              on: {},
            },
          ],
        },
        tableConfig: [
          {
            title: self.$t("dict.dict"),
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
                label: this.$t("dict.dictName"), //字典名称
                prop: "dictName",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("dict.dictCode"), //字典编码
                prop: "dictCode",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("dict.dictType"), //字典类型
                prop: "dictType",
                translation: "dict_type",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("dict.status"), //状态
                prop: "status",
                width: 150,
                translation: "dict_status",
                sortable: true,
              },
              {
                label: this.$t("dict.creator"), //创建人
                prop: "creator",
                width: 150,
                sortable: true,
                translation: "user",
              },
              {
                label: this.$t("dict.updater"), //更新人
                prop: "updater",
                width: 150,
                sortable: true,
                translation: "user",
              },
              {
                label: this.$t("dict.createTime"), //创建时间
                prop: "createTime",
                sortable: true,
                width: 150,
              },
              {
                label: this.$t("dict.updateTime"), //更新时间
                prop: "updateTime",
                sortable: true,
                width: 150,
              },
              {
                type: "action",
                fixed: "right",
                width: 160,
              },
            ],
            tools: [
              {
                type: "add",
                permission: ["user:person:add"],
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
                permission: ["user:person:delete"],
                options: {
                  disabled: self.checkList.length === 0,
                },
                on: {
                  click() {
                    self.$modal.confirm("是否删除").then(() => {
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
                    });
                  },
                },
              },
              {
                type: "import",
                permission: ["user:person:import"],
                options: {
                  api() {},
                },
              },
              {
                type: "export",
                permission: ["user:person:export"],
                options: {
                  api() {
                    return self.$service.configuration.dict.export();
                  },
                  fileName: "个人中心",
                },
              },
            ],
            actions: [
              {
                type: "edit",
                permission: [],
                click({ row, index }) {
                  self.title = "编辑";
                  self.dialogType = "edit";
                  self.detail(row.id);
                  self.$refs.pageRef.dialogOpen();
                },
              },
              {
                type: "detail",
                permission: [],
                click({ row, index }) {
                  self.title = "详情";
                  self.dialogType = "detail";
                  self.detail(row.id);
                  self.$refs.pageRef.dialogOpen();
                },
              },
              {
                type: "remove",
                permission: [],
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
            query: (page, size) => {
              return this.$service.configuration.dict
                .page({ page, size, ...this.queryData })
                .then((res) => {
                  return res.data;
                });
            },
            dialogConfig: {
              "has-check": this.dialogType !== "detail",
              formData: this.formData,
              width: "1400px",
              title: this.title,
              //提交
              handleConfirm() {
                self.$service.configuration.dict
                  .saveList([self.formData])
                  .then((res) => {
                    if (res.code === 200) {
                      self.$message.success("提交成功");
                      self.$refs.pageRef.search();
                      self.$refs.pageRef.dialogClose();
                      //修改完字典重新获取
                      self.$store.dispatch("GetDict");
                    } else {
                      self.$message.warning(res.message);
                    }
                  });
              },
              formParams: [
                {
                  type: "input",
                  label: this.$t("dict.dictName"), //字典名称
                  prop: "dictName",
                  span: 6,
                  on: {},
                },
                {
                  type: "input",
                  label: this.$t("dict.dictCode"), //字典编码
                  prop: "dictCode",
                  span: 6,
                  on: {},
                },
                {
                  type: "select",
                  label: this.$t("dict.dictType"), //字典类型
                  prop: "dictType",
                  span: 6,
                  options: self.getDictData("dict_type"),
                  on: {},
                },
                {
                  type: "select",
                  label: this.$t("dict.status"), //状态
                  prop: "status",
                  options: self.getDictData("dict_status"),
                  span: 6,
                  on: {},
                },
              ],
            },
          },
        ],
      };
    },
    tableOption() {
      const self = this;
      return {
        title: self.$t("dict.dict"),
        isRowDrop: true,
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
            label: this.$t("system.drop to sort"), //名
            type: "sort",
            width: 100,
          },
          {
            label: this.$t("dict.label"), //名
            prop: "label",
            form: {
              type: "input",
              rules: [
                { required: true, message: "标签名不能为空", trigger: "blur" },
              ],
            },
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("dict.value"), //值
            prop: "value",
            form: {
              type: "input",
              rules: [
                { required: true, message: "值不能为空", trigger: "blur" },
              ],
            },
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("dict.color"), //自定义颜色
            prop: "color",
            form: {
              type: "select",
              options: this.getDictData("dict_color"),
            },
            translation: "dict_color",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("dict.sort"), //排序
            prop: "sort",
            form: {
              type: "number",
            },
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("dict.status"), //状态
            prop: "status",
            form: {
              type: "select",
              rules: [
                { required: true, message: "状态不能为空", trigger: "blur" },
              ],
              options: this.getDictData("dict_status"),
            },
            translation: "dict_status",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("dict.css"), //自定义CSS样式
            prop: "css",
            width: 150,
            form: {
              type: "input",
            },
            sortable: true,
          },
          {
            label: this.$t("dict.createTime"), //创建时间
            prop: "createTime",
            width: 150,
            sortable: true,
          },
          {
            type: "action",
            fixed: "right",
            width: 160,
            show: this.dialogType !== "detail" ? true : "hidden",
          },
        ],
        tools: [
          {
            type: "add",
            permission: [],
            on: {
              click() {
                self.$refs.dictSubList.createForm({ status: "0" });
              },
            },
          },
          {
            type: "remove",
            permission: [],
            options: {
              disabled: self.dictSubList.length === 0,
            },
            on: {
              click() {
                self.$service.configuration.dict
                  .delete(self.dictSubList)
                  .then((res) => {
                    if (res.code === 200) {
                      self.$message.success("删除成功");
                      self.dictListDetail(self.formData.id);
                    } else {
                      self.$message.warning(res.message);
                    }
                  });
              },
            },
          },
        ],
        actions: [
          {
            type: "actions",
            permission: {
              edit: [],
              remove: [],
            },
            action: {
              save({ row, index }) {
                //数据处理
                const data = {
                  ...row,
                  parentId: self.formData.id,
                };

                return self.$service.configuration.dict
                  .saveList([data])
                  .then((res) => {
                    if (res.code === 200) {
                      self.$message.success("提交成功");
                      self.dictListDetail(self.formData.id);
                    } else {
                      self.$message.warning(res.message);
                    }
                  });
              },
              remove({ row, index }) {
                return self.$service.configuration.dict
                  .delete([row])
                  .then((res) => {
                    if (res.code === 200) {
                      self.$message.success("删除成功");
                      self.dictListDetail(self.formData.id);
                    } else {
                      self.$message.warning(res.message);
                    }
                  });
              },
            },
          },
        ],
        options: {
          selection(list) {
            self.dictSubList = list;
          },
        },
        tableData: this.dictSubListData,
      };
    },
  },
  methods: {
    //详情
    detail(id) {
      //通过id获取详情
      this.$service.configuration.dict.detail({ id }).then((res) => {
        this.formData = res.data;
        this.dictListDetail(id);
      });
    },
    //子集详情
    dictListDetail(id) {
      //获取子集列表
      this.$service.configuration.dict
        .dictSubList({ parentId: id })
        .then((res) => {
          //获取数据
          this.dictSubListData = res.data;
          //刷新表单
          this.$refs.dictSubList.refreshForm();
        });
    },
    //重置新增修改表单数据
    resetForm() {
      this.formData = {
        id: null,
        parentId: null,
        dictName: null,
        dictCode: null,
        dictType: "string",
        label: null,
        value: "",
        color: null,
        css: null,
        sort: null,
        params: null,
        status: "0",
        remark: null,
        creator: null,
        updater: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
