import { handleChar } from './charSystems.js';
import { summonUtils } from './enemySummonUtils.js';
import { gameLog } from './gameLog.js';
import { handlePlayerUI } from './handleUI.js';

function Enemy(name, description) {
  this.name = name;
  this.description = description;
  this.maxHP = handleChar.char.maxHP + Math.floor(Math.random() * (handleChar.char.maxHP * 0.4 - 1) + 1);
  this.currentHP = this.maxHP;
  this.strength = handleChar.char.strength + Math.floor(Math.random() * (handleChar.char.strength * 0.5 - 1) + 1);
  this.level = handleChar.char.level;
}

export const handleActions = {
  summonEnemy() {
    const staRequirement = 5;
    const playerSta = handleChar.char.currentSTA;
    const enemy = new Enemy(summonUtils.buildName(), summonUtils.getRandomDescription());

    const validateSummon = () => {
      if (playerSta < staRequirement) {
        throw new Error('Você não possui stamina suficiente.')
      }

      return
    }

    try {
      const logMessage = `<span class="highlighted-text-yellow">${handleChar.char.name}</span> invocou <span class="highlighted-text-yellow">${enemy.name}</span>.`;

      validateSummon();
      handleChar.updateCurrentSTA(-staRequirement);
      handlePlayerUI.updateGeneralUI();
      handlePlayerUI.updateEnemy(enemy);
      gameLog.updateLog(logMessage);
      handleChar.saveCurrentState();
    } catch (error) {
      alert(error.message)
    }
  },

  watchActions() {
    const btnGroup = document.querySelector('.btn-group');
    btnGroup.addEventListener('click', e => {
      const summonBtn = document.querySelector('.summon-btn');

      if (e.target == summonBtn) {
        handleActions.summonEnemy();
        return;
      }
    })
  }
}
