import PubSub from 'pubsub-js';

const searchInput = document.getElementById('search-town_input');
const searchInputError = document.getElementById('search-town_error');
const searchSubmitButton = document.getElementById('search-town_submit');
const unitsCheckbox = document.getElementById('units-checkbox');

searchSubmitButton.addEventListener('click', (event) => {
  event.preventDefault();
  displayError('');

  const location = searchInput.value;
  PubSub.publish('locationChange', location);
  searchInput.value = '';
});

unitsCheckbox.addEventListener('click', () => {
  const useImperial = unitsCheckbox.checked;
  PubSub.publish('unitsChange', useImperial);
});

function displayError(errorText) {
  searchInputError.textContent = errorText;
}

const searchForm = {
  displayError,
};

export default searchForm;
