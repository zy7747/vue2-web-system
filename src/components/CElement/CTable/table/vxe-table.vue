<!-- 表格 -->
<template>
  <div class="STable">
    <!-- 表格 -->
    <el-form
      ref="tableForm"
      :model="formData"
      :rules="rules"
      :validate-on-rule-change="false"
    >
      <vxe-table
        border
        align="center"
        size="small"
        stripe
        ref="eTable"
        v-bind="$attrs"
        :max-height="maxHeight"
        :data="tableData"
        :loading="loading"
        :loading-config="{
          icon: 'vxe-icon-indicator roll',
          text: '正在拼命加载中...',
        }"
        :scroll-y="{ enabled: true }"
        :column-config="{ resizable: true }"
        @selection-change="handleSelectionChange"
      >
        <template v-for="(item, index) in tableColumn">
          <!-- 序号/多选 -->
          <vxe-column
            v-if="item.type === 'index'"
            v-bind="{
              ...item,
              width: 55,
              type: 'seq',
              field: item.prop,
              title: item.label,
            }"
            :key="index"
            fixed="left"
          />

          <vxe-column
            v-else-if="item.type === 'selection'"
            v-bind="{
              ...item,
              width: 55,
              type: 'checkbox',
            }"
            :key="index"
            fixed="left"
          />

          <vxe-column
            v-else-if="item.type === 'show'"
            v-bind="{
              ...item,
              width: 55,
              field: item.prop,
              title: item.label,
            }"
            tree-node
            :key="index"
            fixed="left"
          />

          <!-- 其他 -->
          <vxe-column
            v-else-if="item.show == undefined ? true : item.show"
            v-bind="{
              ...item,
              align: item.align ? item.align : 'center',
              field: item.prop,
              title: item.label,
            }"
            :show-header-overflow="true"
            :show-overflow="true"
            :filters="item.isFilters ? dataFilters(item) : null"
            :filter-method="item.isFilters ? filterHandler : null"
            :key="index"
          >
            <template #default="{ row, rowIndex }">
              <!-- 标签 -->
              <template v-if="item.type === 'tag' && row[item.prop] !== ''">
                <el-tag :type="item.options[row[item.prop]]">
                  {{ row[item.prop] }}
                </el-tag>
              </template>

              <!-- 图片框 -->
              <template v-else-if="item.type === 'picture'">
                <el-image
                  style="width: 50px; border-radius: 5px"
                  :src="fileUrl + row[item.prop]"
                  :preview-src-list="[fileUrl + row[item.prop]]"
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
                    item.click ? item.click(row, rowIndex, item) : selectFn()
                  "
                  >{{ row[item.prop] }}
                </a>
              </template>

              <!-- 拖拽排序框 -->
              <template v-else-if="item.type === 'sort'">
                <div
                  style="
                    justify-content: center;
                    display: flex;
                    align-items: center;
                  "
                >
                  <c-button type="text" icon="el-icon-d-caret" size="medium" />
                </div>
              </template>

              <!-- 输入框 -->
              <template v-else-if="item.type === 'input' && isForm(rowIndex)">
                <el-form-item :prop="item.prop">
                  <c-input
                    v-bind="item.form"
                    v-model="row[item.prop]"
                    v-on="item.on"
                  />
                </el-form-item>
              </template>

              <!-- 数字 -->
              <template v-else-if="item.type === 'number' && isForm(rowIndex)">
                <el-form-item :prop="item.prop">
                  <c-number
                    v-bind="item.form"
                    v-model="row[item.prop]"
                    v-on="item.on"
                  />
                </el-form-item>
              </template>

              <!-- 下拉框 -->
              <template v-else-if="item.type === 'select' && isForm(rowIndex)">
                <el-form-item :prop="item.prop">
                  <c-select
                    v-bind="item.form"
                    v-model="row[item.prop]"
                    :options="item.options"
                    v-on="item.on"
                    @focus="
                      item.focus ? item.focus(row, rowIndex, item) : selectFn()
                    "
                    @change="
                      (value, data, options) =>
                        item.change
                          ? item.change(
                              row,
                              rowIndex,
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
                  <slot :name="item.componentName" :scope="{ row, rowIndex }" />
                </el-form-item>
              </template>

              <!-- 操作栏 -->
              <template v-else-if="item.type === 'action'">
                <!-- 可编辑状态的按钮 -->
                <div v-if="isEditTable" class="action">
                  <!-- 编辑 -->
                  <template v-if="!isForm(rowIndex)">
                    <c-button
                      :text="$t('system.edit')"
                      class="btn"
                      type="text"
                      icon="el-icon-edit-outline"
                      @click="editForm(row, rowIndex, item)"
                      v-hasPermission="permission.edit"
                    />
                  </template>

                  <!-- 保存 -->
                  <template v-if="isForm(rowIndex)">
                    <c-button
                      :text="$t('system.save')"
                      type="text"
                      class="btn"
                      icon="el-icon-folder-checked"
                      @click="saveForm(row, rowIndex, item)"
                    />
                  </template>

                  <!-- 取消 -->
                  <template v-if="isForm(rowIndex)">
                    <c-button
                      :text="$t('system.cancel')"
                      type="text"
                      class="btn"
                      icon="el-icon-close"
                      @click="cancel(row, rowIndex, item)"
                    />
                  </template>

                  <!-- 自定义按钮 -->
                  <slot name="action" :scope="{ row, rowIndex }" />

                  <!-- 删除行 -->
                  <template v-if="!isForm(rowIndex)">
                    <el-popconfirm
                      confirm-button-text="好的"
                      cancel-button-text="不用了"
                      icon="el-icon-info"
                      icon-color="red"
                      title="是否需要删除该行"
                      @confirm="deleteLine(row, rowIndex, item)"
                    >
                      <c-button
                        slot="reference"
                        :text="$t('system.delete')"
                        color="red"
                        type="text"
                        icon="el-icon-delete"
                        v-hasPermission="permission.delete"
                      />
                    </el-popconfirm>
                  </template>
                </div>

                <!-- 正常状态按钮 -->
                <div v-else class="action">
                  <!-- 编辑 -->
                  <template v-if="hasEditLine">
                    <c-button
                      class="btn"
                      type="text"
                      :text="$t('system.edit')"
                      v-hasPermission="permission.edit"
                      icon="el-icon-edit-outline"
                      @click="editLine(row, rowIndex, item)"
                    />
                  </template>

                  <!-- 自定义按钮 -->
                  <slot name="action" :scope="{ row, rowIndex }" />

                  <!-- 详情 -->
                  <template v-if="hasDetailLine">
                    <c-button
                      class="btn"
                      :text="$t('system.detail')"
                      type="text"
                      color="orange"
                      icon="el-icon-tickets"
                      @click="detailLine(row, rowIndex, item)"
                    />
                  </template>

                  <!-- 删除 -->
                  <template v-if="hasDeleteLine">
                    <el-popconfirm
                      confirm-button-text="好的"
                      cancel-button-text="不用了"
                      icon="el-icon-info"
                      icon-color="red"
                      title="是否需要删除该行"
                      @confirm="deleteLine(row, rowIndex, item)"
                    >
                      <c-button
                        slot="reference"
                        :text="$t('system.delete')"
                        color="red"
                        type="text"
                        icon="el-icon-delete"
                        v-hasPermission="permission.delete"
                      />
                    </el-popconfirm>
                  </template>
                </div>
              </template>

              <!-- 正常栏位 -->
              <template v-else>
                <div v-if="item.formatter">
                  {{ item.formatter(row, row[item.prop], rowIndex, item) }}
                </div>
                <!-- 值是数组，切需要翻译的 -->
                <div v-else-if="item.isArrayValue" style="dict-tag-list">
                  <dict-tag
                    v-for="itemValue in row[item.prop]"
                    :key="itemValue"
                    :dict="item.translation"
                    :value="itemValue"
                  />
                </div>

                <!-- 翻译器 -->
                <dict-tag
                  size="small"
                  v-else-if="item.translation"
                  :dict="item.translation"
                  :value="row[item.prop]"
                />

                <span v-else> {{ row[item.prop] }}</span>
              </template>
            </template>

            <template v-if="item.type === 'action' && !item.isDetail" #header>
              <Action :tableColumn="tableColumn" />
            </template>
          </vxe-column>
        </template>
      </vxe-table>
    </el-form>
  </div>
</template>

<script>
import baseParams from "./mixins/index";
import Sortable from "sortablejs";
import Action from "./components/Action";

export default {
  name: "STable",
  mixins: [baseParams],
  components: {
    Action,
  },
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
      fileUrl: process.env.VUE_APP_FILE_API,
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

      Sortable.create(el, {
        onEnd: (evt) => {
          const targetRow = this.tableData.splice(evt.oldIndex, 1)[0];
          this.tableData.splice(evt.newIndex, 0, targetRow);

          for (let index in this.tableData) {
            this.tableData[index].sort = parseInt(index);
          }
        },
      });
    },
    //数据下拉筛选
    dataFilters(column) {
      const filtersData = [];

      this.tableData.forEach((item) => {
        const text = item[column.prop];

        if (text && text !== "" && typeof text === "string") {
          if (column.translation) {
            filtersData.push({
              label: this.getDictLabel(column.translation, text),
              value: text,
            });
          } else {
            filtersData.push({
              label: text,
              value: text,
            });
          }
        }
      });

      return this.$uniqBy(filtersData, "value");
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
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

::v-deep .vxe-header--column {
  padding: 2px 0;
  color: aliceblue;
  background-color: #1683bd !important;
}

.el-form-item.is-error {
  margin-bottom: 20px;
}

.link {
  color: #45b3ee;
  font-weight: 550;
  width: 100%;
}
.link:hover {
  color: #196a96;
  text-decoration: underline;
}

.dict-tag-list {
  display: flex;
}
</style>
