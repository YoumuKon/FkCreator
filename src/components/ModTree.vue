<template>
  <div class="tree-title">拓展包结构树</div>
  <ul class="tree">
    <li v-if="props.mod">
      <div
        class="tree-node"
        :class="{ selected: selectedId === props.mod.id }"
        @click="select('mod', props.mod)"
      >
        <span class="tree-icon">
          <Folder></Folder>
        </span>
        <span class="tree-label">{{ props.mod.name }}</span>
      </div>
      <ul v-if="mod.packages.length" class="subtree">
        <li v-for="pkg in mod.packages" :key="pkg.id">
          <div
            class="tree-node"
            :class="{ selected: selectedId === pkg.id }"
            @click="select('package', pkg)"
          >
            <span class="tree-icon">
              <Package></Package>
            </span>
            <span class="tree-label"> {{ pkg.name }}</span>
          </div>
          <ul v-if="pkg.generals.length || pkg.skills.length" class="subtree">
            <li v-for="general in pkg.generals" :key="general.id">
              <div
                class="tree-node"
                :class="{ selected: selectedId === general.id }"
                @click="select('general', general)"
              >
                <span class="tree-icon">
                  <Legend></Legend>
                </span>
                <span class="tree-label">{{ general.name }}</span>
              </div>
            </li>

            <li v-for="skill in pkg.skills" :key="skill.id">
              <div
                class="tree-node"
                :class="{ selected: selectedId === skill.id }"
                @click="select('skill', skill)"
              >
                <span class="tree-icon">
                  <Skill></Skill>
                </span>
                <span class="tree-label"> {{ skill.name }}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import Folder from '@/components/icons/Folder.vue';
import Package from '@/components/icons/Package.vue';
import Legend from '@/components/icons/Legend.vue';
import Skill from '@/components/icons/Skill.vue';
import { useModStore } from '@/stores/mod.js';

const props = defineProps({
  mod: {
    type: Object,
    required: true
  }
});
const emit = defineEmits(['select']);
const selectedId = ref(null);
const select = (type, item) => {
  selectedId.value = item.id;
  emit('select', { type, item });
};
const modStore = useModStore();
watchEffect(() => {
  if (modStore.currentNode) {
    selectedId.value = modStore.currentNode.value.id;
  }
});
</script>

<style>
.tree-title {
  font-size: 18px;
  height: 50px;
  border-bottom: 1px solid #ccc;
  background: #F2F2F2;
  display: flex;
  align-items: center;
  padding-left: 10px;
  user-select: none;
}

ul {
  list-style: none;
  margin: 0;
  padding-left: 0;
}

.subtree {
  padding-left: 1rem;
}

.tree-node {
  padding: 6px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  gap: 0.5rem;
  transition: background-color 0.25s;
  user-select: none;
}

.tree-node:hover {
  background: #f0f0f0;
}

.tree-node.selected {
  background: #e0e0e0;
  font-weight: bold;
}

.tree-icon {
  width: 1.1em;
  height: 1.1em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tree-node svg {
  width: 100%;
  height: 100%;
}

.tree-node .tree-label {
  flex-grow: 1;
  font-size: 0.9rem;
  color: var(--el-text-color-primary);
}
</style>
