import { luaGenerator } from 'blockly/lua';

export default () => {
  luaGenerator.forBlock['function_start'] = function () {
    return 'local room = Fk:currentRoom()\n';
  };
};
