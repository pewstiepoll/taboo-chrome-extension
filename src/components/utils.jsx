export function bindActionCreator(dispatch, action) {
  return (...params) => {
    dispatch(action(...params));
  };
}

export function mergeClassNames(...classNames) {
  return classNames
    .map(className => {
      if (!className) return "";

      if (typeof className === "string") return className;
      if (Array.isArray(className)) return className.join(" ");

      throw TypeError(
        "mergeClassNames helper can only take strings and arrays as values."
      );
    })
    .join(" ");
}

export function formDataToObject(formData) {
  const result = {};

  for (let [key, value] of formData.entries()) {
    result[key] = value;
  }

  return result;
}
