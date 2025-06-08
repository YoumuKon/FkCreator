<template>
  <el-dialog :model-value="props.modelValue" :title="'方法编辑：' + props.data.name" fullscreen :close-on-click-modal="false" :show-close="false">
    <div class="method-editor">
      <div ref="blocklyDiv" class="blockly-container"></div>
    </div>
    <template #footer>
      <div class="method-editor-buttons">
        <el-button type="primary" @click="saveMethod">保存</el-button>
        <el-button type="danger" plain @click="resetToDefault">清空</el-button>
        <el-button type="warning" @click="closeMethod">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { nextTick, onMounted, ref, toRaw } from 'vue';
import * as Blockly from 'blockly';
import * as Zh from 'blockly/msg/zh-hans';
import basic_blocks from '../blocks/basic.js';
import card_blocks from '../blocks/blocks_card.js';
import blocks_gameflow_hp from '@/blocks/blocks_gameflow_hp.js';
import toolbox_server from '@/blocks/toolbox_server';
import { ElMessageBox } from 'element-plus';

Blockly.defineBlocksWithJsonArray(basic_blocks);
Blockly.defineBlocksWithJsonArray(card_blocks);
Blockly.defineBlocksWithJsonArray(blocks_gameflow_hp);
Blockly.setLocale(Zh);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    required: true
  }
});
const emit = defineEmits(['update:modelValue', 'close']);

const close = () => {
  emit('update:modelValue', false);
  const rawWorkspace = toRaw(workspace.value);
  if (rawWorkspace) {
    rawWorkspace.dispose();
  }
};
const localMethod = ref();
const workspace = ref();
const blocklyDiv = ref();
onMounted(() => {
  nextTick(() => {
    initBlockly();
  });
});
const closeMethod = () => {
  ElMessageBox.confirm('关闭编辑页面会导致本次修改的数据丢失，是否确认关闭？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    close();
  });
};

const initBlockly = () => {
  workspace.value = Blockly.inject(blocklyDiv.value, {
    media: 'https://unpkg.com/blockly@10.0.0/media/',
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
  localMethod.value = JSON.parse(JSON.stringify(props.data));
  // 加载已有块
  workspace.value.addChangeListener(onBlocklyChange);
  if (localMethod.value.blocksJson) {
    Blockly.serialization.workspaces.load(localMethod.value.blocksJson);
  } else {
    addDefaultStartBlock();
  }
};
const addDefaultStartBlock = () => {
  const rawWorkspace = toRaw(workspace.value);
  const startBlock = rawWorkspace.newBlock('function_start');
  startBlock.initSvg();
  startBlock.render();
  startBlock.setDeletable(false);
  startBlock.moveBy(30, 30);
};
const onBlocklyChange = (event) => {
  // 确保function_start块不能被删除
  const rawWorkspace = toRaw(workspace.value);
  if (event.type === Blockly.Events.BLOCK_DELETE) {
    const block = rawWorkspace.getBlockById(event.blockId);
    if (block && block.type === 'function_start') {
      Blockly.Events.disable();
      addDefaultStartBlock();
      Blockly.Events.enable();
    }
  }
};
const saveMethod = () => {
  const rawWorkspace = toRaw(workspace.value);
  localMethod.value.blocksJson = Blockly.serialization.workspaces.save(rawWorkspace);
  console.log(localMethod.value);
  // TODO: 将画布数据保存起来
  close();
};
const resetToDefault = () => {
  ElMessageBox.confirm('清空会导致本次修改的数据丢失，是否确认清空？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    localMethod.value.blocksJson = null;
    localMethod.value.isDefault = true;
    const rawWorkspace = toRaw(workspace.value);
    rawWorkspace.clear();
    addDefaultStartBlock();
  });
};
</script>
<style scoped>
.blockly-container {
  height: calc(100vh - 150px);
  width: 100%;
  border: 1.4px solid #5f92cd;
  border-radius: var(--el-border-radius-base);
}

:deep(.injectionDiv) {
  border-radius: var(--el-border-radius-base);
}

.method-editor-buttons {
  display: flex;
  justify-content: flex-end;
  height: 10px;
  margin-top: 20px;
}
</style>
