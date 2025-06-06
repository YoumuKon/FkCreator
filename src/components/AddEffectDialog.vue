<template>
  <el-dialog
    :model-value="props.modelValue"
    @close="close"
    title="添加效果"
    :close-on-click-modal="false"
  >
    <div class="effect-type-selector">
      <h4>选择效果类型</h4>
      <div class="effect-types">
        <div
          v-for="type in effectTypes"
          :key="type.id"
          class="effect-type-card"
          :class="{ selected: selectedType === type.id }"
          @click="selectType(type.id)"
        >
          <div class="type-info">
            <h5>{{ type.name }}</h5>
            <p>{{ type.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="effect-config" v-if="selectedType">
      <h4>效果配置</h4>
      <el-form :model="effectRef">
        <el-form-item label="效果名称" prop="name">
          <el-input v-model="effectRef.name" placeholder="输入效果名称" />
        </el-form-item>
        <el-form-item label="效果描述" prop="description">
          <el-input
            type="textarea"
            v-model="effectRef.description"
            placeholder="输入效果描述"
            :rows="3"
          />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <el-button class="cancel-btn" @click="close">取消</el-button>
      <el-button
        class="confirm-btn"
        type="primary"
        @click="confirm"
        :disabled="!selectedType || !effectRef.name"
      >
        确认
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});
const effectRef = ref({
  name: '',
  description: ''
});
const emit = defineEmits(['create', 'update:modelValue']);
const selectedType = ref(null);
const effectTypes = ref([
  {
    id: 'animation',
    name: '动画效果',
    description: '创建时间轴动画和过渡效果',
    icon: 'fas fa-film'
  },
  {
    id: 'interaction',
    name: '交互效果',
    description: '响应用户输入的交互效果',
    icon: 'fas fa-hand-pointer'
  },
  {
    id: 'data',
    name: '数据处理',
    description: '数据转换和处理流程',
    icon: 'fas fa-database'
  },
  {
    id: 'custom',
    name: '自定义效果',
    description: '从头开始创建自定义效果',
    icon: 'fas fa-cogs'
  }
]);
const selectType = (typeId) => {
  selectedType.value = typeId;
  // 设置默认名称
  const type = effectTypes.value.find((t) => t.id === typeId);
  effectRef.value.name = `${type.name} ${new Date().getTime().toString().slice(-4)}`;
};
const close = () => {
  emit('update:modelValue', false);
  resetForm();
};
const confirm = () => {
  emit('create', {
    type: selectedType.value,
    ...effectRef.value
  });
  close();
};

const resetForm = () => {
  effectRef.value.name = '';
  effectRef.value.description = '';
  selectedType.value = null;
};
</script>

<style scoped>
.effect-config {
  margin-top: 40px;
}

.effect-type-selector h4,
.effect-config h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
  font-size: 1rem;
  text-shadow:
    0 0 0.4px rgba(0, 0, 0, 0.5),
    0 0 0.4px rgba(0, 0, 0, 0.5),
    0 0 0.4px rgba(0, 0, 0, 0.5);
  border-left: #4a90e2 3px solid;
  background-color: #eee;
  padding: 4px 8px;
  border-radius: 4px;
}

.effect-types {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.effect-type-card {
  border: 1px solid #ddd;
  border-radius: var(--el-border-radius-base);
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.effect-type-card:hover {
  border-color: #4a90e2;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.2);
}

.effect-type-card.selected {
  border-color: #4a90e2;
  background-color: #f5f9ff;
}

.type-info h5 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 1rem;
  text-shadow:
    0 0 0.4px rgba(0, 0, 0, 0.5),
    0 0 0.4px rgba(0, 0, 0, 0.5),
    0 0 0.4px rgba(0, 0, 0, 0.5);
}

.type-info p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}
</style>
