<template>
  <div class="container">
    <VueLoading
      v-model:active="isLoading"
      background-color="#212121"
      :opacity="0.8"
      color="#fff"
      loader="dots"
    ></VueLoading>
    <div class="row" v-if="product.id">
      <div class="col-sm-6 text-center">
        <img class="img-fluid" :src="product.imageUrl" alt="" style="max-width: 70%" />
      </div>
      <div class="col-sm-6">
        <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
        <p>商品描述：{{ product.description }}</p>
        <p>商品內容：{{ product.content }}</p>
        <div class="h5" v-if="product.price === product.origin_price">{{ product.price }} 元</div>
        <template v-else>
          <del class="h6">原價 {{ product.origin_price }} 元</del>
          <div class="h5">現在只要 {{ product.price }} 元</div>
        </template>
        <div>
          <div class="input-group">
            <select name="" id="" class="form-select" v-model="qty">
              <option :value="i" v-for="i in 10" :key="`option${i}`">{{ i }}</option>
            </select>

            <AddCartBtn :item="product" :qty="qty" @cart-loading="setLoading"></AddCartBtn>
          </div>
        </div>
      </div>
      <!-- col-sm-6 end -->
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
      product: {},
      qty: 1,
      isLoading: false
    }
  },
  mounted() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      this.isLoading = true
      const { id } = this.$route.params

      this.$http.get(`${VITE_API_URL}/api/${VITE_API_PATH}/product/${id}`).then((res) => {
        this.product = res.data.product
        this.isLoading = false
      })
    },
    setLoading(val) {
      this.isLoading = val
      if (!val) this.qty = 1
    }
  }
}
</script>

<style lang="scss" scoped></style>
