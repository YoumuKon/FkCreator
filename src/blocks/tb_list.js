export default {
  kind: 'category',
  name: '列表相关',
  categorystyle: 'list_category',
  contents: [
    {
      type: 'lists_create_with',
      kind: 'block',
    },
    {
      type: 'lists_create_with',
      kind: 'block',
    },
    {
      type: 'lists_repeat',
      kind: 'block',
      inputs: {
        NUM: {
          shadow: {
            type: 'math_number',
            fields: {
              NUM: 5,
            },
          },
        },
      },
    },
    {
      type: 'lists_length',
      kind: 'block',
    },
    {
      type: 'lists_isEmpty',
      kind: 'block',
    },
    {
      type: 'lists_indexOf',
      kind: 'block',

      fields: {
        END: 'FIRST',
      },
      inputs: {
        VALUE: {
          block: {
            type: 'variables_get',
            fields: {
              VAR: {
                name: 'list',
              },
            },
          },
        },
      },
    },
    {
      type: 'lists_getIndex',
      kind: 'block',
      fields: {
        MODE: 'GET',
        WHERE: 'FROM_START',
      },
      inputs: {
        VALUE: {
          block: {
            type: 'variables_get',
            fields: {
              VAR: {
                name: 'list',
              },
            },
          },
        },
      },
    },
    {
      type: 'lists_setIndex',
      kind: 'block',
      fields: {
        MODE: 'SET',
        WHERE: 'FROM_START',
      },
      inputs: {
        LIST: {
          block: {
            type: 'variables_get',
            fields: {
              VAR: {
                name: 'list',
              },
            },
          },
        },
      },
    },
    {
      type: 'lists_getSublist',
      kind: 'block',
      fields: {
        WHERE1: 'FROM_START',
        WHERE2: 'FROM_START',
      },
      inputs: {
        LIST: {
          block: {
            type: 'variables_get',
            fields: {
              VAR: {
                name: 'list',
              },
            },
          },
        },
      },
    },
    {
      type: 'lists_split',
      kind: 'block',

      fields: {
        MODE: 'SPLIT',
      },
      inputs: {
        DELIM: {
          shadow: {
            type: 'text',
            fields: {
              TEXT: ',',
            },
          },
        },
      },
    },
    {
      type: 'lists_sort',
      kind: 'block',

      fields: {
        TYPE: 'NUMERIC',
        DIRECTION: '1',
      },
    },
    {
      type: 'lists_reverse',
      kind: 'block',
    },
  ],
}