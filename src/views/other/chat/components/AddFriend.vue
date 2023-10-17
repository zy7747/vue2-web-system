<!--  -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse :title="'按条件搜索'" @reset="resetQueryData" @search="search">
      <template slot="content">
        <CForm
          ref="queryForm"
          :form-data="queryData"
          :form-params="queryParams"
        />
      </template>
    </Collapse>
    <div style="margin-top: 10px; width: 100%"></div>

    <CTable ref="table" :query="query" :table-column="tableColumn">
      <template slot="action" slot-scope="{ scope }">
        <c-button
          class="btn"
          text="加为好友"
          type="text"
          icon="el-icon-plus"
          v-if="!scope.row.friendStatus"
          @click="addFriend(scope.row, scope.$index)"
        />

        <c-button
          class="btn"
          text="等待好友通过"
          type="text"
          disabled
          v-else-if="scope.row.friendStatus === '0'"
        />

        <c-button
          class="btn"
          text="已通过好友"
          type="text"
          disabled
          v-else-if="scope.row.friendStatus === '1'"
        />
      </template>
    </CTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 数据
      queryData: {
        phone: null,
        email: null,
        account: null,
        password: null,
        user: null,
        name: null,
        idCard: null,
        avatar: null,
        sex: null,
        roles: null,
        userType: null,
        remark: null,
        age: null,
        birthDate: null,
      },
      tableColumn: [
        {
          type: "selection",
          width: 55,
        },
        {
          label: "序号",
          type: "index",
          width: 55,
        },
        {
          label: "头像",
          prop: "avatar",
          width: 150,
          type: "picture",
        },
        {
          label: "用户名",
          prop: "user",
          width: 150,
          sortable: true,
        },
        {
          label: "真实姓名",
          prop: "name",
          width: 150,
          sortable: true,
        },
        {
          label: "电话号码",
          prop: "phone",
          width: 150,
          sortable: true,
        },
        {
          label: "电子邮箱",
          prop: "email",
          width: 150,
          sortable: true,
        },
        {
          label: "账号",
          prop: "account",
          width: 150,
          sortable: true,
        },
        {
          label: "性别",
          prop: "sex",
          width: 150,
          translation: "user_sex",
          sortable: true,
        },
        {
          label: "年龄",
          prop: "age",
          width: 150,
          sortable: true,
        },
        {
          label: "出生日期",
          prop: "birthDate",
          width: 150,
          sortable: true,
        },
        {
          label: "操作",
          type: "action",
          fixed: "right",
          width: 160,
        },
      ],
    };
  },
  computed: {
    queryParams() {
      return [
        {
          type: "input",
          label: "电话号码",
          prop: "phone",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "用户UID",
          prop: "uid",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "电子邮箱",
          prop: "email",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "账号",
          prop: "account",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "用户名",
          prop: "user",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "真实姓名",
          prop: "name",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "datePicker",
          label: "出生日期",
          prop: "birthDate",
          span: 6,
          attributes: {},
          on: {},
        },
      ];
    },
  },
  methods: {
    search() {
      this.$refs.table.queryTableData();
    },
    resetQueryData() {
      // 重置表单
      this.$refs.queryForm.reset();
      // 刷新表格
      this.$refs.table.refreshTable();
    },
    // 1.用户查询和过滤
    query(page, size) {
      return this.$service.baseData.user
        .searchFriend({ page, size, ...this.queryData })
        .then((res) => {
          const userList = res.data.userList.list.map((user) => {
            const hasFriend = res.data.friendList.find(
              (friend) => friend.friendId === user.id
            );
            if (hasFriend) {
              return { ...user, friendStatus: hasFriend.status };
            } else {
              return { ...user, friendStatus: null };
            }
          });

          return { ...res.data.userList, list: userList };
        });
    },
    //添加好友
    addFriend(row) {
      this.$service.baseData.user
        .addFriend({ friendId: row.id })
        .then((res) => {
          if (res.code === 200) {
            this.$message.success("好友请求已发送");
            this.resetQueryData();
          } else {
            this.$message.success("消息推送失败");
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
