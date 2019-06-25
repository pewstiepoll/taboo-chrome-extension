import AbstractStrategy from "./abstract-strategy";

export class LocalStorageStorageStrategy extends AbstractStrategy {
  init() {
    // Empty method for localstorage strategy
  }

  getField(fieldName) {
    const result = window.localStorage.getItem(fieldName);

    if (!result) {
      this.setField(fieldName, {});
      return {};
    }

    return JSON.parse(result);
  }

  setField(field, newValue) {
    window.localStorage.setItem(field, JSON.stringify(newValue));
  }
}
