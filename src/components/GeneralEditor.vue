<template>
  <el-form label-width="80px">
    <el-form-item>
      <template #label>
        <span>武将姓名</span>
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
    <el-form-item label="性别">
      <el-select v-model="localValue.gender">
        <el-option value="male" label="男" />
        <el-option value="female" label="女" />
        <el-option value="other" label="其他" />
      </el-select>
    </el-form-item>
    <el-form-item label="初始体力">
      <el-input-number v-model="localValue.hp"></el-input-number>
    </el-form-item>
    <el-form-item label="体力上限">
      <el-input-number v-model="localValue.maxHp"></el-input-number>
    </el-form-item>
    <el-form-item label="技能">
      <el-select v-model="localValue.skills" multiple placeholder="请选择技能">
        <el-option
          v-for="skill in localValue.availableSkills"
          :key="skill"
          :label="skill"
          :value="skill"
        />
      </el-select>
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
