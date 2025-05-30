// 基础Mod结构
export const createNewMod = () => ({
  id: `mod_${Date.now()}`,
  name: `mod_${Date.now()}`,
  internal_name: '',
  author: '',
  version: '1.0.0',
  description: '这是一个刚新建的拓展，将相关数据改成你需要的。',
  packages: []
});

// 基础Package结构
export const createNewPackage = () => ({
  id: `pkg_${Date.now()}`,
  name: `pkg_${Date.now()}`,
  internal_name: '',
  description: '这是一个刚新建的包，将相关数据改成你需要的。',
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

  skills: [],
});

// 基础Skill结构
export const createNewSkill = () => ({
  id: `skill_${Date.now()}`,
  name: `skill_${Date.now()}`,
  internal_name: '',
  description: '这是一个刚新建的技能，将相关数据改成你需要的。',

  effects: [],
});

/**
 * @typedef {Object} SkillEffectProp
 * @property {string} type - 类别
 * @property {string} name - 名字，仅用于界面
 * @property {string} description - 描述，仅用于注释
 */

const effectTemplates = {
  'trigger': {},
  'active': {},
  'viewas': {},
  'targetmod': {
    type: 'targetmod',
    name: '',
    description: '',
    properties: [],
    methods: [
      {
        name: 'residue_func',
        description: '用于修改某卡牌的使用次数',
        type: 'client',
        params: [
          {
            name: "self",
            type: "TargetModSkill",
          },
          // ...
        ],
        ret: "number",
        blockData: null,
      },
      // ...
    ],
  },
}

/**
 * @param {SkillEffectProp} effectData 
 */
export const createNewEffect = (effectData) => {
  let ret = { ...effectTemplates[effectData.type] };
  ret.name = effectData.name;
  ret.description = effectData.description;
  return ret;
};