<script setup>
import { storeToRefs } from 'pinia';
import { useModStore } from '@/stores/mod.js';
import ModTree from '@/components/ModTree.vue';
import ModEditor from '@/components/ModEditor.vue';
import PackageEditor from '@/components/PackageEditor.vue';
import GeneralEditor from '@/components/GeneralEditor.vue';
import SkillEditor from '@/components/SkillEditor.vue';

const modStore = useModStore();
const { currentMod, currentNode } = storeToRefs(modStore);
const selectNode = (node) => {
  modStore.setCurrentNode({
    type: node.type,
    value: node.item
  });
};

const getLabel = (type) => {
  switch (type) {
    case 'mod':
      return 'Mod配置';
    case 'package':
      return '包配置';
    case 'general':
      return '武将配置';
    case 'skill':
      return '技能配置';
    default:
      return '';
  }
};

const getKey = (type, currentNode) => {
  return type + ':' + currentNode.id;
};
</script>

<template>
  <div class="container">
    <template v-if="!currentMod">
      <div class="welcome-screen">
        <h2>欢迎使用拓展包制作器！</h2>
        <p>请先创建或加载一个工程。</p>
        <el-button-group>
          <el-button type="primary" size="large" @click="modStore.newMod()">新建工程</el-button>
          <el-button type="primary" size="large" @click="modStore.loadMod()">加载工程</el-button>
        </el-button-group>
      </div>
    </template>
    <template v-else>
      <div class="container-tree">
        <ModTree :mod="currentMod" @select="(node) => selectNode(node)"></ModTree>
      </div>
      <div class="container-content">
        <div class="content-title">
          <div class="content-label">
            {{ getLabel(currentNode.type) }}
          </div>
          <div class="button-group">
            <template v-if="currentNode.type === 'mod'">
              <el-button
                v-if="currentNode.type === 'mod'"
                type="primary"
                @click="modStore.addPackage()"
                >添加包
              </el-button>
            </template>
            <template v-else-if="currentNode.type === 'package'">
              <el-button type="primary" @click="modStore.addGeneral()">添加武将</el-button>
              <el-button type="primary" @click="modStore.addSkill()">添加技能</el-button>
              <el-button type="danger" @click="modStore.deletePackage()">删除包</el-button>
            </template>
            <template v-else-if="currentNode.type === 'general'">
              <el-button type="danger" @click="modStore.deleteGeneral()">删除武将</el-button>
            </template>
            <template v-else-if="currentNode.type === 'skill'">
              <el-button type="danger" @click="modStore.deleteSkill()">删除技能</el-button>
            </template>
            <el-button type="success" @click="modStore.saveMod()">保存工程</el-button>
          </div>
        </div>
        <div class="content">
          <ModEditor
            v-if="currentNode.type === 'mod'"
            :key="getKey('mod', currentNode.value)"
            v-model="currentNode.value"
          />
          <PackageEditor
            v-else-if="currentNode.type === 'package'"
            :key="getKey('package', currentNode.value)"
            v-model="currentNode.value"
          />
          <GeneralEditor
            v-else-if="currentNode.type === 'general'"
            :key="getKey('general', currentNode.value)"
            v-model="currentNode.value"
          />
          <SkillEditor
            v-else-if="currentNode.type === 'skill'"
            :key="getKey('skill', currentNode.value)"
            v-model="currentNode.value"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.welcome-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.container {
  display: flex;
  height: calc(100% - var(--el-menu-horizontal-height));
}

.container-tree {
  width: 16%;
  min-width: 200px;
  border-right: 1px solid #aaa;
  overflow-y: hidden;
}

.container-content {
  flex: 1;
  overflow-y: hidden;
}

.content-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  height: 50px;
  border-bottom: 1px solid #ccc;
  background: #F2F2F2;
  user-select: none;
  padding: 0 1em;
}

.content-label {
  font-size: 1.2rem;
  font-weight: bold;
}

.content {
  padding: 1em;
  background: #fff;
  overflow-y: auto;
  height: calc(100% - 80px);
}
</style>
