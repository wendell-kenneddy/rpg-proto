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

  createLog(message) {
    const p = document.createElement('p');
    p.innerHTML = message;
    p.innerHTML += ` <span class="highlighted-text-yellow">(${gameLog.getLogDate()})</span>.`;
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
