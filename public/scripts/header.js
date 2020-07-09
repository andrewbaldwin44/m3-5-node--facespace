const dropdownButton = document.querySelector('#dropdown-button');
const dropdownContent = document.querySelector('#dropdown-content');

dropdownButton.addEventListener('click', () => {
  dropdownButton.classList.toggle('visible-signin');
  dropdownContent.classList.toggle('visible-dropdown');
});

window.onclick = () => {
  if (event.target.id !== 'dropdown-button') {
    dropdownButton.classList.remove('visible-signin');
    dropdownContent.classList.remove('visible-dropdown');
  }
}
