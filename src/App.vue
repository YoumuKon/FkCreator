<script setup>
import HeaderView from '@/views/HeaderView.vue';
</script>

<template>
  <div class="app">
    <HeaderView></HeaderView>
    <RouterView />
  </div>
</template>

<style>
.app {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(127, 143, 233, 0.14), rgba(67, 191, 233, 0.14));
}

.el-form-item {
  flex-direction: column;
}

.el-form-item .el-form-item__label {
  width: 100% !important;
  justify-content: left !important;
  color: #333 !important;
  font-size: 1.01em;
  text-shadow:
    0 0 0.4px rgba(0, 0, 0, 0.5),
    0 0 0.4px rgba(0, 0, 0, 0.5),
    0 0 0.4px rgba(0, 0, 0, 0.5);
}
</style>
