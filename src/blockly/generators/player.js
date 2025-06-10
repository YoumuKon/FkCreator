import { luaGenerator, Order } from 'blockly/lua';

export default () => {
  luaGenerator.forBlock['player_property_read'] = function (block, generator) {
    const player = generator.valueToCode(block, 'PLAYER', Order.ATOMIC) || 'nil';
    const property = generator.getVariableName(block.getFieldValue('PROPERTY')) || 'nil';

    if (player == 'nil' || property == 'nil') {
      throw new Error("生成失败！必须指定一名角色和一个属性字段。");
    }

    return [`${player}.${property}`, Order.ATOMIC];
  };

  luaGenerator.forBlock['player_property_read_by_fn'] = function (block, generator) {
    const player = generator.valueToCode(block, 'PLAYER', Order.ATOMIC) || 'nil';
    const property = generator.getVariableName(block.getFieldValue('PROPERTY')) || 'nil';

    if (player == 'nil' || property == 'nil') {
      throw new Error("生成失败！必须指定一名角色和一个属性字段。");
    }

    return [`${player}:${property}()`, Order.ATOMIC];
  };

  luaGenerator.forBlock['player_get_mark'] = function (block, generator) {
    const player = generator.valueToCode(block, 'PLAYER', Order.ATOMIC) || 'nil';
    const mark = generator.valueToCode(block, 'MARK', Order.ATOMIC) || 'nil';

    if (player == 'nil' || mark == 'nil') {
      throw new Error("生成失败！必须指定角色和标记名。");
    }

    return [`${player}:getMark(${mark})`, Order.ATOMIC];
  };
};
