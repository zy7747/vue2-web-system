<!--  -->
<template>
  <div class="STable">
    <!-- 表格 -->
    <el-form ref="tableForm" :model="formData" :rules="rules">
      <el-table
        stripe
        border
        ref="eTable"
        v-bind="$attrs"
        :max-height="maxHeight"
        :min-height="maxHeight"
        :data="tableData"
        :style="`width:${width}`"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        @selection-change="handleSelectionChange"
      >
        <template v-for="(item, index) in tableColumn">
          <!-- 序号/多选 -->
          <el-table-column
            v-if="item.type === 'index' || item.type === 'selection'"
            v-bind="{
              ...item,
              align: item.align ? item.align : 'center',
            }"
            :key="index"
            fixed="left"
          />

          <!-- 需要用到插槽的表单 -->
          <el-table-column
            v-else-if="item.show !== 'hidden'"
            v-bind="{
              ...item,
              align: item.align ? item.align : 'center',
            }"
            :key="index"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <!-- 标签 -->
              <template
                v-if="item.type === 'tag' && scope.row[item.prop] !== ''"
              >
                <el-tag :type="item.options[scope.row[item.prop]]">
                  {{ scope.row[item.prop] }}
                </el-tag>
              </template>

              <!-- 图片框 -->
              <template v-else-if="item.type === 'picture'">
                <el-image
                  style="
                    width: 50px;
                    height: 50px;
                    border-radius: 5px;
                    overflow: hidden;
                  "
                  :src="baseUrl + scope.row[item.prop]"
                  :preview-src-list="[baseUrl + scope.row[item.prop]]"
                  fit="cover"
                ></el-image>
              </template>

              <!-- 链接 -->
              <template v-else-if="item.type === 'link'">
                <a
                  class="link"
                  v-bind="item.form"
                  href="JavaScript:void(0)"
                  v-on="item.on"
                  @click="
                    item.click
                      ? item.click(scope.row, scope.$index, item)
                      : selectFn()
                  "
                  >{{ scope.row[item.prop] }}
                </a>
              </template>

              <!-- 输入框 -->
              <template
                v-else-if="item.type === 'input' && isForm(scope.$index)"
              >
                <el-form-item :prop="item.prop">
                  <c-input
                    v-bind="item.form"
                    v-model="scope.row[item.prop]"
                    v-on="item.on"
                  />
                </el-form-item>
              </template>

              <!-- 数字 -->
              <template
                v-else-if="item.type === 'number' && isForm(scope.$index)"
              >
                <el-form-item :prop="item.prop">
                  <c-number
                    v-bind="item.form"
                    v-model="scope.row[item.prop]"
                    v-on="item.on"
                  />
                </el-form-item>
              </template>

              <!-- 下拉框 -->
              <template
                v-else-if="item.type === 'select' && isForm(scope.$index)"
              >
                <el-form-item :prop="item.prop">
                  <c-select
                    v-bind="item.form"
                    v-model="scope.row[item.prop]"
                    :options="item.options"
                    v-on="item.on"
                    @focus="
                      item.focus
                        ? item.focus(scope.row, scope.$index, item)
                        : selectFn()
                    "
                    @change="
                      (value, data, options) =>
                        item.change
                          ? item.change(
                              scope.row,
                              scope.$index,
                              item,
                              value,
                              data,
                              options
                            )
                          : selectFn()
                    "
                  />
                </el-form-item>
              </template>

              <!-- 自定义编辑框 -->
              <template v-else-if="item.type === 'custom'">
                <el-form-item :prop="item.prop">
                  <slot :name="item.componentName" :scope="scope" />
                </el-form-item>
              </template>

              <!-- 操作栏 -->
              <template v-else-if="item.type === 'action'">
                <!-- 可编辑状态的按钮 -->
                <div v-if="isEditTable" class="action">
                  <!-- 编辑行 -->
                  <template v-if="!isForm(scope.$index)">
                    <c-button
                      text="修改"
                      class="btn"
                      type="text"
                      icon="el-icon-edit-outline"
                      @click="editForm(scope.row, scope.$index, item)"
                    />
                  </template>

                  <!-- 保存行 -->
                  <template v-if="isForm(scope.$index)">
                    <c-button
                      text="保存"
                      type="text"
                      class="btn"
                      icon="el-icon-folder-checked"
                      @click="saveForm(scope.row, scope.$index, item)"
                    />
                  </template>

                  <!-- 取消 -->
                  <template v-if="isForm(scope.$index)">
                    <c-button
                      text="取消"
                      type="text"
                      class="btn"
                      icon="el-icon-close"
                      @click="cancel(scope.row, scope.$index, item)"
                    />
                  </template>

                  <!-- 自定义按钮 -->
                  <slot name="action" :scope="scope" />

                  <!-- 删除行 -->
                  <template v-if="!isForm(scope.$index)">
                    <el-popconfirm
                      confirm-button-text="好的"
                      cancel-button-text="不用了"
                      icon="el-icon-info"
                      icon-color="red"
                      title="是否需要删除该行"
                      @confirm="deleteLine(scope.row, scope.$index, item)"
                    >
                      <c-button
                        slot="reference"
                        text="删除"
                        color="red"
                        type="text"
                        icon="el-icon-delete"
                      />
                    </el-popconfirm>
                  </template>
                </div>

                <!-- 正常状态按钮 -->
                <div v-else class="action">
                  <!-- 编辑 -->
                  <template v-if="isEditLine">
                    <c-button
                      class="btn"
                      text="修改"
                      type="text"
                      icon="el-icon-edit-outline"
                      @click="editLine(scope.row, scope.$index, item)"
                    />
                  </template>

                  <!-- 自定义按钮 -->
                  <slot name="action" :scope="scope" />

                  <!-- 详情 -->
                  <template v-if="isDetailLine">
                    <c-button
                      class="btn"
                      text="详情"
                      type="text"
                      color="orange"
                      icon="el-icon-tickets"
                      @click="detailLine(scope.row, scope.$index, item)"
                    />
                  </template>

                  <!-- 删除 -->
                  <template v-if="isDeleteLine">
                    <el-popconfirm
                      confirm-button-text="好的"
                      cancel-button-text="不用了"
                      icon="el-icon-info"
                      icon-color="red"
                      title="是否需要删除该行"
                      @confirm="deleteLine(scope.row, scope.$index, item)"
                    >
                      <c-button
                        slot="reference"
                        text="删除"
                        color="red"
                        type="text"
                        icon="el-icon-delete"
                      />
                    </el-popconfirm>
                  </template>
                </div>
              </template>

              <!-- 正常栏位 -->
              <template v-else>
                <!-- 翻译器 -->
                <dict-tag
                  v-if="item.translation"
                  :dict="item.translation"
                  :value="scope.row[item.prop]"
                />

                <span v-else> {{ scope.row[item.prop] }}</span>
              </template>
            </template>

            <template
              v-if="item.type === 'action' && !item.isDetail"
              slot="header"
            >
              <span class="table-header-icon">
                <i class="el-icon-s-tools" />
              </span>
              {{ "操作" }}
            </template>
          </el-table-column>
        </template>
      </el-table>
    </el-form>
  </div>
