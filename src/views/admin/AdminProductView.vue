<template>
  <div class="container">
    <!-- <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModel('new')">建立新的產品</button>
    </div> -->
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="productLoading">
          <td colspan="6" class="text-center py-4">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </td>
        </tr>
        <template v-else>
          <tr v-for="product in productList" :key="product.id">
            <td>{{ product.category }}</td>
            <td>{{ product.title }}</td>
            <td class="text-end">{{ product.origin_price }}</td>
            <td class="text-end">{{ product.price }}</td>
            <td>
              <span class="text-success">{{ !!product.is_enabled ? '啟用' : '未啟用' }}</span>
            </td>
            <td>
              <!-- <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="openModel('edit', product)"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="openModel('delete', product)"
                >
                  刪除
                </button>
              </div> -->
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <Pagination
      v-if="productList.length"
      :page="pagination"
      @change-page="getProducts"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from '../../components/admin/PaginationComp.vue'
const { VITE_API_URL, VITE_API_PATH } = import.meta.env

export default {
  data() {
    return {
      productLoading: true,
      productList: [],
      productData: {
        imagesUrl: []
      },
      pagination: {},
      productStatus: null
    }
  },
  components: {
    Pagination
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    getProducts(page = 1) {
      this.productLoading = true
      this.$http
        .get(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/products?page=${page}`)
        .then((res) => {
          this.productList = res.data.products
          this.pagination = res.data.pagination
          this.productLoading = false
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
    // updateProduct() {
    //   // 去空字串
    //   this.productData.imagesUrl ? this.productData.imagesUrl.filter((el) => el) : ''
    //   const method = this.productStatus === 'new' ? 'post' : 'put'
    //   const url =
    //     this.productStatus === 'new'
    //       ? `${this.apiUrl}/api/${this.apiPath}/admin/product`
    //       : `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.productData.id}`
    //       this.$http[method](url, { data: this.productData })
    //     .then((res) => {
    //       alert(res.data.message)
    //       productModal.hide()
    //       this.getProducts()
    //     })
    //     .catch((err) => {
    //       alert(err.data.message)
    //     })
    // },
    // delProduct() {
    //   axios
    //     .delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.productData.id}`)
    //     .then((res) => {
    //       alert(res.data.message)
    //       delProductModal.hide()
    //       this.getProducts()
    //     })
    //     .catch((err) => {
    //       alert(err.data.message)
    //       delProductModal.hide()
    //     })
    // },
    // openModel(type, product) {
    //   this.productStatus = type
    //   if (type === 'new') {
    //     this.productData = {
    //       imagesUrl: []
    //     }
    //     productModal.show()
    //   } else if (type === 'edit') {
    //     this.productData = { ...product }
    //     productModal.show()
    //   } else if (type === 'delete') {
    //     this.productData = { ...product }
    //     delProductModal.show()
    //   }
    // },
    // createImage() {
    //   this.productData.imagesUrl = []
    //   this.productData.imagesUrl.push('')
    // }
  }
}
</script>

<style lang="scss" scoped></style>
