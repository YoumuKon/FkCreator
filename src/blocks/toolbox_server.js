import tb_flow from "./tb_flow"
import tb_expression from "./tb_expression"
import tb_math from "./tb_math"
import tb_text from "./tb_text"
import tb_list from "./tb_list"

import tb_card from "./tb_card"
import tb_gameflow_hp from "./tb_gameflow_hp"

export default {
  kind: "categoryToolbox",
  contents: [
    tb_flow,
    tb_expression,
    tb_math,
    tb_text,
    tb_list,
    { kind: 'sep' },
    {
      kind: 'category',
      name: '自定义变量',
      custom: 'VARIABLE',
      categorystyle: 'variable_category',
    },
    {
      kind: 'category',
      name: '自定义函数',
      custom: 'PROCEDURE',
      categorystyle: 'procedure_category',
    },
    { kind: 'sep' },
    tb_card,
    { kind: 'sep' },
    tb_gameflow_hp
  ]
}