<template>
  <div class="container">
    <ul class="nav nav-pills justify-content-center py-4">
      <li class="nav-item">
        <router-link to="/" class="nav-link">首頁</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/products" class="nav-link">產品列表</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/cart" class="nav-link">購物車</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin" class="nav-link">前往後台</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
