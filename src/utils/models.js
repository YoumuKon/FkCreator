// 基础Mod结构
export const createNewMod = () => ({
  id: `mod_${Date.now()}`,
  name: `mod_${Date.now()}`,
  internal_name: '',
  author: '',
  version: '1.0.0',
  description: '',
  packages: []
});

// 基础Package结构
export const createNewPackage = () => ({
  id: `pkg_${Date.now()}`,
  name: `pkg_${Date.now()}`,
  internal_name: '',
  description: '',
  generals: [],
  skills: []
});

// 基础General结构
export const createNewGeneral = () => ({
  id: `gen_${Date.now()}`,
  name: `gen_${Date.now()}`,
  internal_name: '',

  hp: 4,
  maxHp: 4,

  skills: []
});

// 基础Skill结构
export const createNewSkill = () => ({
  id: `skill_${Date.now()}`,
  name: `skill_${Date.now()}`,
  internal_name: '',
  description: '',
  effects: []
});

/**
 * 创建一个新的效果对象
 */
export const createNewEffect = (effectData) => {
  const ret = {};
  ret.name = effectData.name;
  ret.description = effectData.description;
  return ret;
};
