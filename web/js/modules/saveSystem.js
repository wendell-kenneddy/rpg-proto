export const handleStorage = {
  get() {
    return JSON.parse(localStorage.getItem('rpgproto: char')) || null;
  },

  set(item) {
    localStorage.setItem('rpgproto: char', JSON.stringify(item));
  }
};
