<template>
  <div class="method-editor">
    <h3>编辑方法: {{ method.name }}</h3>

    <div class="blockly-container">
      <div ref="blocklyDiv" style="height: 500px; width: 100%"></div>
      <xml ref="toolbox" style="display: none">
        <!-- 根据方法类型显示不同的块 -->
        <category v-if="method.type === 'TypeA'" name="TypeA块" colour="210">
          <block type="type_a_action1"></block>
          <block type="type_a_action2"></block>
        </category>
        <category v-if="method.type === 'TypeB'" name="TypeB块" colour="230">
          <block type="type_b_action1"></block>
          <block type="type_b_action2"></block>
        </category>
        <!-- 公共块 -->
        <category name="逻辑" colour="160">
          <block type="controls_if"></block>
          <block type="logic_compare"></block>
        </category>
      </xml>
    </div>

    <button @click="saveMethod">保存方法</button>
    <button @click="resetToDefault">重置为默认</button>
  </div>
</template>

<script>
import * as Blockly from 'blockly'
import { javascriptGenerator } from 'blockly/javascript'
import basic_blocks from '../blocks/basic.json'
import { toRaw } from 'vue'

Blockly.defineBlocksWithJsonArray(basic_blocks)

export default {
  props: {
    method: null,
  },
  data() {
    return {
      localMethod: { ...this.method },
      /**
       * @type {Blockly.WorkspaceSvg}
       */
      workspace: null,
      effect: null,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initBlockly()
    })
  },
  beforeUnmount() {
    const workspace = toRaw(this.workspace)
    if (workspace) {
      workspace.dispose()
    }
  },
  methods: {
    initBlockly() {
      // 初始化工作区
      const workspace = Blockly.inject(this.$refs.blocklyDiv, {
        toolbox: this.$refs.toolbox,
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
          pinch: true,
        },
      })

      this.workspace = workspace

      // 加载已有块
      workspace.addChangeListener(this.onBlocklyChange)

      if (this.localMethod.blocksJson) {
        Blockly.serialization.workspaces.load(this.localMethod.blocksJson)
      } else {
        this.addDefaultStartBlock()
      }
    },
    addDefaultStartBlock() {
      const workspace = toRaw(this.workspace)
      const startBlock = workspace.newBlock('function_start')
      startBlock.initSvg()
      startBlock.render()
      startBlock.setDeletable(false)
      startBlock.moveBy(30, 30)
    },
    onBlocklyChange(event) {
      // 确保function_start块不能被删除
      const workspace = toRaw(this.workspace)
      if (event.type === Blockly.Events.BLOCK_DELETE) {
        const block = workspace.getBlockById(event.blockId)
        if (block && block.type === 'function_start') {
          Blockly.Events.disable()
          this.addDefaultStartBlock()
          Blockly.Events.enable()
        }
      }
    },
    saveMethod() {
      const workspace = toRaw(this.workspace)
      this.localMethod.blocksJson = Blockly.serialization.workspaces.save(workspace)
    },
    findStartBlock() {
      const workspace = toRaw(this.workspace)
      return Array.from(workspace.getAllBlocks()).find((block) => block.type === 'function_start')
    },
    getConnectedBlocks(startBlock) {
      const blocks = [startBlock]
      let current = startBlock.getNextBlock()

      while (current) {
        blocks.push(current)
        current = current.getNextBlock()
      }

      return blocks
    },
    getBlockFields(block) {
      // 获取块的所有字段值
    },
    resetToDefault() {
      this.localMethod.blocksJson = null
      this.localMethod.isDefault = true
      const workspace = toRaw(this.workspace)
      workspace.clear()
      this.addDefaultStartBlock()
    },
  },
}
</script>
