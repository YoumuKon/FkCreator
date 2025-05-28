<template>
  <div class="package-editor">
    <h2>包设置</h2>

    <div class="lr-container">
      <div class="form-group">
        <label>包名称</label>
        <input v-model="localPkg.name" type="text" />
      </div>

      <div class="form-group">
        <label>内部名称</label>
        <input v-model="localPkg.internal_name" type="text" />
      </div>
    </div>

    <div class="form-group">
      <label>描述</label>
      <textarea v-model="localPkg.description"></textarea>
    </div>

    <div class="button-group">
      <button @click="addGeneral" class="add-button">添加武将</button>
      <button @click="addSkill" class="add-button">添加技能</button>
      <button @click="deletePackage" class="delete-button">删除包</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pkg: Object,
  },
  data() {
    return {
      localPkg: { ...this.pkg },
    }
  },
  watch: {
    localPkg: {
      deep: true,
      handler(newVal) {
        this.$emit('update:pkg', newVal)
      },
    },
    pkg(newVal) {
      this.localPkg = { ...newVal }
    },
  },
  methods: {
    addGeneral() {
      this.$emit('add-general', this.localPkg.id)
    },
    addSkill() {
      this.$emit('add-skill', this.localPkg.id)
    },
    deletePackage() {
      this.$emit('delete', this.localPkg.id)
    },
  },
}
</script>

<style scoped>
.package-editor {
  padding: 1rem;
}

.button-group {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.add-button {
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button {
  padding: 0.5rem 1rem;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
