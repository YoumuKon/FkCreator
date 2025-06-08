<template>
  <el-dialog :model-value="props.modelValue" @close="close" title="效果方法配置" :close-on-click-modal="false">
    <el-table :data="props.data" style="width: 100%" border stripe>
      <el-table-column prop="name" label="方法名称" min-width="100" />
      <el-table-column prop="description" label="方法描述" min-width="120" />
      <el-table-column label="操作" min-width="80" align="center">
        <template #default="{ row }">
          <el-button type="text" @click="() => openMethodEditor(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
  <MethodEditorDialog v-if="showMethodEditorDialog" v-model="showMethodEditorDialog" :data="method"></MethodEditorDialog>
</template>

<script setup>
import MethodEditorDialog from '@/components/MethodEditorDialog.vue';
import { ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  data: {
    type: Array,
    required: true
  }
});
const emit = defineEmits(['update:modelValue', 'delete']);

const close = () => {
  emit('update:modelValue', false);
};
const showMethodEditorDialog = ref(false);
const method = ref(null);
const openMethodEditor = (methodData) => {
  method.value = methodData;
  showMethodEditorDialog.value = true;
};
</script>

<style scoped></style>
