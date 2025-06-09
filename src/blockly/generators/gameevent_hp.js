import { luaGenerator, Order } from 'blockly/lua';

export default () => {
  luaGenerator.forBlock['deal_damage'] = function (block, generator) {
    const target = generator.valueToCode(block, 'TARGET', Order.ATOMIC) || 'nil';
    // TODO if is nil, error (must have target)
    const amount = generator.valueToCode(block, 'AMOUNT', Order.ATOMIC);
    let code = `room:damage {\n  to = ${target},\n  damage = ${amount},\n`;

    // 因为是可选input 需要写判断
    if (block.getInput('SOURCE')) {
      const source = generator.valueToCode(block, 'SOURCE', Order.ATOMIC) || 'nil';
      code += `  from = ${source},\n`;
    }
    if (block.getInput('DAMAGE_TYPE')) {
      const dmgtype = generator.valueToCode(block, 'DAMAGE_TYPE', Order.ATOMIC) || 1;
      // TODO Damage.Fire
      code += `  nature = ${dmgtype},\n`;
    }

    code += '}\n';
    return code;
  };
  luaGenerator.forBlock['lose_hp'] = function (block, generator) {
    return 'local room = Fk:currentRoom()\n';
  };
  luaGenerator.forBlock['recover_hp'] = function (block, generator) {
    return 'local room = Fk:currentRoom()\n';
  };
};
