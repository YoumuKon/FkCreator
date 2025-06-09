import { luaGenerator } from 'blockly/lua';

export default () => {
  luaGenerator.forBlock['function_start'] = function () {
    return 'local room = Fk:currentRoom() -- 此为生成器使用，手搓还是local room = player.room吧\n';
  }
}
