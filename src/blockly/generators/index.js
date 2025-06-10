import gen_basic from './basic';
import gen_gameevent_hp from './gameevent_hp';
import gen_player from './player'

export default () => {
  gen_basic();
  gen_gameevent_hp();
  gen_player();
};
