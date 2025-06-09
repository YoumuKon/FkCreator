import useClipboard from 'vue-clipboard3';
import { ElMessage } from 'element-plus';

const { toClipboard } = useClipboard();

export const copyTextToClip = (content, msg = '复制成功！') => {
  toClipboard(content).then(() => {
    ElMessage.success(msg);
  });
};
