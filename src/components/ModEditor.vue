<template>
  <el-form label-width="80px">
    <el-form-item>
      <template #label>
        <span>Mod名称</span>
        <span class="remark">（长度限制20）</span>
      </template>
      <el-input v-model="localValue.name" placeholder="请输入Mod名称" maxlength="20"></el-input>
    </el-form-item>
    <el-form-item>
      <template #label>
        <span>内部名称</span>
        <span class="remark">（长度限制20）</span>
      </template>
      <el-input
        v-model="localValue.internal_name"
        placeholder="请输入内部名称"
        maxlength="20"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <template #label>
        <span>作者</span>
        <span class="remark">（长度限制20）</span>
      </template>
      <el-input v-model="localValue.author" placeholder="请输入作者" maxlength="20"></el-input>
    </el-form-item>
    <el-form-item label="版本">
      <el-input v-model="localValue.version" placeholder="请输入版本号" maxlength="20"></el-input>
    </el-form-item>
    <el-form-item label="描述">
      <el-input
        type="textarea"
        :rows="3"
        v-model="localValue.description"
        placeholder="这是一个刚创建的mod，请添加相关信息"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const { modelValue } = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});
const emits = defineEmits(['update:modelValue']);
const localValue = ref(modelValue);
const updateValue = (value) => {
  localValue.value = value;
  emits('update:modelValue', localValue.value);
};
watchEffect(() => {
  updateValue(localValue.value);
});
</script>

<style>
.remark {
  font-size: 0.8em;
  color: #888;
}
</style>
