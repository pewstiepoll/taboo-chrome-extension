import uuidV4 from "uuid/v4";
import ShortcutClass from "../../classes/Shortcut";
import CategoryClass from "../../classes/ShortcutCategory";

export function getMock(categoryTitle) {
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
