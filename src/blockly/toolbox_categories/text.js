export default {
  kind: 'category',
  name: '字符串相关',
  categorystyle: 'text_category',
  contents: [
    {
      type: 'text',
      kind: 'block',
      fields: {
        TEXT: ''
      }
    },
    {
      type: 'text_join',
      kind: 'block'
    },
    {
      type: 'text_append',
      kind: 'block',
      fields: {
        name: 'item'
      },
      inputs: {
        TEXT: {
          shadow: {
            type: 'text',
            fields: {
              TEXT: ''
            }
          }
        }
      }
    },
    {
      type: 'text_length',
      kind: 'block',
      inputs: {
        VALUE: {
          shadow: {
            type: 'text',
            fields: {
              TEXT: 'abc'
            }
          }
        }
      }
    },
    {
      type: 'text_isEmpty',
      kind: 'block',
      inputs: {
        VALUE: {
          shadow: {
            type: 'text',
            fields: {
              TEXT: ''
            }
          }
        }
      }
    },
    {
      type: 'text_indexOf',
      kind: 'block',
      fields: {
        END: 'FIRST'
      },
      inputs: {
        VALUE: {
          block: {
            type: 'variables_get',
            fields: {
              VAR: {
                name: 'text'
              }
            }
          }
        },
        FIND: {
          shadow: {
            type: 'text',
            fields: {
              TEXT: 'abc'
            }
          }
        }
      }
    },
    {
      type: 'text_charAt',
      kind: 'block',
      fields: {
        WHERE: 'FROM_START'
      },
      inputs: {
        VALUE: {
          block: {
            type: 'variables_get',
            fields: {
              VAR: {
                name: 'text'
              }
            }
          }
        }
      }
    },
    {
      type: 'text_getSubstring',
      kind: 'block',
      fields: {
        WHERE1: 'FROM_START',
        WHERE2: 'FROM_START'
      },
      inputs: {
        STRING: {
          block: {
            type: 'variables_get',
            fields: {
              VAR: {
                name: 'text'
              }
            }
          }
        }
      }
    },
    {
      type: 'text_changeCase',
      kind: 'block',
      fields: {
        CASE: 'UPPERCASE'
      },
      inputs: {
        TEXT: {
          shadow: {
            type: 'text',
            fields: {
              TEXT: 'abc'
            }
          }
        }
      }
    },
    {
      type: 'text_trim',
      kind: 'block',
      fields: {
        MODE: 'BOTH'
      },
      inputs: {
        TEXT: {
          shadow: {
            type: 'text',
            fields: {
              TEXT: 'abc'
            }
          }
        }
      }
    },
    {
      type: 'text_count',
      kind: 'block',
      inputs: {
        SUB: {
          shadow: {
            type: 'text',
            fields: {
              TEXT: ''
            }
          }
        },
        TEXT: {
          shadow: {
            type: 'text',
            fields: {
              TEXT: ''
            }
          }
        }
      }
    },
    {
      type: 'text_replace',
      kind: 'block',
      inputs: {
        FROM: {
          shadow: {
            type: 'text',
            fields: {
              TEXT: ''
            }
          }
        },
        TO: {
          shadow: {
            type: 'text',
            fields: {
              TEXT: ''
            }
          }
        },
        TEXT: {
          shadow: {
            type: 'text',
            fields: {
              TEXT: ''
            }
          }
        }
      }
    },
    {
      type: 'text_reverse',
      kind: 'block',
      inputs: {
        TEXT: {
          shadow: {
            type: 'text',
            fields: {
              TEXT: ''
            }
          }
        }
      }
    },

    {
      type: 'text_print',
      kind: 'block',
      inputs: {
        TEXT: {
          shadow: {
            type: 'text',
            fields: {
              TEXT: 'abc'
            }
          }
        }
      }
    },
    {
      type: 'text_prompt_ext',
      kind: 'block',
      fields: {
        TYPE: 'TEXT'
      },
      inputs: {
        TEXT: {
          shadow: {
            type: 'text',
            fields: {
              TEXT: 'abc'
            }
          }
        }
      }
    }
  ]
};
