import { battleEnviroment } from './battleEnv.js';
import { handleChar } from './charSystems.js';
import { summonUtils } from './enemySummonUtils.js';
import { gameLog } from './gameLog.js';
import { handlePlayerUI } from './handleUI.js';

function Enemy(name, description) {
  this.name = name;
  this.description = description;
  this.maxHP = handleChar.char.maxHP + Math.floor(Math.random() * handleChar.char.maxHP * 0.4);
  this.currentHP = this.maxHP;
  this.strength = Math.round(handleChar.char.strength * 0.6);
  this.level = handleChar.char.level;
}

export const handleActions = {
  summonEnemy() {
    const staRequirement = 5;
    const playerSta = handleChar.char.currentSTA;
    const enemy = new Enemy(summonUtils.buildName(), summonUtils.getRandomDescription());

    const validateSummon = () => {
      if (playerSta < staRequirement) {
        throw new Error('Você não possui stamina suficiente para Invocar.')
      }

      if (battleEnviroment.enemyIsSummoned && battleEnviroment.enemyIsAlive) {
        throw new Error('Você não pode Invocar em combate.')
      }

      return
    }

    try {
      const logMessage = `<span class="highlighted-text-yellow">${handleChar.char.name}</span> invocou <span class="highlighted-text-yellow">${enemy.name}</span>.`;

      validateSummon();
      handleChar.updateCurrentSTA(-staRequirement);
      handlePlayerUI.updateGeneralUI();
      battleEnviroment.updateEnemy(enemy);
      battleEnviroment.updateBattleState('engage');
      handlePlayerUI.updateEnemy(enemy);
      gameLog.updateLog(logMessage);
      handleChar.saveCurrentState();
    } catch (error) {
      gameLog.updateLog(`<span class="highlighted-text-red">${error.message}</span>`)
    }
  },

  heal() {
    const staRequirement = Math.ceil(handleChar.char.maxSTA * 0.1) + 5;
    const playerSTA = handleChar.char.currentSTA;
    const currentHP = handleChar.char.currentHP;
    const maxHP = handleChar.char.maxHP;
    const healAmount = Math.floor(handleChar.char.maxHP * 0.1 + ((handleChar.char.maxHP - handleChar.char.currentHP) * 0.2));

    const validateHeal = () => {
      if (playerSTA < staRequirement) {
        throw new Error('Você não possui stamina suficiente para Curar.')
      }

      if (currentHP == maxHP) {
        throw new Error('Seu HP já está no máximo.')
      }
    }

    try {
      const logMessage = `${gameLog.getColorizedMessage('yellow', handleChar.char.name)} curou ${gameLog.getColorizedMessage('red', healAmount)} pontos de HP.`;

      validateHeal();
      handleChar.updateCurrentSTA(-staRequirement);
      handleChar.updateCurrentHP(healAmount);
      handlePlayerUI.updateGeneralUI();
      gameLog.updateLog(logMessage);
      handleChar.saveCurrentState();
    } catch (error) {
      gameLog.updateLog(`<span class="highlighted-text-red">${error.message}</span>`)
      return
    }
  },

  attack() {
    const staRequirement = Math.ceil(handleChar.char.maxSTA * 0.05);
    const getAtkValue = () => {
      let atkValue = 0;
      let isCrit = false;
      const diceCap = 8;
      const diceValue = Math.round(Math.random() * diceCap);

      atkValue = handleChar.char.strength + diceValue;

      if (diceValue == diceCap) {
        atkValue *= 2;
        isCrit = true;
      };

      return {
        atkValue,
        isCrit
      };
    };
    const validateAtk = () => {
      if (handleChar.char.currentSTA < staRequirement) {
        throw new Error('Você não possui stamina suficiente para Atacar.');
      }

      if (!battleEnviroment.enemyIsSummoned) {
        throw new Error('Você não pode Atacar fora de combate.')
      }
      if (battleEnviroment.enemyIsSummoned && !battleEnviroment.enemyIsAlive) {
        throw new Error('Você já derrotou seu oponente.');
      }
    };

    try {
      validateAtk();

      handleChar.updateCurrentSTA(-staRequirement);
      handlePlayerUI.updateGeneralUI();
      handleChar.saveCurrentState();
      battleEnviroment.sufferAttack(getAtkValue());
    } catch (error) {
      gameLog.updateLog(gameLog.getColorizedMessage('red', error.message));
    }
  },

  watchActions() {
    const btnGroup = document.querySelector('.btn-group');
    btnGroup.addEventListener('click', e => {
      const summonBtn = document.querySelector('.summon-btn');
      const healBtn = document.querySelector('.heal-btn');
      const attackBtn = document.querySelector('.attack-btn');

      if (e.target == summonBtn) {
        handleActions.summonEnemy();
        return;
      }

      if (e.target == healBtn) {
        handleActions.heal();
        return;
      }

      if (e.target == attackBtn) {
        handleActions.attack();
        return;
      }
    })
  }
}
