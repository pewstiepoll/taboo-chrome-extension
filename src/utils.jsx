export function bindActionCreator(dispatch, action) {
  return (...params) => {
    dispatch(action(...params));
  };
}