</template>

<script>
import baseParams from "./mixins/index";
import Sortable from "sortablejs";

export default {
  name: "STable",
  mixins: [baseParams],
  mounted() {
    if (this.isRowDrop) {
      this.rowDrop();
    }
  },
  data() {
    return {
      //表单数据
      formData: {},
      //编辑的行的下标
      editLineIndex: null,
      //表单旧数据
      oldData: {},
      baseUrl: process.env.VUE_APP_BASE_API,
    };
  },
  computed: {
    //校验规则
    rules() {
      const rules = {};
      this.tableColumn.forEach((item) => {
        if (item.rules) {
          rules[item.prop] = item.rules;
        }
      });
      return rules;
    },
  },
  methods: {
    selectFn(row, index, item) {},
    //多选
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    //编辑
    editLine(row, index, item) {
      this.$emit("editLine", row, index, item);
    },
    //保存
    saveLine(row, index, item) {
      this.$emit("saveLine", row, index, item);
    },
    //详情
    detailLine(row, index, item) {
      this.$emit("detailLine", row, index, item);
    },
    //删除
    deleteLine(row, index, item) {
      this.$emit("deleteLine", row, index, item);
    },
    //新建表单
    createForm(createData = {}) {
      if (this.tableData.length > 0) {
        if (!this.tableData[0].id || this.editLineIndex !== null) {
          this.$message.warning("请先保存数据");
        } else {
          this.$emit("createForm");
          this.tableData.unshift(createData);
          this.formData = this.tableData[0];
          this.editLineIndex = 0;
        }
      } else {
        this.tableData.unshift(createData);
        this.formData = this.tableData[0];
        this.editLineIndex = 0;
      }
    },
    //编辑表单
    editForm(row, index, item) {
      if (this.editLineIndex !== null) {
        this.$message.warning("请先保存数据");
      } else {
        this.formData = row;
        this.oldData = JSON.parse(JSON.stringify(row));
        this.editLineIndex = index;
        this.$emit("editForm", row, index, item);
      }
    },
    //保存表单
    saveForm(row, index, item) {
      this.$refs.tableForm
        .validate()
        .then(() => {
          this.$emit("saveForm", row, index, item);
        })
        .catch(() => {
          this.$message.error("校验不通过");
        });
    },
    //取消
    cancel(row, index, item) {
      if (!row.id) {
        this.tableData.splice(0, 1);
        this.editLineIndex = null;
        this.formData = {};
      } else {
        this.$set(this.tableData, this.editLineIndex, this.oldData);
        this.editLineIndex = null;
        this.formData = {};
      }
      this.$emit("cancelForm", row, index, item);
    },
    //是否是表单
    isForm(index) {
      return this.editLineIndex === index;
    },
    //刷新表单
    refreshForm() {
      this.editLineIndex = null;
      this.formData = {};
    },
    // 拖拽排序
    rowDrop() {
      const el = this.$refs.eTable.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      const sortable = Sortable.create(el, {
        onEnd: (evt) => {
          const targetRow = this.tableData.splice(evt.oldIndex, 1)[0];
          this.tableData.splice(evt.newIndex, 0, targetRow);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep .el-form-item.is-required::before {
  content: "*" !important;
  color: red;
  margin-right: 7px;
}

::v-deep .el-form-item {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 0;
}

.el-form-item.is-error {
  margin-bottom: 20px;
}

::v-deep .el-table__header .el-table__cell {
  padding: 2px 0;
  color: aliceblue;
  background-color: #1683bd !important;
}

::v-deep .el-table__cell {
  padding: 5px;
}

.link {
  color: #1683bd;
  font-weight: 550;
  width: 100%;
}
</style>
