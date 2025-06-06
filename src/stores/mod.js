import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
  createNewGeneral,
  createNewMod,
  createNewPackage,
  createNewSkill
} from '@/utils/models.js';
import { loadModFromFile, saveModToFile } from '@/utils/fileHandler.js';
import { ElMessageBox } from 'element-plus';
import { exportToLua } from '@/utils/exporter.js';

export const useModStore = defineStore('mod', () => {
  // 当前项目
  const currentMod = ref(null);
  // 当前节点
  const currentNode = ref({
    type: '',
    value: null
  });

  const setCurrentMod = (mod) => {
    currentMod.value = mod;
  };

  const setCurrentNode = (node) => {
    currentNode.value = node;
  };

  // 创建mod
  const newMod = async () => {
    setCurrentMod(createNewMod());
    setCurrentNode({
      type: 'mod',
      value: currentMod.value
    });
  };

  // 加载mod
  const loadMod = async () => {
    try {
      const mod = await loadModFromFile();
      setCurrentMod(mod);
      setCurrentNode({
        type: 'mod',
        value: mod
      });
    } catch (error) {
      await ElMessageBox.alert('加载失败: ' + error.message);
    }
  };

  // 保存mod
  const saveMod = async () => {
    if (!currentMod.value) {
      await ElMessageBox.alert('没有可保存的工程，请先创建或加载工程。');
      return;
    }
    try {
      await saveModToFile(currentMod.value);
    } catch (error) {
      await ElMessageBox.alert('保存失败: ' + error.message);
    }
    await ElMessageBox.alert('保存成功!');
  };

  // 导出Lua
  const exportLua = async () => {
    try {
      await exportToLua(currentMod.value);
      await ElMessageBox.alert('导出成功!');
    } catch (error) {
      await ElMessageBox.alert('导出失败: ' + error.message);
    }
  };

  // 添加包
  const addPackage = () => {
    const newPkg = createNewPackage();
    currentNode.value.value.packages.push(newPkg);
  };

  // 添加武将
  const addGeneral = () => {
    const newGen = createNewGeneral();
    currentNode.value.value.generals.push(newGen);
  };

  // 添加技能
  const addSkill = () => {
    const newSkill = createNewSkill();
    currentNode.value.value.skills.push(newSkill);
  };

  // 删除包或武将
  const deletePackage = () => {
    const node = currentNode.value.value;
    if (node.generals.length > 0 || node.skills.length > 0) {
      ElMessageBox.confirm('删除包将会删除所有包含的武将和技能，是否继续？', '警告', {
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePackageInMod(node.id);
      });
    } else {
      deletePackageInMod(node.id);
    }
  };
  const deletePackageInMod = (packageId) => {
    currentMod.value.packages = currentMod.value.packages.filter((p) => p.id !== packageId);
    if (currentNode.value.value.id === packageId) {
      currentNode.value = {
        type: 'mod',
        value: currentMod.value
      };
    }
  };

  // 删除武将
  const deleteGeneral = () => {
    const node = currentNode.value.value;
    if (node.skills.length > 0) {
      ElMessageBox.confirm('删除武将将会删除所有包含的技能，是否继续？', '警告', {
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGeneralInMod(node.id);
      });
    } else {
      deleteGeneralInMod(node.id);
    }
  };

  const deleteGeneralInMod = (generalId) => {
    for (const pkg of currentMod.value.packages) {
      const index = pkg.generals.findIndex((g) => g.id === generalId);
      if (index !== -1) {
        pkg.generals.splice(index, 1);
        if (currentNode.value.value.id === generalId) {
          currentNode.value = {
            type: 'package',
            value: pkg
          };
        }
        break;
      }
    }
  };

  const deleteSkill = () => {
    const node = currentNode.value.value;
    deleteSkillInMod(node.id);
  };

  const deleteSkillInMod = (skillId) => {
    for (const pkg of currentMod.value.packages) {
      const index = pkg.skills.findIndex((g) => g.id === skillId);
      if (index !== -1) {
        pkg.skills.splice(index, 1);
        if (currentNode.value.value.id === skillId) {
          currentNode.value = {
            type: 'package',
            value: pkg
          };
        }
        break;
      }
    }
  };

  return {
    currentMod,
    currentNode,
    setCurrentNode,
    newMod,
    saveMod,
    loadMod,
    exportLua,
    addPackage,
    addGeneral,
    addSkill,
    deletePackage,
    deleteGeneral,
    deleteSkill
  };
});
