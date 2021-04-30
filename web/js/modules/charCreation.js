import { handleChar } from "./charSystems.js";
import { App } from '../index.js';
import { handleDialogues } from "./dialogueBoxes.js";

function Char(name) {
  this.name = name;
  this.currentHP = 50;
  this.currentSTA = 50;
  this.currentEXP = 0;
  this.maxHP = 50;
  this.maxSTA = 50;
  this.expToNextLevel = 100;
  this.level = 1;
  this.strength = 10;
}

export const handleCharCreation = {
  watchCharCreation() {
    const createBtn = document.getElementById('create-char');
    createBtn.addEventListener('click', handleCharCreation.createChar)
  },

  closeCharCreationDialoge() {
    const createBtn = document.getElementById('create-char');
    createBtn.removeEventListener('click', handleCharCreation.createChar)
    handleDialogues(0, 'hide')
  },

  validateChar() {
    const charName = document.getElementById('char-name');

    if (charName.value.replace(/\s/g, '') == '') {
      throw new Error('Por favor, digite o nome do seu personagem.');
    }

    return;
  },

  createChar() {
    const charName = document.getElementById('char-name');
    const char = new Char(charName.value);

    try {
      handleCharCreation.validateChar();
      handleChar.char = char;
      handleCharCreation.closeCharCreationDialoge();
      App.reload();
    } catch (error) {
      alert(error.message);
      return;
    }
  }
}
