<template>
  <div class="skill-editor">
    <h2>技能设置</h2>
    <div class="lr-container">
      <div class="form-group">
        <label>技能名称</label>
        <input v-model="localSkill.name" type="text" />
      </div>

      <div class="form-group">
        <label>内部名称</label>
        <input v-model="localSkill.internal_name" type="text" />
      </div>
    </div>

    <div class="form-group">
      <label>技能描述</label>
      <textarea v-model="localSkill.description"></textarea>
    </div>

    <button @click="deleteSkill" class="delete-button">删除技能</button>
  </div>
</template>

<script>
export default {
  props: {
    skill: Object,
  },
  data() {
    return {
      localSkill: { ...this.skill },
    }
  },
  watch: {
    localSkill: {
      deep: true,
      handler(newVal) {
        this.$emit('update:skill', newVal)
      },
    },
    skill(newVal) {
      this.localSkill = { ...newVal }
    },
  },
  methods: {
    deleteSkill() {
      this.$emit('delete', this.localSkill.id)
    },
  },
}
</script>
