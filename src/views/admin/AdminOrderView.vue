<template>
  <div class="container">
    <!-- <Pagination v-if="orderList.length" :page="pagination" @change-page="getOrders"></Pagination> -->
  </div>
</template>

<script>
// import Pagination from '../../components/admin/PaginationComp.vue'
const { VITE_API_URL, VITE_API_PATH } = import.meta.env

export default {
  data() {
    return {
      orderList: [],
      pagination: {}
    }
  },
  // components: { Pagination },
  mounted() {
    this.getOrders()
  },
  methods: {
    getOrders(page = 1) {
      this.orderLoading = true
      this.$http
        .get(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/orders?page=${page}`)
        .then((res) => {
          this.orderList = res.data.orders
          this.pagination = res.data.pagination
          this.orderLoading = false
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
