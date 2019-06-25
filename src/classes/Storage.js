/**
 * @class Storage
 * Base method to use storage
 */
export class Storage {
  /**
   * @static @method isConnected
   * @param {*} storage - storage object
   * @returns "true" if storage is connected to the field. "false" - otherwise
   */
  static isConnected(storage) {
    return Boolean(storage.field);
  }

  constructor(field, strategy) {
    if (!Boolean(field) || !Boolean(strategy))
      throw new Error(
        "Cannot create a storage object: all params should be specified"
      );
    this.strategy = strategy;

    // Initialize the strategy first
    this.strategy.init();

    // Connect to the given field
    this.connect(field);
  }

  connect(fieldName) {
    // set up the field
    this.field = this.strategy.getField(fieldName);

    if (this.field) {
      this.fieldName = fieldName;
    }
  }

  save() {
    this.strategy.setField(this.fieldName, this.field);
  }

  addProperty(title, value) {
    if (this.field.hasOwnProperty(title)) return false;

    // Add field
    this.field[title] = value;

    // Update the storage
    this.save();

    return true;
  }

  removeProperty(title) {
    if (!this.field.hasOwnProperty(title)) return false;

    // Remove field
    delete this.field[title];

    // Update the storage
    this.save();

    return true;
  }

  getProperty(title) {
    return this.field[title];
  }

  updateProperty(title, newValue) {
    if (!this.field.hasOwnProperty(title)) return false;
    // Update the property
    this.field[title] = newValue;

    // Save changes to the storage
    this.save();

    return true;
  }

  updateProperties(newValues) {
    Object.keys(newValues).forEach(key => {
      this.updateProperty(key, newValues[key]);
    });
  }

  hasProperty(title) {
    return Boolean(this.getProperty(title));
  }
}
