<!-- 操作日志 operationLog -->
<template>
  <div>
    <CGrid :gridOption="gridOption"> </CGrid>
  </div>
</template>

<script>
import {
  IdCardValidate,
  phoneNumValidate,
  EmailValidate,
} from "@/utils/formValidate";

export default {
  name: "Person",
  computed: {
    gridOption() {
      const self = this;

      return {
        title: self.$t("person.person"),
        //查询表单基础参数
        queryParams: [
          {
            type: "input",
            label: this.$t("person.name"), //姓名
            prop: "name",
            span: 6,
          },
          {
            type: "select",
            label: this.$t("person.sex"), //性别
            prop: "sex",
            options: this.getDictData("user_sex"),
            span: 6,
          },
          {
            type: "input",
            label: this.$t("person.profession"), //职业
            prop: "profession",
            span: 6,
          },
          {
            type: "input",
            label: this.$t("person.nation"), //国家
            prop: "nation",
            span: 6,
          },
          {
            type: "input",
            label: this.$t("person.origin"), //籍贯
            prop: "origin",
            span: 6,
          },
          {
            type: "input",
            label: this.$t("person.address"), //住址
            prop: "address",
            span: 6,
          },
          {
            type: "input",
            label: this.$t("person.degree"), //最高学历
            prop: "degree",
            span: 6,
          },
          {
            type: "input",
            label: this.$t("person.height"), //身高
            prop: "height",
            span: 6,
          },
          {
            type: "input",
            label: this.$t("person.weight"), //体重
            prop: "weight",
            span: 6,
          },
          {
            type: "input",
            label: this.$t("person.age"), //年龄
            prop: "age",
            span: 6,
          },
          {
            type: "input",
            label: this.$t("person.idCard"), //身份证号码
            prop: "idCard",
            span: 6,
          },
          {
            type: "input",
            label: this.$t("person.phone"), //电话号码
            prop: "phone",
            span: 6,
          },
          {
            type: "input",
            label: this.$t("person.email"), //电子邮箱
            prop: "email",
            span: 6,
          },
          {
            type: "datePicker",
            label: this.$t("person.birthDate"), //出生日期
            prop: "birthDate",
            span: 6,
          },
          {
            type: "select",
            label: this.$t("person.status"), //状态
            prop: "status",
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
            label: this.$t("person.userId"), //用户id
            prop: "userId",
            width: 150,
            sortable: true,
            translation: "user",
          },
          {
            label: this.$t("person.photo"), //照片
            prop: "photo",
            width: 150,
            sortable: true,
            type: "picture",
          },
          {
            label: this.$t("person.name"), //姓名
            prop: "name",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("person.sex"), //性别
            prop: "sex",
            translation: "user_sex",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("person.profession"), //职业
            prop: "profession",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("person.nation"), //国家
            prop: "nation",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("person.origin"), //籍贯
            prop: "origin",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("person.address"), //住址
            prop: "address",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("person.degree"), //最高学历
            prop: "degree",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("person.height"), //身高
            prop: "height",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("person.weight"), //体重
            prop: "weight",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("person.hobby"), //爱好
            prop: "hobby",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("person.age"), //年龄
            prop: "age",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("person.idCard"), //身份证号码
            prop: "idCard",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("person.phone"), //电话号码
            prop: "phone",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("person.email"), //电子邮箱
            prop: "email",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("person.birthDate"), //出生日期
            prop: "birthDate",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("person.status"), //状态
            prop: "status",
            width: 150,
            sortable: true,
            translation: "person_status",
          },
          {
            label: this.$t("person.remark"), //备注
            prop: "remark",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("person.creator"), //创建人
            prop: "creator",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("person.updater"), //更新人
            prop: "updater",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("person.createTime"), //创建时间
            prop: "createTime",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("person.updateTime"), //更新时间
            prop: "updateTime",
            width: 150,
            sortable: true,
          },
          {
            label: this.$t("system.action"), //操作
            type: "action",
            fixed: "right",
            width: 160,
          },
        ],
        formParams: [
          {
            type: "avatarUpload",
            label: this.$t("person.photo"), //照片
            prop: "photo",
            span: 6,
            attributes: {
              uploadData: {
                parentId: "1708477176327725057",
              },
            },
          },
          {
            type: "select",
            label: this.$t("person.userId"), //用户id
            prop: "userId",
            options: this.getDictData("user"),
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("person.name"), //姓名
            prop: "name",
            span: 6,
            on: {},
          },
          {
            type: "select",
            label: this.$t("person.sex"), //性别
            prop: "sex",
            options: this.getDictData("user_sex"),
            span: 6,
            on: {},
          },
          {
            type: "number",
            label: this.$t("person.age"), //年龄
            prop: "age",
            span: 6,
            on: {},
          },
          {
            type: "number",
            label: this.$t("person.height") + "(cm)", //身高
            prop: "height",
            span: 6,
            on: {},
          },
          {
            type: "number",
            label: this.$t("person.weight") + "(kg)", //体重
            prop: "weight",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("person.profession"), //职业
            prop: "profession",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("person.degree"), //最高学历
            prop: "degree",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("person.phone"), //电话号码
            rules: [{ validator: phoneNumValidate, trigger: "blur" }],
            prop: "phone",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("person.email"), //电子邮箱
            prop: "email",
            rules: [{ validator: EmailValidate, trigger: "blur" }],
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("person.idCard"), //身份证号码
            prop: "idCard",
            rules: [{ validator: IdCardValidate, trigger: "blur" }],
            span: 6,
            on: {},
          },
          {
            type: "datePicker",
            label: this.$t("person.birthDate"), //出生日期
            prop: "birthDate",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("person.nation"), //国家
            prop: "nation",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("person.origin"), //籍贯
            prop: "origin",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("person.address"), //住址
            prop: "address",
            span: 6,
            on: {},
          },
          {
            type: "select",
            label: this.$t("person.status"), //状态
            prop: "status",
            options: this.getDictData("person_status"),
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("person.hobby"), //爱好
            prop: "hobby",
            span: 6,
            on: {},
          },
          {
            type: "input",
            label: this.$t("person.remark"), //备注
            prop: "remark",
            span: 6,
            on: {},
          },
        ],
        api: "user.person",
        permission: "user:person",
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
