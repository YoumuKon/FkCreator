import * as Blockly from 'blockly'
import { createConfigurableBlock } from './factory';

const damageBlocks = createConfigurableBlock({
  type: "deal_damage",
  message: "对角色造成伤害\n伤害目标%1 伤害值%2",
  args: [
    { type: "input_value", name: "TARGET", check: "Player" },
    { type: "input_value", name: "AMOUNT", check: "Number" }
  ],
  colour: 230,
  tooltip: "造成伤害",
  optionalFields: [
    {
      name: "SOURCE", message: "伤害来源", inputType: "input_value", check: "Player"
    },
    { name: "DAMAGE_TYPE", message: "伤害属性", inputType: "dummy_input_dropdown" }
  ],
  dropdowns: {
    DAMAGE_TYPE: [
      ["普", "normal"],
      ["火", "fire"],
      ["雷", "thunder"],
      ["冰", "ice"]
    ]
  }
});

export default [
  ...damageBlocks,
];
