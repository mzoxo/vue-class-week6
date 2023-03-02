<template>
  <div class="container">
    <VueLoading
      v-model:active="isLoading"
      background-color="#212121"
      :opacity="0.8"
      color="#fff"
      loader="dots"
    ></VueLoading>
    <!-- 購物車列表 -->
    <div class="text-end">
      <button
        class="btn btn-outline-danger"
        type="button"
        @click="deleteAllCartItem"
        v-if="cart.carts && cart.carts.length > 0"
        :disabled="isLoading"
      >
        <i class="fas fa-spinner fa-pulse me-1" v-if="isLoading"></i>
        清空購物車
      </button>
    </div>
    <div class="position-relative">
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart.carts && cart.carts.length > 0">
            <tr v-for="cartItem in cart.carts" :key="cartItem.id">
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="deleteCartItem(cartItem.id)"
                  :disabled="cartItem.id === loadingItem"
                >
                  <i class="fas fa-spinner fa-pulse" v-if="cartItem.id === loadingItem"></i>
                  <span v-else>x</span>
                </button>
              </td>
              <td>{{ cartItem.product.title }}</td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <select
                      name=""
                      id=""
                      class="form-select"
                      v-model="cartItem.qty"
                      @change="updateCartItem(cartItem)"
                      :disabled="cartItem.id === loadingItem"
                    >
                      <option :value="i" v-for="i in 10" :key="`option${i}`">{{ i }}</option>
                    </select>
                    <span class="input-group-text" id="basic-addon2">{{
                      cartItem.product.unit
                    }}</span>
                  </div>
                </div>
              </td>
              <td class="text-end">{{ cartItem.total.toLocaleString() }}</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="4" class="text-center text-muted py-4" style="font-size: 14px">
                購物車內沒有商品唷！
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ cart.total.toLocaleString() }}</td>
          </tr>
          <tr>
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">{{ cart.final_total.toLocaleString() }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="my-5 row justify-content-center">
      <VForm ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <v-field
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="form.user.email"
          ></v-field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <v-field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
            v-model="form.user.name"
          ></v-field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人手機</label>
          <v-field
            id="tel"
            name="手機"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['手機'] }"
            placeholder="請輸入手機"
            rules="required|isPhone"
            maxlength="10"
            v-model="form.user.tel"
          ></v-field>
          <error-message name="手機" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <v-field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="form.user.address"
          ></v-field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>

          <textarea
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
      </VForm>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
defineRule('required', required)
defineRule('email', email)
defineRule('isPhone', (value) => {
  const phoneNumber = /^(09)[0-9]{8}$/
  return phoneNumber.test(value) ? true : '請填入正確的手機號碼，需為 09 開頭'
})
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})

// 設定預設語系
setLocale('zh_TW')

const { VITE_API_URL, VITE_API_PATH } = import.meta.env

export default {
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage
  },
  data() {
    return {
      isLoading: false,
      cart: {
        carts: [],
        final_total: 0,
        total: 0
      },
      loadingItem: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },

  mounted() {
    this.getCartList()
  },
  methods: {
    getCartList() {
      this.isLoading = true
      this.$http
        .get(`${VITE_API_URL}/api/${VITE_API_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data
          this.isLoading = false
        })
        .catch((err) => {
          console.log(err.data.message)
        })
    },
    updateCartItem(cart) {
      const data = {
        product_id: cart.product_id,
        qty: cart.qty
      }
      this.loadingItem = cart.id
      this.$http
        .put(`${VITE_API_URL}/api/${VITE_API_PATH}/cart/${cart.id}`, { data })
        .then(() => {
          this.getCartList()
          this.loadingItem = ''
        })
        .catch((err) => {
          console.log(err.data.message)
        })
    },
    deleteCartItem(id) {
      this.loadingItem = id
      this.$http
        .delete(`${VITE_API_URL}/api/${VITE_API_PATH}/cart/${id}`)
        .then(() => {
          this.getCartList()
          this.loadingItem = ''
        })
        .catch((err) => {
          console.log(err.data.message)
        })
    },
    deleteAllCartItem() {
      this.isLoading = true
      this.$http
        .delete(`${VITE_API_URL}/api/${VITE_API_PATH}/carts`)
        .then(() => {
          this.getCartList()
          this.isLoading = false
        })
        .catch((err) => {
          console.log(err.data.message)
        })
    },
    createOrder() {
      if (this.cart.carts.length == 0) {
        alert('請將商品放入購物車後才能結帳唷！')
        return
      }
      this.isLoading = true
      const data = this.form
      this.$http
        .post(`${VITE_API_URL}/api/${VITE_API_PATH}/order`, { data })
        .then(() => {
          alert('訂單送出成功！')
          this.$refs.form.resetForm()
          this.form.message = ''
          this.isLoading = false
          window.scrollTo(0, 0)
          this.getCartList()
        })
        .catch((err) => {
          console.log(err.data.message)
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
