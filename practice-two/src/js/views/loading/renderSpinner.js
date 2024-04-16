export const toggleSpinner = showHidden => {
  const spinnerModalElement = document.querySelector('.spinner-modal');

  if (showHidden) {
    spinnerModalElement.classList.remove('hidden');
  } else if (!showHidden && !spinnerModalElement.classList.contains('hidden')) {
    spinnerModalElement.classList.add('hidden');
  }
};
