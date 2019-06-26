export class Todo {
  static factory({ id, title, checked }) {
    return new Todo(id, title, checked);
  }

  constructor(id, title, checked) {
    this.id = id;
    this.title = title;
    this.checked = checked;
  }

  setChecked(newChecked) {
    this.checked = Boolean(newChecked);
  }
}
