<!-- 表单 -->
<template>
  <div class="CForm">
    <el-form
      ref="CForm"
      v-bind="$attrs"
      :model="formData"
      :rules="rules"
      :label-position="labelPosition"
      :validate-on-rule-change="false"
    >
      <template v-for="item in formParams">
        <el-col
          :key="item.prop"
          :span="item.span"
          v-show="item.show !== 'hidden'"
        >
          <el-form-item :label="item.label" :prop="item.prop">
            <!-- 下拉 -->
            <c-select
              v-if="item.type === 'select'"
              v-bind="item.attributes"
              v-model="formData[item.prop]"
              :options="item.options"
              v-on="item.on"
            />
            <!-- 树形下拉 -->
            <div class="treeSelect" v-if="item.type === 'selectTree'">
              <c-treeSelect
                v-bind="item.attributes"
                v-model="formData[item.prop]"
                :options="item.options"
                v-on="item.on"
              />
            </div>

            <!-- 输入框 -->
            <c-input
              v-if="item.type === 'input'"
              v-bind="item.attributes"
              v-model="formData[item.prop]"
              v-on="item.on"
            />
            <!-- 单选 -->
            <c-radio
              v-if="item.type === 'radio'"
              v-bind="item.attributes"
              v-model="formData[item.prop]"
              :options="item.options"
              v-on="item.on"
            />
            <!-- 多选 -->
            <c-checkbox
              v-if="item.type === 'checkbox'"
              v-bind="item.attributes"
              v-model="formData[item.prop]"
              :options="item.options"
              v-on="item.on"
            />
            <!-- Switch 开关 -->
            <c-switch
              v-if="item.type === 'switch'"
              v-model="formData[item.prop]"
              v-bind="item.attributes"
              v-on="item.on"
            />
            <!-- 颜色选择器 -->
            <div class="colorPicker" v-if="item.type === 'colorPicker'">
              <c-colorPicker
                v-model="formData[item.prop]"
                v-bind="item.attributes"
                v-on="item.on"
              />
            </div>

            <!-- 数字 -->
            <c-number
              v-if="item.type === 'number'"
              v-bind="item.attributes"
              v-model="formData[item.prop]"
              v-on="item.on"
            />
            <!-- 日期 -->
            <c-datePicker
              v-if="item.type === 'datePicker'"
              v-bind="item.attributes"
              v-model="formData[item.prop]"
              v-on="item.on"
            />
            <!-- 时间 -->
            <c-timePicker
              v-if="item.type === 'timePicker'"
              v-bind="item.attributes"
              v-model="formData[item.prop]"
              v-on="item.on"
            />
            <!-- 日期范围 -->
            <c-dateTimePicker
              v-if="item.type === 'dateTimePicker'"
              v-bind="item.attributes"
              v-model="formData[item.prop]"
              v-on="item.on"
            />
            <!-- 图片上传 -->
            <AvatarUpload
              v-if="item.type === 'avatarUpload'"
              v-bind="item.attributes"
              v-model="formData[item.prop]"
              v-on="item.on"
            ></AvatarUpload>
            <!-- 自定义组件 -->
            <template v-if="item.type === 'custom'">
              <slot :name="item.componentName" />
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-form>
  </div>
</template>

<script>
import baseParams from "./mixins/index";

export default {
  name: "CForm",
  mixins: [baseParams],
  methods: {
    // 重置表单方法
    reset() {
      this.$refs["CForm"].resetFields();
      this.$emit("reset");
    },
    // 校验方法
    validate() {
      return this.$refs["CForm"]
        .validate()
        .then((valid) => {
          return true;
        })
        .catch(() => {
          this.$message.error("校验不通过");
          return false;
        });
    },
    clearValidate() {
      console.log(this.$refs["CForm"]);
      return this.$refs["CForm"].clearValidate();
    },
  },
};
</script>

<style lang="scss" scoped>
.CForm {
  width: 100%;
}
.el-col {
  padding: 0 15px;
  overflow: hidden;
}

::v-deep .el-form-item__label {
  padding: 0;
  font-weight: 550;
  // line-height: 20px;
}
</style>
