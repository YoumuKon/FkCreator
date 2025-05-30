export default [
  {
    "type": "card_property_read",
    "message0": "卡牌 %1 的 %2",
    "args0": [
      {
        "type": "input_value",
        "name": "CARD",
        "check": "Card"
      },
      {
        "type": "field_dropdown",
        "name": "PROPERTY",
        "options": [
          ["点数", "rank"],
          ["花色", "suit"],
          ["名称", "name"],
          ["值", "value"],
          ["是否王牌", "isJoker"]
        ]
      }
    ],
    "output": null,
    "colour": 230,
    "tooltip": "获取卡牌的指定属性",
    "helpUrl": ""
  },
]