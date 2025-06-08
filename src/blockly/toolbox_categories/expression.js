export default {
  kind: 'category',
  name: '布尔相关',
  colour: '#EE2488',
  contents: [
    {
      type: 'logic_compare',
      kind: 'block',
      fields: {
        OP: 'EQ'
      }
    },
    {
      type: 'logic_operation',
      kind: 'block',
      fields: {
        OP: 'AND'
      }
    },
    {
      type: 'logic_negate',
      kind: 'block'
    },
    {
      type: 'logic_boolean',
      kind: 'block',
      fields: {
        BOOL: 'TRUE'
      }
    },
    {
      type: 'logic_null',
      kind: 'block',
      enabled: false
    },
    {
      type: 'logic_ternary',
      kind: 'block'
    }
  ]
};
