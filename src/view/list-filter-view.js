import AbstractView from '../framework/view/abstract-view';

function createFilterItemTemplate(filter, currentFilterType) {
  const { type, count } = filter;

  return `<div class='trip-filters__filter'>
            <input id='filter-${type}' class='trip-filters__filter-input  visually-hidden' type='radio' name='trip-filter' value='${type}' checked=${type === currentFilterType}>
            <label class='trip-filters__filter-label' for='filter-${type}'>${type} ${count}</label>
        </div>`;
}

function createListFilterTemplate(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');
  return `<form class='trip-filters' action='#' method='get'>
            ${filterItemsTemplate}
          </form>`;
}

export default class ListFilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;
  }

  get template() {
    return createListFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
