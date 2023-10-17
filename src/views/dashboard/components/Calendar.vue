<!--  -->
<template>
  <div>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import zhCnLocale from "@fullcalendar/core/locales/zh-cn";

export default {
  components: {
    FullCalendar,
  },
  computed: {
    calendarOptions() {
      return {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        height: 700, //日历高度
        width: 600,
        headerToolbar: {
          left: "prev,next,prevYear,nextYear",
          center: "title",
          right: "timeGridDay,timeGridWeek,dayGridMonth",
        },
        timeGridEventMinHeight: "40", // 设置事件的最小高度
        handleWindowResize: true, //随浏览器窗口变化
        selectable: true,
        locale: zhCnLocale,
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
