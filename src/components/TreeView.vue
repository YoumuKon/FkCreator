<template>
  <div class="tree-view">
    <ul class="tree">
      <li v-if="mod">
        <div
          class="tree-node"
          :class="{ selected: selectedId === mod.id }"
          @click="select('mod', mod)"
        >
          <span class="tree-icon">📁</span>
          {{ mod.name }}
        </div>

        <ul v-if="mod.packages.length" class="subtree">
          <li v-for="pkg in mod.packages" :key="pkg.id">
            <div
              class="tree-node"
              :class="{ selected: selectedId === pkg.id }"
              @click="select('package', pkg)"
            >
              <span class="tree-icon">📦</span>
              {{ pkg.name }}
            </div>

            <ul v-if="pkg.generals.length || pkg.skills.length" class="subtree">
              <li v-for="general in pkg.generals" :key="general.id">
                <div
                  class="tree-node"
                  :class="{ selected: selectedId === general.id }"
                  @click="select('general', general)"
                >
                  <span class="tree-icon">👤</span>
                  {{ general.name }}
                </div>
              </li>

              <li v-for="skill in pkg.skills" :key="skill.id">
                <div
                  class="tree-node"
                  :class="{ selected: selectedId === skill.id }"
                  @click="select('skill', skill)"
                >
                  <span class="tree-icon">✨</span>
                  {{ skill.name }}
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    mod: Object,
  },
  data() {
    return {
      selectedId: null,
    }
  },
  methods: {
    select(type, item) {
      this.selectedId = item.id
      this.$emit('select', { type, item })
    },
  },
}
</script>

<style>
.tree {
  list-style: none;
  padding-left: 1rem;
}

.subtree {
  padding-left: 1.5rem;
}

.tree-node {
  padding: 0rem;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
}

.tree-node:hover {
  background: #f0f0f0;
}

.tree-node.selected {
  background: #e0e0e0;
  font-weight: bold;
}

.tree-icon {
  margin-right: 0.5rem;
}
</style>
