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
}

.el-form-item {
  flex-direction: column;
}

.el-form-item label {
  width: 100% !important;
  justify-content: left !important;
  color: #333 !important;
  font-size: 1.01em;
}
</style>
