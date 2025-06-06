export const saveModToFile = async (modData) => {
  const dataStr = JSON.stringify(modData, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${modData.name.replace(/\s+/g, '_')}.mod.json`;
  document.body.appendChild(a);
  a.click();

  // 清理
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
};

export const loadModFromFile = async () => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.mod';

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) {
        reject(new Error('未选择文件'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const modData = JSON.parse(event.target.result);
          resolve(modData);
        } catch (error) {
          reject(new Error('解析文件失败'));
        }
      };
      reader.onerror = () => reject(new Error('读取文件失败'));
      reader.readAsText(file);
    };

    input.click();
  });
};
