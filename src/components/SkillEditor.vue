<template>
  <div class="skill-editor">
    <!-- Effect和Method两个编辑器也塞到这个div好了 -->
    <EffectEditor
      v-if="selectedType == 'effect'"
      :effect="selectEffect"
      @saveEffect="updateEffect"
      @edit-method="editMethod"
    />
    <MethodEditor v-else-if="selectedType == 'method'" :method="selectMethod" />
    <div v-else-if="selectedType == 'skill'">
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

      <button @click="showAddDialog">添加效果</button>

      <div class="effect-list">
        <div
          v-for="effect in this.localSkill.effects"
          :key="effect.name"
          class="effect-item"
          @click="editEffect(effect)"
        >
          {{ effect.name }}
        </div>
      </div>

      <AddEffectDialog v-if="showDialog" @close="showDialog = false" @create="createEffect" />

      <button @click="deleteSkill" class="delete-button">删除技能</button>
    </div>
  </div>
</template>

<script>
import AddEffectDialog from './AddEffectDialog.vue'
import { createNewEffect } from '../utils/models.js'
import EffectEditor from './EffectEditor.vue'
import MethodEditor from './MethodEditor.vue'

export default {
  components: {
    AddEffectDialog,
    EffectEditor,
    MethodEditor,
  },
  props: {
    skill: Object,
  },
  data() {
    return {
      localSkill: { ...this.skill },
      showDialog: false,
      selectedType: 'skill',
      selectEffect: null,
      selectMethod: null,
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
    showAddDialog() {
      this.showDialog = true
    },
    createEffect(effectData) {
      const newEffect = createNewEffect({
        type: 'targetmod',
        name: effectData.name,
        description: effectData.description,
      })
      this.localSkill.effects.push(newEffect)
    },
    editEffect(effect) {
      // console.log('editing:::', effect)
      // this.$router.push(`/effect/${effect.id}`)
      this.selectEffect = effect
      this.selectedType = 'effect'
    },
    updateEffect(effect) {
      const index = this.localSkill.effects.findIndex((e) => e.name === effect.name)
      if (index !== -1) {
        this.localSkill.effects[index] = effect
      }
      // 返回初始页
      this.selectedType = 'skill'
    },
    editMethod(method) {
      console.log('editing:::', method)
      // this.$router.push(`/effect/${effect.id}`)
      this.selectMethod = method
      this.selectedType = 'method'
    },
    updateEffect(effect) {
      const index = this.localSkill.effects.findIndex((e) => e.name === effect.name)
      if (index !== -1) {
        this.localSkill.effects[index] = effect
      }
      // 返回初始页
      this.selectedType = 'skill'
    },
    deleteSkill() {
      this.$emit('delete', this.localSkill.id)
    },
  },
}
</script>
