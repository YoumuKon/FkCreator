export default {
  kind: 'category',
  name: '生成结算-体力值相关',
  colour: 'green',
  contents: [
    {
      type: 'deal_damage',
      kind: 'block',
      inputs: {
        AMOUNT: {
          shadow: {
            type: 'math_number',
            fields: {
              NUM: 1
            }
          }
        }
      }
    },
    {
      type: 'lose_hp',
      kind: 'block',
      inputs: {
        AMOUNT: {
          shadow: {
            type: 'math_number',
            fields: {
              NUM: 1
            }
          }
        }
      }
    },
    {
      type: 'recover_hp',
      kind: 'block',
      inputs: {
        AMOUNT: {
          shadow: {
            type: 'math_number',
            fields: {
              NUM: 1
            }
          }
        }
      }
    },
    {
      type: 'change_maxhp',
      kind: 'block',
      inputs: {
        AMOUNT: {
          shadow: {
            type: 'math_number',
            fields: {
              NUM: 1
            }
          }
        }
      }
    }
  ]
};
