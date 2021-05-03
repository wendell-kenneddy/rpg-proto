import { gameLog } from './gameLog.js';
import { handlePlayerUI } from './handleUI.js';
import { handleStorage } from './saveSystem.js';

export const handleChar = {
  char: handleStorage.get(),

  saveCurrentState() {
    handleStorage.set(handleChar.char);
  },

  updateCurrentHP(value) {
    const currentHP = handleChar.char.currentHP;
    const maxHP = handleChar.char.maxHP;

    if (currentHP + value >= maxHP) {
      handleChar.char.currentHP = maxHP;
      return;
    }

    if (currentHP + value <= 0) {
      handleChar.char.currentHP = 0;
      return;
    }

    handleChar.char.currentHP += value;
  },

  updateCurrentSTA(value) {
    const currentSTA = handleChar.char.currentSTA;
    const maxSTA = handleChar.char.maxSTA;

    if (currentSTA + value >= maxSTA) {
      handleChar.char.currentSTA = maxSTA;
      return;
    }

    if (currentSTA + value <= 0) {
      handleChar.char.currentSTA = 0;
      return;
    }

    handleChar.char.currentSTA += value;
  },

  updateCurrentEXP(value) {
    const currentEXP = handleChar.char.currentEXP;
    const expToNextLevel = handleChar.char.expToNextLevel;

    if (currentEXP + value >= expToNextLevel) {
      handleChar.levelUp();
      return
    };

    if (currentEXP + value <= 0) {
      handleChar.char.currentEXP = 0;
      return;
    }

    handleChar.char.currentEXP += value;
  },

  updateStrength(value) {
    handleChar.char.strength += value;
  },

  updateMaxHP(value) {
    handleChar.char.maxHP += value;
  },

  updateMaxSTA(value) {
    handleChar.char.maxSTA += value;
  },

  updateExpToNextLevel() {
    const currentNeededExp = handleChar.char.expToNextLevel;
    const updatedExpToNextLevel = Math.ceil(currentNeededExp + (currentNeededExp * 0.1) + 5);
    handleChar.char.expToNextLevel = updatedExpToNextLevel;
  },

  levelUp() {
    handleChar.updateExpToNextLevel();
    handleChar.updateCurrentEXP(-handleChar.char.expToNextLevel);
    handleChar.updateMaxHP(5);
    handleChar.updateMaxSTA(5);
    handleChar.updateStrength(3);
    handleChar.char.level += 1;
    handleChar.updateCurrentHP(handleChar.char.maxHP);
    handleChar.updateCurrentSTA(handleChar.char.maxSTA);
    gameLog.updateLog(gameLog.getColorizedMessage('yellow', `${handleChar.char.name} atingiu o nível ${handleChar.char.level}!`))
  },

  gameOver() {
    handleChar.updateCurrentEXP(-handleChar.char.expToNextLevel);
    handlePlayerUI.updateGeneralUI();
    handleChar.saveCurrentState();
  },

  tryRegenStatus() {
    let regenSTA = setInterval(() => {
      if (handleChar.char.currentSTA < handleChar.char.maxSTA) {
        const logMessage = `<span class="highlighted-text-yellow">${handleChar.char.name}</span> regenerou <span class="highlighted-text-green">${Math.floor(handleChar.char.maxSTA * 0.05)}</span> pontos de stamina.`;

        handleChar.updateCurrentSTA(Math.floor(handleChar.char.maxSTA * 0.1));
        handlePlayerUI.updateSTAStatusBar();
        handleChar.saveCurrentState();
        gameLog.updateLog(logMessage);
      }
    }, 3000);
  }
};
