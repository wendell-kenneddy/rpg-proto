import { handleCharCreation } from './modules/charCreation.js';
import { handleChar } from './modules/charSystems.js';
import { handleDialogues } from './modules/dialogueBoxes.js';
import { gameLog } from './modules/gameLog.js';
import { handlePlayerUI } from './modules/handleUI.js';
import { handleActions } from './modules/playerActions.js';

export const App = {
  init() {
    handleChar.saveCurrentState();

    if (handleChar.char == null) {
      handleDialogues(0, 'show');
      handleCharCreation.watchCharCreation();
      return;
    }

    handlePlayerUI.updateGeneralUI();
    gameLog.updateLog(`<span class="highlighted-text-yellow">${handleChar.char.name}</span> iniciou uma sessão.`);
    handleActions.watchActions();
    handleChar.tryRegenStatus();
  },

  reload() {
    gameLog.clearLog();
    App.init();
  }
};

App.init();
