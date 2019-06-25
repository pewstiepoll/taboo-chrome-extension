import { useReducer, useEffect } from "react";

import { Storage, LocalStorageStorageStrategy } from "../../classes";
import { bindActionCreator } from "../../utils";

/**
 * Initialize storage
 */
const storage = new Storage("shortcuts", new LocalStorageStorageStrategy());

if (!storage.hasProperty("shortcuts")) storage.addProperty("shortcuts", []);

if (!storage.hasProperty("categories")) storage.addProperty("categories", []);

/**
 * Action types
 */
// Categories
export const SHORTCUTS_ADD_CATEGORY = "SHORTCUTS_ADD_CATEGORY";
export const SHORTCUTS_REMOVE_CATEGORY = "SHORTCUTS_REMOVE_CATEGORY";
export const SHORCUTS_UPDATE_CATEGORY = "SHORCUTS_UPDATE_CATEGORY";

// Shortcuts
export const SHORTCUTS_ADD_SHORTCUT = "SHORTCUTS_ADD_SHORTCUT";
export const SHORTCUTS_REMOVE_SHORTCUT = "SHORTCUTS_REMOVE_SHORTCUT";
export const SHORTCUTS_UPDATE_SHORTCUT = "SHORTCUTS_UPDATE_SHORTCUT";

/**
 * Actions creators
 */
export const addCategory = category => ({
  type: SHORTCUTS_ADD_CATEGORY,
  payload: { category }
});

export const removeCategory = ({ title, id }) => ({
  type: SHORTCUTS_REMOVE_CATEGORY,
  payload: { title, id }
});

export const updateCategory = ({ title, id }, updates) => ({
  type: SHORCUTS_UPDATE_CATEGORY,
  payload: {
    id,
    title,
    updates
  }
});

export const addShortcut = shortcut => ({
  type: SHORTCUTS_ADD_SHORTCUT,
  payload: { shortcut }
});

export const removeShortcut = ({ id, title, link }) => ({
  type: SHORTCUTS_REMOVE_SHORTCUT,
  payload: { title, id, link }
});

export const updateShortcut = ({ id, title, link }, updates) => ({
  type: SHORTCUTS_UPDATE_SHORTCUT,
  payload: {
    id,
    title,
    link,
    updates
  }
});

/**
 * Default state for shortcuts reducer
 */
export const initialState = {
  categories: storage.getProperty("categories"),
  shortcuts: storage.getProperty("shortcuts")
};

/**
 * Shortcut hook reducer function
 * Store structure: { categories: CategoryObject[], shortcuts: ShortcutObject[] }
 */
function shortcutsStateReducer({ categories, shortcuts }, { type, payload }) {
  switch (type) {
    case SHORTCUTS_ADD_CATEGORY:
      return {
        shortcuts,
        categories: [...categories, payload.category]
      };
    case SHORTCUTS_REMOVE_CATEGORY:
      return {
        // Filter out category if title or id matches with ones from paylaod
        categories: categories.filter(
          category =>
            category.id !== payload.id && category.title !== payload.title
        ),
        // Filter out all shortcuts that belong to the removed category
        shortcuts: shortcuts.filter(
          shortcut => shortcut.category_id !== payload.id
        )
      };
    case SHORCUTS_UPDATE_CATEGORY:
      if (payload.updates.id)
        throw new Error(
          `[${SHORCUTS_UPDATE_CATEGORY}]: Category.id cannot be updated manually.`
        );

      return {
        shortcuts,
        categories: categories.map(category => {
          if (category.id === payload.id || category.title === payload.title) {
            category.update(payload.updates);
          }
          return category;
        })
      };
    case SHORTCUTS_ADD_SHORTCUT:
      return {
        categories,
        shortcuts: [...shortcuts, payload.shortcut]
      };
    case SHORTCUTS_REMOVE_SHORTCUT:
      return {
        categories,
        // Filter out shortcut if its id/title/link matches with ones from the payload
        shortcuts: shortcuts.filter(
          shortcut =>
            shortcut.id !== payload.id &&
            shortcut.title !== payload.title &&
            shortcut.link !== payload.link
        )
      };
    case SHORTCUTS_UPDATE_SHORTCUT:
      if (payload.updates.id)
        throw new Error(
          `[${SHORTCUTS_UPDATE_SHORTCUT}]: Category.id cannot be updated manually.`
        );

      return {
        categories,
        shortcuts: shortcuts.map(shortcut => {
          if (
            shortcut.id === payload.id ||
            shortcut.title === payload.title ||
            shortcut.link === payload.link
          ) {
            return shortcut.update(payload.updates);
          }

          return shortcut;
        })
      };
    default:
      throw new Error("[shortcutsStateReducer] Unknown action type: ", type);
  }
}

/**
 * @func useShortcuts - custom hook. Managing shortcuts store.
 */
export default function useShortcuts() {
  const [{ categories, shortcuts }, dispatch] = useReducer(
    shortcutsStateReducer,
    initialState
  );

  useEffect(() => {
    // Persist data in localstorage
    storage.updateProperties({
      shortcuts,
      categories
    });
  }, [shortcuts, categories]);

  // Create actions for manipulating categories
  const actions = {
    // Categories actions
    addCategory: bindActionCreator(dispatch, addCategory),
    removeCategory: bindActionCreator(dispatch, removeCategory),
    updateCategory: bindActionCreator(dispatch, updateCategory),

    // Shortcuts actions
    addShortcut: bindActionCreator(dispatch, addShortcut),
    removeShortcut: bindActionCreator(dispatch, removeShortcut),
    updateShortcut: bindActionCreator(dispatch, updateShortcut)
  };

  return {
    shortcuts,
    categories,
    actions
  };
}
