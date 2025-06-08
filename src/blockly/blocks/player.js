export default [
  {
    type: 'player_property_read',
    message0: '角色 %1 的 %2',
    args0: [
      {
        type: 'input_value',
        name: 'CARD',
        check: 'Player'
      },
      {
        type: 'field_dropdown',
        name: 'PROPERTY',
        options: [
          ['体力', 'hp'],
          ['体力上限', 'maxHp'],
        ]
      }
    ],
    output: null,
    colour: 230,
    tooltip: '获取角色的指定属性',
    helpUrl: ''
  },
];
