<template>
  <div class="mod-editor">
    <h2>Mod设置</h2>

    <div class="lr-container">
      <div class="form-group">
        <label>名称</label>
        <input v-model="localMod.name" type="text" />
      </div>

      <div class="form-group">
        <label>内部名称</label>
        <input v-model="localMod.internal_name" type="text" />
      </div>
    </div>

    <div class="form-group">
      <label>作者</label>
      <input v-model="localMod.author" type="text" />
    </div>

    <div class="form-group">
      <label>版本</label>
      <input v-model="localMod.version" type="text" />
    </div>

    <div class="form-group">
      <label>描述</label>
      <textarea v-model="localMod.description"></textarea>
    </div>

    <button @click="addPackage" class="add-button">添加包</button>
  </div>
</template>

<script>
export default {
  props: {
    mod: Object,
  },
  data() {
    return {
      localMod: { ...this.mod },
    }
  },
  watch: {
    localMod: {
      deep: true,
      handler(newVal) {
        this.$emit('update:mod', newVal)
      },
    },
    mod(newVal) {
      this.localMod = { ...newVal }
    },
  },
  methods: {
    addPackage() {
      this.$emit('add-package')
    },
  },
}
</script>

<style>
.mod-editor {
  padding: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  min-height: 100px;
}

.add-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
