<template>
  <div class="container">
    <VueLoading
      v-model:active="isLoading"
      background-color="#212121"
      :opacity="0.8"
      color="#fff"
      loader="dots"
    ></VueLoading>
    <div class="row">
      <div class="col-3" v-for="item in products" :key="item.id">
        <div class="card mb-4">
          <img
            :src="item.imageUrl"
            class="card-img-top"
            :alt="item.title"
            style="aspect-ratio: 1"
          />
          <div class="card-body">
            <h5 class="card-title text-truncate">{{ item.title }}</h5>
            <p class="card-text text-truncate">
              {{ item.description }}
            </p>

            <del class="h6">原價 {{ item.origin_price.toLocaleString() }} 元</del>
            <div class="h5">特價 {{ item.price.toLocaleString() }} 元</div>

            <AddCartBtn :item="item" @cart-loading="setLoading">加入購物車</AddCartBtn>
            <router-link :to="`/product/${item.id}`" class="btn btn-dark">產品細節</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddCartBtn from '../../components/front/AddCartBtn.vue'
const { VITE_API_URL, VITE_API_PATH } = import.meta.env
export default {
  components: { AddCartBtn },
  data() {
    return {
      products: [],
      isLoading: true
    }
  },

  mounted() {
    this.getProducts()
  },
  methods: {
    getProducts() {
      this.isLoading = true
      this.$http.get(`${VITE_API_URL}/api/${VITE_API_PATH}/products/all`).then((res) => {
        this.products = res.data.products
        this.isLoading = false
      })
    },
    setLoading(val) {
      this.isLoading = val
    }
  }
}
</script>

<style lang="scss" scoped></style>
