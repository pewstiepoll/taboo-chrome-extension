import React from "react";
import Shortcut from "./shortcut";
// import useShortcuts from "./useShortcuts";
// import uuidV4 from "uuid/v4";
// import Shortcut from "../../classes/Shortcut";
// import ShortcutCategory from "../../classes/ShortcutCategory";

import styles from "./shortcuts-list.module.css";

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
  return (
    <div className={styles.container}>
      <h3 className={styles["shortcuts-category-title"]}>Entertainment</h3>
      <div className="shortcuts">
        <Shortcut title="Google" link="https://google.com" />
        <Shortcut title="Netflix" link="https://netflix.com" />
        <Shortcut title="Youtube" link="https://youtube.com" />
      </div>
      <h3 className={styles["shortcuts-category-title"]}>Learning</h3>
      <div className="shortcuts">
        <Shortcut title="Egghead.io" link="https://egghead.io" />
        <Shortcut title="Frontend Masters" link="https://frontendmasters.com" />
        <Shortcut title="Coursera" link="https://coursera.com" />
        <Shortcut title="Udemy" link="https://udemy.com" />
        <Shortcut title="Udacity" link="https://udacity.com" />
      </div>
    </div>
  );
}
