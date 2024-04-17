export const toggleSpinner = isHidden => {
  const spinnerModalElement = document.querySelector('.spinner-modal');

  if (isHidden) {
    spinnerModalElement.classList.remove('hidden');
  } else if (!isHidden && !spinnerModalElement.classList.contains('hidden')) {
    spinnerModalElement.classList.add('hidden');
  }
};
