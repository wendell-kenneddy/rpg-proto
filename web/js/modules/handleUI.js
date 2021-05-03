import { handleChar } from "./charSystems.js";

export const handlePlayerUI = {
  updateGeneralUI() {
    handlePlayerUI.updateCharNameDisplay();
    handlePlayerUI.updateHPStatusBar();
    handlePlayerUI.updateSTAStatusBar();
    handlePlayerUI.updateEXPStatusBar();
  },

  updateCharNameDisplay() {
    const charNameDisplay = document.getElementById('char-name-display');
    charNameDisplay.innerText = handleChar.char.name;
  },

  updateHPStatusBar() {
    const currentHP = handleChar.char.currentHP;
    const maxHP = handleChar.char.maxHP;
    const percentage = Math.floor(currentHP * 100 / maxHP);
    const hpBar = document.getElementById('hp-bar');
    hpBar.style.width = `${percentage}%`;
  },

  updateSTAStatusBar() {
    const currentSTA = handleChar.char.currentSTA;
    const maxSTA = handleChar.char.maxSTA;
    const percentage = Math.floor(currentSTA * 100 / maxSTA);
    const staBar = document.getElementById('sta-bar');
    staBar.style.width = `${percentage}%`;
  },

  updateEXPStatusBar() {
    const currentEXP = handleChar.char.currentEXP;
    const expToNextLevel = handleChar.char.expToNextLevel;
    const percentage = Math.floor(currentEXP * 100 / expToNextLevel);
    const expBar = document.getElementById('exp-bar');
    expBar.style.width = `${percentage}%`;
  },

  updateEnemy(enemy) {
    const enemyNameDisplay = document.getElementById('monster-name');
    const enemyHpDisplay = document.getElementById('monster-hp');
    const enemyLevelDisplay = document.getElementById('monster-lvl');
    const enemyDescriptionDisplay = document.getElementById('monster-description');

    enemyNameDisplay.innerText = enemy.name;
    enemyHpDisplay.innerText = `HP: ${enemy.currentHP}/${enemy.maxHP}`;
    enemyLevelDisplay.innerText = `Nível: ${enemy.level}`;
    enemyDescriptionDisplay.innerText = enemy.description;
  }
};
