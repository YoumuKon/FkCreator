<template>
  <div class="effect-editor">
    <h2>{{ effect.name }}</h2>

    <div class="method-list">
      <div
        v-for="(method, name) in effect.methods"
        :key="name"
        class="method-item"
        @click="this.$emit('edit-method', method)"
      >
        <span>{{ method.name }}</span>
        <span v-if="!method?.isDefault">(自定义)</span>
      </div>
    </div>

    <button @click="saveEffect">保存效果</button>
  </div>
</template>

<script>
export default {
  props: {
    effect: null
  },
  data() {
    return {
      localEffect: { ...this.effect }
    };
  },
  methods: {
    saveEffect() {
      // 更新原始效果
      // const index = this.$parent.effects.findIndex((e) => e.id === this.effect.id)
      // this.$parent.effects.splice(index, 1, this.effect)
      // this.$parent.saveEffects()
      // this.$router.go(-1)
      this.$emit('saveEffect', this.localEffect);
    }
  }
};
</script>
