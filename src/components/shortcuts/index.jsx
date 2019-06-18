import React from "react";
import useShortcuts from "./useShortcuts";
import uuidV4 from "uuid/v4";
import Shortcut from "./classes/Shortcut";
import ShortcutCategory from "./classes/ShortcutCategory";

/**
 * The structure of the store for Shortcuts is the following:
 * Shortcuts: {
 *  "categories": [{ id: "super_unique_id", title: "Awesome Category" }],
 * "shortcuts": [{ category_id: "super_unique_category_id", link: https://somesite.com, title: "My custom shortcut" }]
 * }
 *
 * Available actions:
 *  Categories:
 *    - addCategory(categoryObject) - adds new category object to the store
 *    - removeCategory({id, title})  - removes the category by its title or id.
 *    - updateCategory({id, title}, {title})  - updates category by its id or title. Currenlty support only title update
 *  Shortcuts:
 *    - addShortcut(shortcutObject) - adds new shortcut
 *    - removeShortcut({id, title, link}) - removes the shortcut by its link, title or id
 *    - updateShortcut({id, title, link}, {title, link, category_id}) - updates title/link/category_id of the shortcut by its id, title or link
 */
export default function Shortcuts() {
  const { shortcuts, categories, actions } = useShortcuts();

  const { addCategory, addShortcut } = actions;

  const [formControl, setFormControl] = React.useState({
    category_title: "",
    shortcut_title: "",
    shortcut_category: "",
    shortcut_link: ""
  });

  return (
    <div className="wrapper">
      <div className="controls">
        <form action="#" onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <input
              value={formControl.category_title}
              onChange={e => {
                e.persist();
                setFormControl(prevState => ({
                  ...prevState,
                  category_title: e.target.value
                }));
              }}
              name="add_category"
              placeholder="Category title..."
            />
            <button
              type="submit"
              onClick={e => {
                // Using factory method to create a new category
                const newCategory = ShortcutCategory.factory(
                  uuidV4(),
                  formControl.category_title
                );

                addCategory(newCategory); // Adding new category

                // Reset input value. Set shortcut category if not set
                setFormControl(prevState => ({
                  ...prevState,
                  category_title: "",
                  shortcut_category: formControl.shortcut_category
                    ? formControl.shortcut_category
                    : newCategory.id
                }));
              }}
            >
              Add Category
            </button>
          </div>
          <div className="form-group">
            <select
              onChange={e => {
                e.persist();
                setFormControl({ shortcut_category: e.target.value });
              }}
              name="shortcut_category"
              placeholder="None"
            >
              {categories.map(category => (
                <option value={category.id} key={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="shortcut_title"
              placeholder="Add shortcut title"
              disabled={!formControl.shortcut_category}
              value={formControl.shortcut_title}
              onChange={e => {
                e.persist();
                setFormControl(prevState => ({
                  ...prevState,
                  shortcut_title: e.target.value
                }));
              }}
            />
            <input
              type="text"
              name="shortcut_link"
              placeholder="Add shortcut link"
              disabled={!formControl.shortcut_category}
              value={formControl.shortcut_link}
              onChange={e => {
                e.persist();
                setFormControl(prevState => ({
                  ...prevState,
                  shortcut_link: e.target.value
                }));
              }}
            />
            <button
              type="submit"
              disabled={
                !formControl.shortcut_title || !formControl.shortcut_link
              }
              onClick={e => {
                // create new shortcut
                const newShortcut = Shortcut.factory({
                  id: uuidV4(),
                  category_id: formControl.shortcut_category,
                  title: formControl.shortcut_title,
                  link: formControl.shortcut_link
                });

                addShortcut(newShortcut);

                setFormControl(prevState => ({
                  ...prevState,
                  shortcut_title: "",
                  shortcut_link: ""
                }));
              }}
            >
              Add shortcut
            </button>
          </div>
        </form>
      </div>
      <h3 style={{ textAlign: "left" }}>Result</h3>
      <table>
        <tbody>
          {categories.map(category => (
            <React.Fragment key={`table-header-category-${category.id}`}>
              <tr>
                <th colSpan="2">{category.title}</th>
              </tr>
              {shortcuts
                .filter(shortcut => shortcut.category_id === category.id)
                .map(shortcut => (
                  <tr key={shortcut.id}>
                    <td>{shortcut.title}</td>
                    <td>{shortcut.link}</td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
