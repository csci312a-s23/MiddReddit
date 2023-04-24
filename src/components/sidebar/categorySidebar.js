//code adapted from https://stackoverflow.com/questions/63297109/nested-sidebar-menu-with-material-ui-and-reactjs
import MenuItem from "./categorySidebarComponents/MenuItem";

export default function CategorySidebar({ categories, goToCategory }) {
  const newMenu = categories.map((item) => (
    <MenuItem key={item.id} item={item} goToCategory={goToCategory} />
  ));
  return <div>{newMenu}</div>;
}
