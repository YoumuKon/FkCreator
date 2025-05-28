<template>
  <div class="app-container">
    <header class="app-header">
      <h1>拓展包制作器</h1>
      <div class="action-buttons">
        <button @click="newMod">新建工程</button>
        <button @click="loadMod">加载工程</button>
        <button @click="saveMod" :disabled="!currentMod">保存工程</button>
        <button @click="exportMod" :disabled="!currentMod">导出Lua包</button>
      </div>
    </header>

    <main class="app-main" v-if="currentMod">
      <TreeView :mod="currentMod" @select="handleSelect" class="tree-view" />

      <div class="editor-container">
        <ModEditor
          v-if="selectedType === 'mod'"
          :mod="currentMod"
          @update:mod="updateMod"
          @add-package="addPackage"
        />

        <PackageEditor
          v-else-if="selectedType === 'package'"
          :pkg="selectedItem"
          @update:pkg="updatePackage"
          @add-general="addGeneral"
          @add-skill="addSkill"
          @delete="deletePackage"
        />

        <GeneralEditor
          v-else-if="selectedType === 'general'"
          :general="selectedItem"
          @update:general="updateGeneral"
          @delete="deleteGeneral"
        />

        <SkillEditor
          v-else-if="selectedType === 'skill'"
          :skill="selectedItem"
          @update:skill="updateSkill"
          @delete="deleteSkill"
        />
      </div>
    </main>

    <div v-else class="welcome-screen">
      <h2>欢迎使用拓展包制作器</h2>
      <button @click="newMod">新建工程</button>
      <button @click="loadMod">加载工程</button>
    </div>
  </div>
</template>

<script>
import { createNewMod, createNewPackage, createNewGeneral, createNewSkill } from './utils/models'
import TreeView from './components/TreeView.vue'
import ModEditor from './components/ModEditor.vue'
import PackageEditor from './components/PackageEditor.vue'
import GeneralEditor from './components/GeneralEditor.vue'
import SkillEditor from './components/SkillEditor.vue'
import { saveModToFile, loadModFromFile } from './utils/fileHandler'
import { exportToLua } from './utils/exporter'

export default {
  components: {
    TreeView,
    ModEditor,
    PackageEditor,
    GeneralEditor,
    SkillEditor,
  },
  data() {
    return {
      currentMod: null,
      selectedType: null,
      selectedItem: null,
    }
  },
  methods: {
    newMod() {
      this.currentMod = createNewMod()
      this.selectedType = 'mod'
      this.selectedItem = this.currentMod
    },
    async loadMod() {
      try {
        const mod = await loadModFromFile()
        this.currentMod = mod
        this.selectedType = 'mod'
        this.selectedItem = mod
      } catch (error) {
        alert('加载失败: ' + error.message)
      }
    },
    async saveMod() {
      try {
        await saveModToFile(this.currentMod)
        alert('保存成功!')
      } catch (error) {
        alert('保存失败: ' + error.message)
      }
    },
    async exportMod() {
      try {
        await exportToLua(this.currentMod)
        alert('导出成功!')
      } catch (error) {
        alert('导出失败: ' + error.message)
      }
    },
    handleSelect({ type, item }) {
      this.selectedType = type
      this.selectedItem = item
    },
    updateMod(updatedMod) {
      this.currentMod = updatedMod
    },
    addPackage() {
      const newPkg = createNewPackage()
      this.currentMod.packages.push(newPkg)
    },
    updatePackage(updatedPkg) {
      const index = this.currentMod.packages.findIndex((p) => p.id === updatedPkg.id)
      if (index !== -1) {
        this.currentMod.packages[index] = updatedPkg
      }
    },
    deletePackage(pkgId) {
      this.currentMod.packages = this.currentMod.packages.filter((p) => p.id !== pkgId)
      this.selectedType = 'mod'
      this.selectedItem = this.currentMod
    },
    addGeneral(pkgId) {
      const pkg = this.currentMod.packages.find((p) => p.id === pkgId)
      if (pkg) {
        const newGeneral = createNewGeneral()
        pkg.generals.push(newGeneral)
      }
    },
    updateGeneral(updatedGeneral) {
      for (const pkg of this.currentMod.packages) {
        const index = pkg.generals.findIndex((g) => g.id === updatedGeneral.id)
        if (index !== -1) {
          pkg.generals[index] = updatedGeneral
          break
        }
      }
    },
    deleteGeneral(generalId) {
      for (const pkg of this.currentMod.packages) {
        const index = pkg.generals.findIndex((g) => g.id === generalId)
        if (index !== -1) {
          pkg.generals.splice(index, 1)
          this.selectedType = 'package'
          this.selectedItem = pkg
          break
        }
      }
    },
    addSkill(pkgId) {
      const pkg = this.currentMod.packages.find((p) => p.id === pkgId)
      if (pkg) {
        const newSkill = createNewSkill()
        pkg.skills.push(newSkill)
      }
    },
    updateSkill(updatedSkill) {
      for (const pkg of this.currentMod.packages) {
        const index = pkg.skills.findIndex((s) => s.id === updatedSkill.id)
        if (index !== -1) {
          pkg.skills[index] = updatedSkill
          break
        }
      }
    },
    deleteSkill(skillId) {
      for (const pkg of this.currentMod.packages) {
        const index = pkg.skills.findIndex((s) => s.id === skillId)
        if (index !== -1) {
          pkg.skills.splice(index, 1)
          this.selectedType = 'package'
          this.selectedItem = pkg
          break
        }
      }
    },
  },
}
</script>

<style>
/* 基础样式 */
.app-container {
  display: flex;
  flex-direction: column;
  /* height: 100vh; */
}

.app-header {
  padding: 1rem;
  height: 60px;
  background: #2c3e50;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-main {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.tree-view {
  width: 250px;
  border-right: 1px solid #ddd;
  overflow-y: auto;
}

.editor-container {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.welcome-screen {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.action-buttons button {
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.action-buttons button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
