<template>
  <el-form :model="localValue" label-width="80px" :rules="formRules">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item prop="name">
          <template #label>
            <span>武将姓名</span>
            <span class="remark">（长度限制20）</span>
          </template>
          <el-input
            v-model="localValue.name"
            placeholder="请输入武将名称"
            maxlength="20"
          ></el-input>
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
    <el-form-item label="性别" prop="gender">
      <el-select v-model="localValue.gender">
        <el-option value="male" label="男" />
        <el-option value="female" label="女" />
        <el-option value="other" label="其他" />
      </el-select>
    </el-form-item>
    <el-row>
      <el-form-item label="初始体力" class="number-input" prop="hp">
        <el-input-number v-model="localValue.hp"></el-input-number>
      </el-form-item>
      <el-form-item label="体力上限" class="number-input" prop="maxHp">
        <el-input-number v-model="localValue.maxHp"></el-input-number>
      </el-form-item>
    </el-row>
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
// 初始体力不能大于体力上限
const validateHp = (rule, value, callback) => {
  if (value > localValue.value.maxHp) {
    callback(new Error('初始体力不能大于体力上限'));
    return;
  }
  callback();
};
const formRules = reactive({
  name: [{ required: true, message: '武将姓名不能为空', trigger: 'change' }],
  internal_name: [
    { required: true, message: '内部名称不能为空', trigger: 'change' },
    {
      pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/,
      message: '仅允许英文开头，且仅包含英文字母、数字、下划线',
      trigger: 'change'
    }
  ],
  gender: [{ required: true, message: '性别不能为空', trigger: 'change' }],
  hp: [{ validator: validateHp, trigger: 'change' }]
});
</script>

<style>
.remark {
  font-size: 0.8em;
  color: #888;
}

.number-input {
  width: 20%;
  min-width: 120px;
}
</style>
