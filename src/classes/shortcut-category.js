export class ShortcutCategory {
  static factory(id, title) {
    return new ShortcutCategory(id, title);
  }

  constructor(id, title) {
    if (!title)
      throw new Error(
        "[ShortcutCategory::constructor] Expected to receive category title, got",
        title
      );

    this.id = id;
    this.title = title;
  }

  update(updates) {
    if (updates.id)
      throw new Error(
        "[ShortcutCategory::update] Category id cannot by updated manually."
      );

    Object.keys(updates).forEach(updateKey => {
      if (this.hasOwnProperty(updateKey)) {
        this[updateKey] = updates[updateKey];
      } else {
        throw new Error(
          "[ShortcutCategory::update] Trying to update unknown property on category: ",
          updateKey
        );
      }
    });
  }
}
