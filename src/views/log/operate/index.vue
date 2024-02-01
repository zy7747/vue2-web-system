<!-- 操作日志 operationLog -->
<template>
  <div>
    <CGrid :gridOption="gridOption"> </CGrid>
  </div>
</template>

<script>
export default {
  name: "OperationLog",
  computed: {
    gridOption() {
      const self = this;

      return {
        title: self.$t("operationLog.operationLog"),
        //查询表单基础参数
        queryParams: [
          {
            type: "input",
            label: this.$t("operationLog.title"), //标题
            prop: "title",
            span: 6,
            attributes: {},
            on: {},
          },
          {
            type: "input",
            label: this.$t("operationLog.type"), //操作类型
            prop: "type",
            span: 6,
            attributes: {},
            on: {},
          },
          {
            type: "select",
            label: this.$t("operationLog.status"), //状态
            options: this.getDictData("operationLog_status"),
            prop: "status",
            span: 6,
            attributes: {},
            on: {},
          },
          {
            type: "input",
            label: this.$t("operationLog.creator"), //创建人
            prop: "creator",
            span: 6,
            attributes: {},
            on: {},
          },
          {
            type: "input",
            label: this.$t("operationLog.createTime"), //创建时间
            prop: "createTime",
            span: 6,
            attributes: {},
            on: {},
          },
        ],
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
            label: this.$t("operationLog.title"), //标题
            prop: "title",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("operationLog.module"), //操作模块
            prop: "module",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("operationLog.content"), //操作内容
            prop: "content",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("operationLog.type"), //操作类型
            prop: "type",
            width: 150,
            sortable: true,
            translation: "operate_type",
          },
          {
            label: this.$t("operationLog.status"), //状态
            prop: "status",
            width: 150,
            sortable: true,
            translation: "operationLog_status",
          },
          {
            label: this.$t("operationLog.operateIp"), //操作IP
            prop: "operateIp",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("operationLog.operatePlace"), //操作地
            prop: "operatePlace",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("operationLog.time"), //耗时
            prop: "time",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("operationLog.errorMsg"), //错误信息
            prop: "errorMsg",
            width: 150,
            sortable: true,
          },

          {
            label: this.$t("operationLog.creator"), //创建人
            prop: "creator",
            width: 150,
            sortable: true,
            translation: "user",
          },
          {
            label: this.$t("operationLog.createTime"), //创建时间
            prop: "createTime",
            width: 150,
            sortable: true,
          },
        ],
        formParams: [
          {
            type: "input",
            label: this.$t("operationLog.id"), //id
            prop: "id",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("operationLog.title"), //标题
            prop: "title",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("operationLog.module"), //操作模块
            prop: "module",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("operationLog.content"), //操作内容
            prop: "content",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("operationLog.type"), //操作类型
            prop: "type",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("operationLog.operateIp"), //操作IP
            prop: "operateIp",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("operationLog.operatePlace"), //操作地
            prop: "operatePlace",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("operationLog.time"), //耗时
            prop: "time",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("operationLog.errorMsg"), //错误信息
            prop: "errorMsg",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("operationLog.status"), //状态
            prop: "status",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("operationLog.remark"), //备注
            prop: "remark",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("operationLog.creator"), //创建人
            prop: "creator",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("operationLog.updater"), //更新人
            prop: "updater",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("operationLog.createTime"), //创建时间
            prop: "createTime",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("operationLog.updateTime"), //更新时间
            prop: "updateTime",
            span: 6,
            on: {},
          },
        ],
        api: "log.operationLog",
        permission: "log:operationLog",
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
