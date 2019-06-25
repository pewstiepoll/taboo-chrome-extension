import AbstractStrategy from "./abstract-strategy";

export default class LocalStorageStorageStrategy extends AbstractStrategy {
  init() {
    // Empty method for localstorage strategy
  }

  getField(field) {
    const result = window.localStorage.getItem(field);

    if (!result) {
      this.setField({});
      return {};
    }

    return result;
  }

  setField(field, newValue) {
    window.localStorage.setItem(field, JSON.stringify(newValue));
  }
}
