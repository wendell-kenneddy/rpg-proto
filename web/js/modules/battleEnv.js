import { handleChar } from "./charSystems.js";
import { gameLog } from "./gameLog.js";
import { handlePlayerUI } from "./handleUI.js";

export const battleEnviroment = {
  enemyIsSummoned: false,
  enemyIsAlive: false,
  nemesis: false,
  currentEnemy: null,

  updateBattleState(isEngage = true) {
    if (isEngage) {
      battleEnviroment.enemyIsSummoned = true;
      battleEnviroment.enemyIsAlive = true;

      if (battleEnviroment.nemesis) battleEnviroment.nemesis = false;

      return;
    }

    battleEnviroment.enemyIsAlive = false;
    battleEnviroment.enemyIsSummoned = false;
  },

  updateEnemy(enemy) {
    if (!enemy) return;
    battleEnviroment.currentEnemy = enemy;
  },

  healEnemy() {
    const currentHP = battleEnviroment.currentEnemy.currentHP;
    const maxHP = battleEnviroment.currentEnemy.maxHP;
    const healValue = Math.ceil((maxHP - currentHP) * 0.15);
    const logMessage = `${gameLog.getColorizedMessage('yellow', battleEnviroment.currentEnemy.name)} curou ${gameLog.getColorizedMessage('red', healValue)} pontos de HP.`

    battleEnviroment.currentEnemy.currentHP += healValue;
    handlePlayerUI.updateEnemy(battleEnviroment.currentEnemy);
    gameLog.updateLog(logMessage);
  },

  attackPlayer() {
    const atkValue = battleEnviroment.currentEnemy.strength + Math.ceil(Math.random() * battleEnviroment.currentEnemy.strength * 0.3);
    const logMessage = `${gameLog.getColorizedMessage('yellow', battleEnviroment.currentEnemy.name)} causou ${gameLog.getColorizedMessage('red', atkValue)} pontos de dano a ${gameLog.getColorizedMessage('yellow', handleChar.char.name)}.`;

    if (handleChar.char.currentHP - atkValue <= 0) {
      gameLog.updateLog(gameLog.getColorizedMessage('red', `${battleEnviroment.currentEnemy.name} derrotou ${handleChar.char.name}. Seu pontos de experiência foram perdidos.`));
      battleEnviroment.nemesis = true;
      handleChar.gameOver();
      return;
    }

    handleChar.updateCurrentHP(-atkValue);
    handlePlayerUI.updateGeneralUI();
    gameLog.updateLog(logMessage);
    handleChar.saveCurrentState();
  },

  sufferAttack(atk) {
    const currentHP = battleEnviroment.currentEnemy.currentHP;
    let logMessage = `${gameLog.getColorizedMessage('yellow', handleChar.char.name)} causou ${gameLog.getColorizedMessage('red', atk.atkValue)} pontos de dano a ${gameLog.getColorizedMessage('yellow', battleEnviroment.currentEnemy.name)}.`;

    if (atk.isCrit) {
      logMessage = logMessage.slice(0, -1)
      logMessage += `${gameLog.getColorizedMessage('yellow', ' (Acerto Crítico)')}.`;
    }

    if (currentHP - atk.atkValue <= 0) {
      battleEnviroment.currentEnemy.currentHP = 0;
      handlePlayerUI.updateEnemy(battleEnviroment.currentEnemy);
      gameLog.updateLog(logMessage);
      battleEnviroment.finishBattle();
      return;
    }

    battleEnviroment.currentEnemy.currentHP -= atk.atkValue;
    handlePlayerUI.updateEnemy(battleEnviroment.currentEnemy);
    gameLog.updateLog(logMessage);
    battleEnviroment.enemyTurn();
  },

  finishBattle() {
    const exp = Math.floor(3 * handleChar.char.level + Math.random() * (handleChar.char.currentHP - 5) + 5);
    const logMessage = gameLog.getColorizedMessage('yellow', `${handleChar.char.name} derrotou ${battleEnviroment.currentEnemy.name}! ${exp} pontos de experiência adquiridos.`);

    battleEnviroment.enemyIsAlive = false;
    gameLog.updateLog(logMessage);
    handleChar.updateCurrentEXP(exp);
    handleChar.updateWinsCount();
    handlePlayerUI.updateGeneralUI();
    handleChar.saveCurrentState();
  },

  enemyTurn() {
    const currentHP = battleEnviroment.currentEnemy.currentHP;
    const maxHP = battleEnviroment.currentEnemy.maxHP;

    if (!battleEnviroment.enemyIsAlive) {
      const logMessage = `${gameLog.getColorizedMessage('red', battleEnviroment.currentEnemy.name)} já não possui mais forças para lutar.`;
      gameLog.updateLog(logMessage);
      return;
    }

    if (currentHP < maxHP * 0.15) {
      battleEnviroment.healEnemy();
      return;
    }

    battleEnviroment.attackPlayer();
  },
};
