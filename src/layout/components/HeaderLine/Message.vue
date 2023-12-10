<!--  -->
<template>
  <div>
    <el-popover placement="bottom" trigger="click">
      <div class="item" title="系统公告" slot="reference">
        <el-badge :is-dot="isDot" class="dot">
          <a class="cursor" href="JavaScript:void(0)">
            <svg-icon
              icon-class="系统公告"
              class="icon"
              style="font-size: 27px"
            />
          </a>
        </el-badge>
      </div>
      <div class="notice">
        <el-tabs v-model="activeName">
          <el-tab-pane label="通知" name="通知">
            <Notice :list="noticeList" />
          </el-tab-pane>

          <el-tab-pane label="邮件" name="邮件">
            <Mail :list="mailList" />
          </el-tab-pane>

          <el-tab-pane label="公告" name="公告">
            <Announcement :list="announcementList" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-popover>
  </div>
</template>

<script>
import Mail from "./components/Mail";
import Notice from "./components/Notice";
import Announcement from "./components/Announcement";
import { getWebsocket } from "@/utils/websocket";

export default {
  components: {
    Mail,
    Notice,
    Announcement,
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));

    getWebsocket(this.getNotice);
  },
  data() {
    return {
      activeName: "通知",
      isDot: false, //0.未读 1.已读
      userInfo: {},
      list: [],
      mailList: [],
      noticeList: [],
      announcementList: [],
    };
  },
  methods: {
    getNotice() {
      this.$service.functional.notice
        .list({ receiver: this.userInfo.id })
        .then((res) => {
          const mail = [];
          const notice = [];
          const announcement = [];
          this.list = JSON.parse(JSON.stringify(res.data));

          this.list.forEach((item) => {
            if (item.type === "notice") {
              notice.push(item);
            } else if (item.type === "mail") {
              mail.push(item);
            } else {
              announcement.push(item);
            }
          });
          //全部已读
          this.isDot = !this.list.every((item) => item.isRead !== "0");
          //三种不同类型的数据
          this.mailList = mail;
          this.noticeList = notice;
          this.announcementList = announcement;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.notice {
  width: 300px;
  height: 500px;
}

.el-badge__content.is-dot {
  top: 5px;
}
</style>
