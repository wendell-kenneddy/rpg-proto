export const summonUtils = {
  possiblePrimaryNameParts: [
    'Aar', 'As', 'Björ', 'Czr', 'Ed', 'Rsz', 'Fits', 'Mitz', 'Jks', 'Zaar', 'Gon'
  ],
  possibleSecondaryNameParts: [
    'zits', 'kaar', 'tar', 'win', 'gron', 'afim', 'won', 'gold', 'pon', 'djks'
  ],
  possibleLastNameParts: [
    'if', 'else', 'witch', 'grim', 'grom', 'erf', 'morf', 'zer', 'xer', 'che', 'kaan'
  ],
  possibleDescriptions: [
    'Criatura que vaga pelos arredores de Bonbrado. Não apresenta grande perigo, a menos que esteja andando junto de seu bando.',
    'Criatura mundana que reside nos esgotos de Yorgue, fruto da reação dos mais diversos dejetos alquímicos. Um toque pode causar severos danos à pele e possível envenenamento.',
    'Criatura descendente dos Vampiros Inferiores. É relativamente ágil, pode mudar de forma em combate e drenar o sangue de seu oponente, além de deixá-lo exaurido.',
    'Criatura de certa forma inteligente, descendente dos antigos Mestres da Espada, extintos há muito. Seu corpo é trespassado por inúmeras lâminas, as quais usa para golpear seus oponentes em combate. Seu único instinto é lutar, na esperança de que impressione um de seus falecidos tutores.',
    'Criatura fruto de grotescos experimentos alqúimicos. Possui capacidades físicas aprimoradas, além de diversos produtos alquímicos que pode atirar em seus oponentes.',
    'Criatura incomum. Não há registros sobre sua aparição.',
    'Criatura comum, está em tudo que é lugar. Oferece certo risco, mas somente aos viajantes mais descuidados.',
    'Criatura intrigante que tenta imitar formas de vida próximas, geralmente animais e humanos. Não é o melhor espetáculo para se assistir, e geralmente é assassinada por dó ou por asco por parte de viajantes próximos, ainda que não apresente grande perigo se não ameaçada.',
    'Criatura extremamente intrigante. A única informação que se tem sobre ela é que sua origem parte dos confins do Pesadelo. Como chegou aqui, ainda é um grande mistério.',
    'Um dos muitos candidatos de Cavaleiro-Encantador que perderam sua sanidade para o Pesadelo ou para o Sonho, ou para os dois. Sua mente se foi há muito, e seu único instinto é perseguir os vultos de diversos mundos que a atormentam. Cruzar seu caminho é geralmente uma má ideia.'
  ],

  getRandomDescription() {
    const indexCap = summonUtils.possibleDescriptions.length;
    return summonUtils.possibleDescriptions[Math.floor(Math.random() * (indexCap - 0) + 0)];
  },

  getRandomName(namePartsArray) {
    const targetArray = summonUtils[namePartsArray];
    const indexCap = targetArray.length;
    return targetArray[Math.floor(Math.random() * (indexCap - 0) + 0)];
  },

  buildName() {
    const primaryPart = summonUtils.getRandomName('possiblePrimaryNameParts');
    const secondaryPart = summonUtils.getRandomName('possibleSecondaryNameParts');
    const lastPart = summonUtils.getRandomName('possibleLastNameParts');
    return `${primaryPart}${secondaryPart}${lastPart}`
  },
}
