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

import React from "react";
import Shortcut from "./shortcut";
// import useShortcuts from "./useShortcuts";
import uuidV4 from "uuid/v4";
import ShortcutClass from "../../classes/Shortcut";
import CategoryClass from "../../classes/ShortcutCategory";
import { withModal } from "../modal";

import styles from "./shortcuts-list.module.css";

function ShortcutCategory({ category, shortcuts }) {
  return (
    <>
      <h3 className={styles["shortcuts-category-title"]}>{category.title}</h3>
      <div className="shortcuts">
        {shortcuts.map(({ id, title, link }) => (
          <Shortcut key={id} title={title} link={link} />
        ))}
        <Shortcut title="Add shortcut" icon="+" isShape={true} />
      </div>
    </>
  );
}

function getMock(categoryTitle) {
  const category = CategoryClass.factory(uuidV4(), categoryTitle);
  const items = [
    ShortcutClass.factory({
      id: uuidV4(),
      category_id: category.id,
      title: "Google",
      link: "google.com"
    }),
    ShortcutClass.factory({
      id: uuidV4(),
      category_id: category.id,
      title: "Yahoo",
      link: "yahoo.com"
    }),
    ShortcutClass.factory({
      id: uuidV4(),
      category_id: category.id,
      title: "Bing",
      link: "Bing.com"
    }),
    ShortcutClass.factory({
      id: uuidV4(),
      category_id: category.id,
      title: "Youtube",
      link: "youtube.com"
    }),
    ShortcutClass.factory({
      id: uuidV4(),
      category_id: category.id,
      title: "Tumblr",
      link: "tumblr.com"
    })
  ];

  return [category, items];
}

const AddCategoryButton = withModal(function AddCategoryButton({ openModal }) {
  const classes = [
    styles["shortcuts-category-title"],
    styles["shortcuts-category-title--grayed"]
  ].join(" ");

  return (
    <button
      className={classes}
      onClick={() => {
        openModal();
      }}
    >
      Add category...
    </button>
  );
});

export default function Shortcuts() {
  return (
    <div className={styles.container}>
      {[getMock("Entertainment"), getMock("Learning")].map(
        ([category, shortcuts], id) => (
          <ShortcutCategory
            key={id}
            category={category}
            shortcuts={shortcuts}
          />
        )
      )}
      <AddCategoryButton />
    </div>
  );
}
