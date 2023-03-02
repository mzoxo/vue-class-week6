<template>
  <div class="container">
    <ul class="nav nav-pills justify-content-center py-4">
      <li class="nav-item">
        <router-link to="/admin" class="nav-link">後台首頁</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin/products" class="nav-link">產品列表</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin/orders" class="nav-link">訂單列表</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/" class="nav-link">前往前台</router-link>
      </li>
      <li class="nav-item">
        <a href="javascript:;" @click.prevent="logout" class="nav-link">登出</a>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
const { VITE_API_URL } = import.meta.env

export default {
  mounted() {
    this.checkAdmin()
  },
  methods: {
    logout() {
      document.cookie = `hexToken=; expires=${new Date()};`
      this.$router.push('/login')
    },
    checkAdmin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common['Authorization'] = token
      this.$http
        .post(`${VITE_API_URL}/api/user/check`)
        .then(() => {})
        .catch((err) => {
          console.log(err.response.data.message)
          this.$router.push('/login')
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
