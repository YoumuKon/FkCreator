import * as Blockly from 'blockly';

Blockly.Blocks['card_property_read'] = {
  init: function () {
    this.appendValueInput('CARD').setCheck('Card').appendField('卡牌');

    this.appendDummyInput('PROPERTY_INPUT')
      .appendField('的')
      .appendField(
        new Blockly.FieldDropdown(
          [
            ['点数', 'number'],
            ['花色', 'suit'],
            ['名称', 'name']
          ],
          this.updateOutputType.bind(this)
        ),
        'PROPERTY'
      );

    this.setColour(230);
    this.setTooltip('获取卡牌的指定属性');
    this.setHelpUrl('');

    // 设置初始的输出类型（默认是 number）
    this.setOutput(true, 'Number');
  },

  /**
   * 根据 dropdown 选择更新输出类型
   */
  updateOutputType: function (newValue) {
    const typeMap = {
      number: 'Number',
      suit: 'String',
      name: 'String'
    };
    const outputType = typeMap[newValue] || null;
    this.setOutput(true, outputType);
  }
};

export default [];
