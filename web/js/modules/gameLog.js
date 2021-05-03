export const gameLog = {
  logContainer: document.querySelector('.char-log'),

  getLogDate() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString('pt-br', {
      hour12: false,
      minute: '2-digit',
      hour: '2-digit',
      second: '2-digit'
    })
    return currentTime;
  },

  getColorizedMessage(color, message) {
    return `<span class="highlighted-text-${color}">${message}</span>`
  },

  createLog(message) {
    const p = document.createElement('p');
    p.innerHTML = `${message} `;
    p.innerHTML += `${gameLog.getColorizedMessage('yellow', `(${gameLog.getLogDate()})`)}.`;
    return p;
  },

  updateLog(message) {
    const log = gameLog.createLog(message);
    gameLog.logContainer.prepend(log);
  },

  clearLog() {
    gameLog.logContainer.innerHTML = '';
  }
}
