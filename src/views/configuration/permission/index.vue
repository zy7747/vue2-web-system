<!--  -->
<template>
  <div>
    <CGrid :gridOption="gridOption"> </CGrid>
  </div>
</template>

<script>
export default {
  name: "Permission",
  computed: {
    gridOption() {
      const self = this;

      return {
        title: self.$t("permission.permission"),
        //查询表单基础参数
        queryParams: [
          {
            type: "input",
            label: this.$t("permission.name"), //权限名称
            prop: "name",
            span: 6,
          },
          {
            type: "input",
            label: this.$t("permission.permission"), //权限
            prop: "permission",
            span: 6,
          },
          {
            type: "select",
            label: this.$t("permission.type"), //类型
            prop: "type",
            options: this.getDictData("permission_type"),
            span: 6,
          },
          {
            type: "select",
            label: this.$t("permission.status"), //状态
            prop: "status",
            options: this.getDictData("permission_status"),
            span: 6,
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
            label: this.$t("permission.name"), //权限名称
            prop: "name",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("permission.permission"), //权限标识
            prop: "permission",
            sortable: true,
            width: 250,
          },
          {
            label: this.$t("permission.type"), //类型
            prop: "type",
            translation: "permission_type",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("permission.status"), //状态
            prop: "status",
            translation: "permission_status",
            width: 100,
            sortable: true,
          },
          {
            label: this.$t("permission.creator"), //创建人
            prop: "creator",
            width: 150,
            sortable: true,
            translation: "user",
          },
          {
            label: this.$t("permission.updater"), //更新人
            prop: "updater",
            width: 150,
            sortable: true,
            translation: "user",
          },
          {
            label: this.$t("permission.createTime"), //创建时间
            prop: "createTime",
            sortable: true,
            width: 200,
          },
          {
            label: this.$t("permission.updateTime"), //更新时间
            prop: "updateTime",
            sortable: true,
            width: 200,
          },
          {
            label: this.$t("system.action"), //操作
            type: "action",
            fixed: "right",
            width: 200,
          },
        ],
        formParams: [
          {
            type: "input",
            label: this.$t("permission.name"), //权限名称
            prop: "name",
            span: 12,
          },
          {
            type: "input",
            label: this.$t("permission.permission"), //权限标识
            prop: "permission",
            span: 12,
          },
          {
            type: "select",
            label: this.$t("permission.type"), //类型
            options: this.getDictData("permission_type"),
            prop: "type",
            span: 12,
          },
          {
            type: "select",
            label: this.$t("permission.status"), //状态
            options: this.getDictData("permission_status"),
            prop: "status",
            span: 12,
          },
        ],
        api: "configuration.permission",
        permission: "configuration:permission",
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
