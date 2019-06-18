export default class Shortcut {
  static factory({ id, category_id, title, link }) {
    return new Shortcut({ id, category_id, title, link });
  }

  constructor({ id, category_id, link, title }) {
    this.id = id;
    this.category_id = category_id;
    this.link = link;
    this.title = title;
  }

  update(updates) {
    if (updates.id)
      throw new Error(
        "[Shortcut::update]: Shortcut id cannot be updated manually."
      );

    Object.keys(updates).forEach(updateKey => {
      if (this.hasOwnProperty(updateKey)) {
        this[updateKey] = updates[updateKey];
      } else {
        throw new Error(
          "[Shortcut::updata]: Trying to update unknown property on shortcut: ",
          updateKey
        );
      }
    });
  }
}
