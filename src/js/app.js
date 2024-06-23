import Field from './Field';
import GamePlay from './GamePlay';

const fields = new Field();
const gameplay = new GamePlay(fields);
gameplay.init();