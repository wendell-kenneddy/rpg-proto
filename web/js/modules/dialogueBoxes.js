export const handleDialogues = (index, hideOrShow) => {
  const overlays = document.querySelectorAll('.overlay');

  hideOrShow == 'show'
    ? overlays[index].classList.remove('hide')
    : overlays[index].classList.add('hide');
}
