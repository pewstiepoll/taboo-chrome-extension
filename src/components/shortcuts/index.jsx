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
import useShortcuts from "./useShortcuts";
import uuidV4 from "uuid/v4";
import {
  Shortcut as ShortcutClass,
  ShortcutCategory as CategoryClass
} from "../../classes";
import { withModal } from "../modal";

import styles from "./shortcuts-list.module.css";
import { Button } from "../primitives";

/**
 * Modal open functions
 */
const openAddCategoryModal = ({ openModal, closeModal, addCategory }) =>
  openModal({
    title: "Add category",
    fields: [
      {
        name: "category_name",
        placeholder: "Category name...",
        type: "text",
        label: "Category name"
      }
    ],
    buttons: [
      { type: "submit", text: "Add" },
      {
        type: "button",
        config: {
          type: "danger"
        },
        text: "Cancel",
        onClick: closeModal
      }
    ],
    onSubmit: results => {
      const { category_name } = results;

      if (!category_name) return;

      const newCategory = CategoryClass.factory(uuidV4(), category_name);

      addCategory(newCategory);
    }
  });

const openAddShortcutModal = ({
  openModal,
  closeModal,
  addShortcut,
  category_id
}) =>
  openModal({
    title: "New shortcut",
    fields: [
      {
        type: "text",
        name: "shortcut_title",
        placeholder: "Shortcut title...",
        label: "Shortcut title"
      },
      {
        type: "text",
        name: "shortcut_link",
        placeholder: "Shortcut link...",
        label: "Shortcut link"
      }
    ],
    buttons: [
      { type: "submit", text: "Add" },
      {
        type: "button",
        config: {
          type: "danger"
        },
        text: "Cancel",
        onClick: closeModal
      }
    ],
    onSubmit: ({ shortcut_title, shortcut_link }) => {
      if (shortcut_title && shortcut_link) {
        const newShortcut = ShortcutClass.factory({
          id: uuidV4(),
          category_id,
          title: shortcut_title,
          link: shortcut_link
        });

        addShortcut(newShortcut);
      }
    }
  });

const openUpdateShortcutModal = ({
  shortcut,
  openModal,
  removeShortcut,
  closeModal,
  updateShortcut
}) =>
  openModal({
    title: "Update shortcut",
    fields: [
      {
        name: "shortcut_title",
        label: "Shortcut title",
        placeholder: "Shortcut title",
        defaultValue: shortcut.title
      },
      {
        name: "shortcut_link",
        label: "Shortcut link",
        placeholder: "Shortcut link",
        defaultValue: shortcut.link
      }
    ],
    buttons: [
      {
        text: "Remove",
        config: { type: "notice" },
        type: "button",
        onClick: () => {
          removeShortcut({ id: shortcut.id });

          closeModal();
        }
      },
      {
        text: "Update",
        type: "submit"
      },
      {
        text: "Cancel",
        config: { type: "danger" },
        type: "button",
        onClick: closeModal
      }
    ],
    onSubmit: ({ shortcut_title: title, shortcut_link: link }) => {
      if (!title || !link) return;

      updateShortcut({ id: shortcut.id }, { title, link });
    }
  });

const CategoryTitleButton = withModal(function CategoryTitleButton({
  openModal,
  category,
  removeCategory,
  closeModal,
  updateCategory
}) {
  const openUpdateCategoryModal = () =>
    openModal({
      title: "Update category",
      fields: [
        {
          label: "Category title",
          name: "category_title",
          defaultValue: category.title
        }
      ],
      buttons: [
        {
          text: "Remove",
          type: "button",
          config: { type: "notice" },
          onClick: () => {
            removeCategory({ id: category.id });
            closeModal();
          }
        },
        {
          text: "Update",
          type: "submit"
        },
        {
          text: "Cancel",
          type: "button",
          config: { type: "danger" },
          onClick: closeModal
        }
      ],
      onSubmit: ({ category_title }) => {
        if (!category_title) return;

        updateCategory({ id: category.id }, { title: category_title });
      }
    });

  return (
    <Button
      config={{ bordered: false, backgrounded: false, size: "fit" }}
      onClick={openUpdateCategoryModal}
      className={styles["shortcuts-category-title"]}
      text={category.title}
    />
  );
});

const ShortcutCategory = withModal(function ShortcutCategory({
  category,
  shortcuts,
  openModal,
  closeModal,
  actions
}) {
  const {
    addShortcut,
    updateCategory,
    removeCategory,
    updateShortcut,
    removeShortcut
  } = actions;

  return (
    <>
      <CategoryTitleButton
        updateCategory={updateCategory}
        removeCategory={removeCategory}
        category={category}
      />
      <div className="shortcuts">
        {shortcuts.map(({ id, title, link }) => (
          <Shortcut
            key={id}
            title={title}
            link={link}
            onConfigClick={e => {
              e.preventDefault();
              openUpdateShortcutModal({
                shortcut: { id, title, link },
                closeModal,
                openModal,
                removeShortcut,
                updateShortcut
              });
            }}
          />
        ))}
        <Shortcut
          title="Add shortcut"
          icon="+"
          isShape={true}
          onClick={e => {
            e.preventDefault();

            openAddShortcutModal({
              addShortcut,
              category_id: category.id,
              openModal,
              closeModal
            });
          }}
        />
      </div>
    </>
  );
});

const AddCategoryButton = withModal(function AddCategoryButton(
  modalContextProps
) {
  const text = "Add category...";
  const classes = [
    styles["shortcuts-category-title"],
    styles["shortcuts-category-title--grayed"]
  ].join(" ");

  return (
    <Button
      config={{ backgrounded: false, bordered: false, size: "fit" }}
      className={classes}
      onClick={() => openAddCategoryModal(modalContextProps)}
      text={text}
    />
  );
});

export default React.memo(function Shortcuts() {
  const { shortcuts, categories, actions } = useShortcuts();

  return (
    <div className={styles["shortcuts-module"]}>
      {categories.map(category => (
        <ShortcutCategory
          key={category.id}
          category={category}
          shortcuts={shortcuts.filter(
            shortcut => shortcut && shortcut.category_id === category.id
          )}
          actions={actions}
        />
      ))}
      <AddCategoryButton addCategory={actions.addCategory} />
    </div>
  );
});
