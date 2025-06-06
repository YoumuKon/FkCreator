<template>
  <div class="dialog-overlay">
    <div class="add-effect-dialog">
      <div class="dialog-header">
        <h3>添加新效果</h3>
        <button class="close-btn" @click="close">&times;</button>
      </div>

      <div class="dialog-body">
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
              <div class="type-icon">
                <i :class="type.icon"></i>
              </div>
              <div class="type-info">
                <h5>{{ type.name }}</h5>
                <p>{{ type.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="effect-config" v-if="selectedType">
          <h4>效果配置</h4>
          <div class="form-group">
            <label>效果名称</label>
            <input type="text" v-model="effectName" placeholder="输入效果名称" />
          </div>
          <div class="form-group">
            <label>效果描述</label>
            <textarea v-model="effectDescription" placeholder="描述这个效果的用途"></textarea>
          </div>
        </div>
      </div>

      <div class="dialog-footer">
        <button class="cancel-btn" @click="close">取消</button>
        <button
          class="confirm-btn"
          @click="confirm"
          :disabled="!selectedType || !effectName.trim()"
        >
          创建效果
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // visible: {
    //   type: Boolean,
    //   required: true,
    // },
  },
  data() {
    return {
      selectedType: null,
      effectName: '',
      effectDescription: '',
      effectTypes: [
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
      ]
    };
  },
  methods: {
    selectType(typeId) {
      this.selectedType = typeId;
      // 设置默认名称
      const type = this.effectTypes.find((t) => t.id === typeId);
      this.effectName = `${type.name} ${new Date().getTime().toString().slice(-4)}`;
    },
    close() {
      this.$emit('close');
      this.resetForm();
    },
    confirm() {
      this.$emit('create', {
        type: this.selectedType,
        name: this.effectName,
        description: this.effectDescription
      });
      this.resetForm();
      this.close();
    },
    resetForm() {
      this.selectedType = null;
      this.effectName = '';
      this.effectDescription = '';
    }
  }
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.add-effect-dialog {
  background: white;
  border-radius: 8px;
  width: 600px;
  max-width: 90%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.dialog-header {
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.dialog-body {
  padding: 20px;
  overflow-y: auto;
  flex-grow: 1;
}

.effect-type-selector h4,
.effect-config h4 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #333;
}

.effect-types {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.effect-type-card {
  border: 1px solid #ddd;
  border-radius: 6px;
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

.type-icon {
  font-size: 2rem;
  color: #4a90e2;
  margin-bottom: 12px;
}

.type-info h5 {
  margin: 0 0 8px 0;
  color: #333;
}

.type-info p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #444;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group textarea {
  min-height: 80px;
  resize: vertical;
}

.dialog-footer {
  padding: 16px 24px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-btn,
.confirm-btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.cancel-btn {
  background: #f5f5f5;
  border: 1px solid #ddd;
  color: #333;
}

.confirm-btn {
  background: #4a90e2;
  border: 1px solid #3a7bc8;
  color: white;
}

.confirm-btn:disabled {
  background: #cccccc;
  border-color: #bbbbbb;
  cursor: not-allowed;
}
</style>
