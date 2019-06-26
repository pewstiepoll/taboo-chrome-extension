export class Todo {
  static factory({ id, title, checked }) {
    return new Todo(id, title, checked);
  }

  constructor(id, title, checked = false) {
    this.id = id;
    this.title = title;
    this.checked = checked;
  }

  setChecked(newChecked) {
    this.checked = Boolean(newChecked);
  }

  update(updates) {
    Object.keys(updates).forEach(updateKey => {
      if (this.hasOwnProperty(updateKey)) this[updateKey] = updates[updateKey];
    });
  }
}
