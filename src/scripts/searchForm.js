import PubSub from 'pubsub-js';

const searchInput = document.getElementById('search-town-input');
const searchInputError = document.getElementById('search-town-input-error');
const searchSubmitButton = document.getElementById('search-submit');
const unitsCheckbox = document.getElementById('units-checkbox');

searchSubmitButton.addEventListener('click', (event) => {
  event.preventDefault();

  const location = searchInput.value;
  PubSub.publish('locationChange', location);
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
