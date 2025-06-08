/* TODO 通用effect字段
  ---@class SkillSpec
  ---@field public name? string @ 技能名
  ---@field public mute? boolean @ 决定是否关闭技能配音
  ---@field public no_indicate? boolean @ 决定是否关闭技能指示线
  ---@field public anim_type? string|AnimationType @ 技能类型定义
  ---@field public global? boolean @ 决定是否是全局技能
*/

export const effectTypes = [
  {
    id: 'distance',
    name: '距离类',
    description: '用于影响角色之间计算距离',
    template: {
      methods: [
        {
          name: 'correct_func',
          description: '修改从from到to的距离计算值，返回一个数，正数表示增加距离计算，负数反之',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'TargetModSkill'
            },
            {
              name: 'from',
              message: '来源角色',
              type: 'Player'
            },
            {
              name: 'to',
              message: '目标角色',
              type: 'Player'
            },
          ],
          ret: 'number',
          blockData: null
        },
        {
          name: 'fixed_func',
          description: '将from到to的距离设为固定值，返回的数值即为新距离',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'TargetModSkill'
            },
            {
              name: 'from',
              message: '来源角色',
              type: 'Player'
            },
            {
              name: 'to',
              message: '目标角色',
              type: 'Player'
            },
          ],
          ret: 'number',
          blockData: null
        },
      ]
    }
  },
  {
    id: 'prohibit',
    name: '禁止类',
    description: '用于禁止某角色成为某卡牌目标、禁止使用打出弃置拼点',
    template: {
      methods: [
        {
          name: 'is_prohibited',
          description: '令from不能使用card指定to为目标',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ProhibitSkill'
            },
            {
              name: 'from',
              message: '来源角色',
              type: 'Player'
            },
            {
              name: 'to',
              message: '目标角色',
              type: 'Player'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            },
          ],
          ret: 'bool',
          blockData: null
        },
        {
          name: 'prohibit_use',
          description: '令player不能使用card',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ProhibitSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            },
          ],
          ret: 'bool',
          blockData: null
        },
        {
          name: 'prohibit_response',
          description: '令player不能打出card',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ProhibitSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            },
          ],
          ret: 'bool',
          blockData: null
        },
        {
          name: 'prohibit_discard',
          description: '令player不能弃置card',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ProhibitSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            },
          ],
          ret: 'bool',
          blockData: null
        },
        {
          name: 'prohibit_pindian',
          description: '令from不能对to拼点',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ProhibitSkill'
            },
            {
              name: 'from',
              message: '来源角色',
              type: 'Player'
            },
            {
              name: 'to',
              message: '目标角色',
              type: 'Player'
            },
          ],
          ret: 'bool',
          blockData: null
        },
      ],
    }
  },
  {
    id: 'atkrange',
    name: '攻击范围类',
    description: '用于影响某角色的攻击范围计算',
    template: {}
  },
  {
    id: 'maxcards',
    name: '手牌上限类',
    description: '用于影响某角色的手牌上限计算',
    template: {}
  },
  {
    id: 'targetmod',
    name: '卡牌增强类',
    description: '用于增强卡牌（无视距离次数限制等）',
    template: {}
  },
  {
    id: 'filter',
    name: '视为类',
    description: '用于将某牌视为另一牌名的牌（红颜、武神等）',
    template: {}
  },
  {
    id: 'invalidity',
    name: '失效类',
    description: '用于使某角色技能在某条件下失效',
    template: {}
  },
  {
    id: 'visibility',
    name: '可见类',
    description: '用于控制客户端是否应该可以观看到某牌（用于明牌）',
    template: {}
  },
  {
    id: 'active',
    name: '主动类',
    description: '用于创建主动型技能（制衡、苦肉等）',
    template: {}
  },
  {
    id: 'cardskill',
    name: '卡牌类',
    description: '与主动类类似，但是针对卡牌进行特化（卡牌的效果就是通过主动技实现的）',
    template: {}
  },
  {
    id: 'viewas',
    name: '转化类',
    description: '用于将一张牌当另一张牌使用打出（武圣、倾国等）',
    template: {}
  }
];

/**
 * 获取指定效果类型的模板
 * @param effectType
 * @returns 模板
 */
export const getTemplateByEffectType = (effectType) => {
  const effect = effectTypes.find((e) => e.id === effectType);
  if (!effect) {
    throw new Error(`Unknown effect type: ${effectType}`);
  }
  return effect.template;
};
