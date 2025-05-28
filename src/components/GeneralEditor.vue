<template>
  <div class="general-editor">
    <h2>武将设置</h2>

    <div class="lr-container">
      <div class="form-group">
        <label>武将名称</label>
        <input v-model="localGeneral.name" type="text" />
      </div>

      <div class="form-group">
        <label>内部名称</label>
        <input v-model="localGeneral.internal_name" type="text" />
      </div>
    </div>

    <div class="form-group">
      <label>性别</label>
      <select v-model="localGeneral.gender">
        <option value="male">男</option>
        <option value="female">女</option>
        <option value="other">其他</option>
      </select>
    </div>

    <div class="lr-container">
      <div class="form-group">
        <label>初始体力</label>
        <input v-model.number="localGeneral.hp" type="number" min="1" />
      </div>

      <div class="form-group">
        <label>体力上限</label>
        <input v-model.number="localGeneral.maxHp" type="number" min="1" />
      </div>
    </div>

    <div class="form-group">
      <label>技能</label>
      <div v-for="(skill, index) in localGeneral.skills" :key="index" class="skill-item">
        {{ skill }}
        <button @click="removeSkill(index)" class="small-delete-button">×</button>
      </div>
      <button @click="addSkillToGeneral" class="small-add-button">+ 添加技能</button>
    </div>

    <button @click="deleteGeneral" class="delete-button">删除武将</button>
  </div>
</template>

<script>
export default {
  props: {
    general: Object,
  },
  data() {
    return {
      localGeneral: { ...this.general },
    }
  },
  watch: {
    localGeneral: {
      deep: true,
      handler(newVal) {
        this.$emit('update:general', newVal)
      },
    },
    general(newVal) {
      this.localGeneral = { ...newVal }
    },
  },
  methods: {
    addSkillToGeneral() {
      if (!this.localGeneral.skills) {
        this.$set(this.localGeneral, 'skills', [])
      }
      this.localGeneral.skills.push('新技能')
    },
    removeSkill(index) {
      this.localGeneral.skills.splice(index, 1)
    },
    deleteGeneral() {
      this.$emit('delete', this.localGeneral.id)
    },
  },
}
</script>

<style scoped>
.skill-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
}

.small-add-button {
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.small-delete-button {
  margin-left: 0.5rem;
  padding: 0 0.25rem;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}
</style>
