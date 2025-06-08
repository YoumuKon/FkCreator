<template>
  <div class="method-editor">
    <h3>编辑方法: {{ method.name }}</h3>

    <div class="blockly-container">
      <div ref="blocklyDiv" style="height: 500px; width: 100%"></div>
    </div>

    <button @click="saveMethod">保存方法</button>
    <button @click="resetToDefault">重置为默认</button>
  </div>
</template>

<script>
import * as Blockly from 'blockly';
import * as Zh from 'blockly/msg/zh-hans';
import basic_blocks from '../blockly/blocks/basic.js';
import card_blocks from '../blockly/blocks/card.js';
import blocks_gameflow_hp from '@/blockly/blocks/gameevent_hp.js';
import { toRaw } from 'vue';

import toolbox_server from '@/blockly/toolboxes/toolbox_server.js';

Blockly.defineBlocksWithJsonArray(basic_blocks);
Blockly.defineBlocksWithJsonArray(card_blocks);
Blockly.defineBlocksWithJsonArray(blocks_gameflow_hp);
Blockly.setLocale(Zh);

export default {
  props: {
    method: null
  },
  data() {
    return {
      localMethod: { ...this.method },
      /**
       * @type {Blockly.WorkspaceSvg}
       */
      workspace: null,
      effect: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initBlockly();
    });
  },
  beforeUnmount() {
    const workspace = toRaw(this.workspace);
    if (workspace) {
      workspace.dispose();
    }
  },
  methods: {
    initBlockly() {
      // 初始化工作区
      const workspace = Blockly.inject(this.$refs.blocklyDiv, {
        toolbox: toolbox_server,
        scrollbars: true,
        trashcan: true,
        collapse: true,
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
          pinch: true
        }
      });

      this.workspace = workspace;

      // 加载已有块
      workspace.addChangeListener(this.onBlocklyChange);

      if (this.localMethod.blocksJson) {
        Blockly.serialization.workspaces.load(this.localMethod.blocksJson);
      } else {
        this.addDefaultStartBlock();
      }
    },
    addDefaultStartBlock() {
      const workspace = toRaw(this.workspace);
      const startBlock = workspace.newBlock('function_start');
      startBlock.initSvg();
      startBlock.render();
      startBlock.setDeletable(false);
      startBlock.moveBy(30, 30);
    },
    onBlocklyChange(event) {
      // 确保function_start块不能被删除
      const workspace = toRaw(this.workspace);
      if (event.type === Blockly.Events.BLOCK_DELETE) {
        const block = workspace.getBlockById(event.blockId);
        if (block && block.type === 'function_start') {
          Blockly.Events.disable();
          this.addDefaultStartBlock();
          Blockly.Events.enable();
        }
      }
    },
    saveMethod() {
      const workspace = toRaw(this.workspace);
      this.localMethod.blocksJson = Blockly.serialization.workspaces.save(workspace);
    },
    findStartBlock() {
      const workspace = toRaw(this.workspace);
      return Array.from(workspace.getAllBlocks()).find((block) => block.type === 'function_start');
    },
    getConnectedBlocks(startBlock) {
      const blocks = [startBlock];
      let current = startBlock.getNextBlock();

      while (current) {
        blocks.push(current);
        current = current.getNextBlock();
      }

      return blocks;
    },
    getBlockFields(block) {
      // 获取块的所有字段值
    },
    resetToDefault() {
      this.localMethod.blocksJson = null;
      this.localMethod.isDefault = true;
      const workspace = toRaw(this.workspace);
      workspace.clear();
      this.addDefaultStartBlock();
    }
  }
};
</script>
