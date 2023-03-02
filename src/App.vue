<template>
  <!-- <VueLoading v-model:active="isLoading"></VueLoading> -->

  <RouterView />
</template>
<script>
export default {
  data() {
    return {
      isLoading: true
    }
  },
  methods: {}
}
</script>
<style scoped></style>
