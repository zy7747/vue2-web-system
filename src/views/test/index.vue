<!--  -->
<template>
  <div>
    <CGrid ref="CGrid" v-if="show" :gridOption="gridOption"> </CGrid>
  </div>
</template>

<script>
export default {
  name: "Test",
  mounted() {
    this.$service.configuration.page
      .list({ menuId: "1707931939465392130" })
      .then((res) => {
        if (res.data.length > 0) {
          const data = res.data[0];
          const { queryParams, tableColumn, formParams } = JSON.parse(
            res.data[0].content
          );

          this.gridOption = {
            ...data,
            queryParams,
            tableColumn,
            formParams,
          };

          this.show = true;
        }
      });
  },
  data() {
    return {
      show: false,
      gridOption: {
        title: "",
        queryParams: [],
        tableColumn: [],
        formParams: [],
        api: "",
        permission: "",
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
