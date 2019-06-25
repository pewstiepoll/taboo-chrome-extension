/**
 * @class Storage
 * Base method to use storage
 */
export default class Storage {
  /**
   * @static @method isConnected
   * @param {*} storage - storage object
   * @returns "true" if storage is connected to the field. "false" - otherwise
   */
  static isConnected(storage) {
    return Boolean(storage.field);
  }

  constructor(field, strategy) {
    this.strategy = strategy;

    // Initialize the strategy first
    this.strategy.init();

    // Connect to the given field
    this.connect(field);
  }

  connect(field) {
    // set up the field
    this.field = this.strategy.getField(field);
  }

  save() {
    this.strategy.setField(this.field);
  }

  addProperty(title, value) {
    if (this.field.hasOwnProperty(title))
      throw new Error(
        `Cannot create the new property: Property with title ${title} exists in storage. Update it instead.`
      );

    // Add field
    this.field[title] = value;

    // Update the storage
    this.save();
  }

  removeProperty(title) {
    if (!this.field.hasOwnProperty(title))
      throw new Error(
        `Cannot remove the property: Property with title ${title} does not exist on the storage. Create it first`
      );

    // Remove field
    delete this.field[title];

    // Update the storage
    this.save();
  }

  getProperty(title) {
    if (!this.field.hasOwnProperty(title))
      throw new Error(
        `Cannot receive the property: Property with title ${title} does not exist in storage`
      );

    return this.field[title];
  }

  updateProperty(title, newValue) {
    if (!this.field.hasOwnProperty(title))
      throw new Error(
        `Cannot update the property: Property with title ${title} does not exist in storage`
      );

    // Update the property
    this.field[title] = newValue;

    // Save changes to the storage
    this.save();
  }
}
