<template>
  <el-form label-width="80px" :model="localValue" :rules="formRules">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item prop="name">
          <template #label>
            <span>技能名称</span>
            <span class="remark">（长度限制10）</span>
          </template>
          <el-input v-model="localValue.name" placeholder="技能名称" maxlength="10"></el-input>
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
    <el-form-item label="技能描述" prop="description">
      <el-input
        type="textarea"
        :rows="3"
        v-model="localValue.description"
        placeholder="这是一个刚创建的技能，请添加相关信息"
      ></el-input>
    </el-form-item>
    <el-form-item label="技能效果">
      <el-row>
        <el-col :span="24">
          <el-button type="primary" plain @click="showAddEffectDialog = true">添加效果</el-button>
        </el-col>
        <el-col :span="24">
          <el-table :data="localValue.effects" border stripe class="table">
            <el-table-column prop="name" label="效果名" min-width="100" />
            <el-table-column prop="description" label="描述" min-width="200">
              <template #default="scope">
                <span>{{ scope.row.description || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="80" align="center">
              <template #default="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="() => ElMessageBox.alert('打开配置界面')"
                >
                  配置
                </el-button>
                <el-button
                  type="danger"
                  text
                  size="small"
                  @click="deleteEffect(scope.$index, scope.row)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
  <AddEffectDialog v-model="showAddEffectDialog" @create="createEffect" />
</template>

<script setup>
import { reactive, ref, watchEffect } from 'vue';
import AddEffectDialog from '@/components/AddEffectDialog.vue';
import { createNewEffect } from '@/utils/models.js';
import { ElMessage, ElMessageBox } from 'element-plus';

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
  name: [{ required: true, message: '技能名称不能为空', trigger: 'change' }],
  internal_name: [
    { required: true, message: '内部名称不能为空', trigger: 'change' },
    {
      pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/,
      message: '仅允许英文开头，且仅包含英文字母、数字、下划线',
      trigger: 'change'
    }
  ]
});

// 技能效果
const showAddEffectDialog = ref(false);

const createEffect = (data) => {
  const newEffect = createNewEffect({
    type: 'targetmod',
    name: data.name,
    description: data.description
  });
  localValue.value.effects.push(newEffect);
  return newEffect;
};

const deleteEffect = (index, data) => {
  ElMessageBox.confirm(`确定删除效果【${data.name}】吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    localValue.value.effects.splice(index, 1);
    ElMessage.success('删除成功');
  });
};
</script>

<style>
.remark {
  font-size: 0.8em;
  color: #888;
}

.table {
  margin-top: 10px;
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #dcdfe6;
  max-width: 800px;
}
</style>
