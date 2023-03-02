<template>
  <button type="button" class="btn btn-primary me-3" @click="addToCart(item.id, qty)" setLoading>
    加入購物車
  </button>
</template>

<script>
const { VITE_API_URL, VITE_API_PATH } = import.meta.env
export default {
  props: ['item', 'qty'],
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    addToCart(product_id, qty = 1) {
      this.isLoading = true
      this.$emit('cartLoading', this.isLoading)
      const data = {
        product_id,
        qty
      }
      this.$http
        .post(`${VITE_API_URL}/api/${VITE_API_PATH}/cart`, { data })
        .then(() => {
          window.alert('加入購物車成功！')
          this.isLoading = false
          this.$emit('cartLoading', this.isLoading)
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
