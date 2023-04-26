//code adapted from https://stackoverflow.com/questions/63297109/nested-sidebar-menu-with-material-ui-and-reactjs
import MultiLevel from "./MultiLevel";

import SingleLevel from "./SingleLevel";
function hasChildren(item) {
  const { children } = item;

  if (children === undefined) {
    return false;
  }

  if (children.constructor !== Array) {
    return false;
  }

  if (children.length === 0) {
    return false;
  }

  return true;
}

export default function MenuItem({ item, goToCategory }) {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} goToCategory={goToCategory} />;
}
