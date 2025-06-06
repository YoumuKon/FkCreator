<template>
  <el-form label-width="80px" :model="localValue" :rules="formRules">
    <el-row :gutter="10">
      <el-col :span="12"
        ><el-form-item prop="name">
          <template #label>
            <span>Mod名称</span>
            <span class="remark">（长度限制20）</span>
          </template>
          <el-input v-model="localValue.name" placeholder="请输入Mod名称" maxlength="20"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="internal_name">
          <template #label>
            <span>内部名称（code）</span>
            <span class="remark">（长度限制60）</span>
          </template>
          <el-input
            v-model="localValue.internal_name"
            placeholder="请输入内部名称"
            maxlength="60"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="作者" prop="author">
      <template #label>
        <span>作者</span>
        <span class="remark">（长度限制20）</span>
      </template>
      <el-input v-model="localValue.author" placeholder="请输入作者" maxlength="20"></el-input>
    </el-form-item>
    <el-form-item label="版本" prop="version">
      <el-input v-model="localValue.version" placeholder="请输入版本号" maxlength="20"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="description">
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
import { reactive, ref, watchEffect } from 'vue';

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
const formRules = reactive({
  name: [{ required: true, message: 'Mod名称不能为空', trigger: 'change' }],
  internal_name: [
    { required: true, message: '内部名称不能为空', trigger: 'change' },
    {
      pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/,
      message: '仅允许英文开头，且仅包含英文字母、数字、下划线',
      trigger: 'change'
    }
  ],
  version: [{ required: true, message: '版本不能为空', trigger: 'change' }]
});
</script>

<style>
.remark {
  font-size: 0.8em;
  color: #888;
}
</style>
