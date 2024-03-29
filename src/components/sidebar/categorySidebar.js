//code adapted from https://stackoverflow.com/questions/63297109/nested-sidebar-menu-with-material-ui-and-reactjs
import MenuItem from "./categorySidebarComponents/MenuItem";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function CategorySidebar({
  categories,
  goToCategory,
  setSearchBarQuery,
}) {
  //eslint-disable-next-line
  const [currentCategory, setCurrentCategory] = useState();
  const router = useRouter();
  const { catName } = router.query;

  useEffect(() => {
    const currentCategoryFiltered = categories.filter(
      (category) => category.name === catName
    )[0];
    setCurrentCategory(currentCategoryFiltered);
  }, [catName, categories]);

  const newMenu = categories.map((item) => (
    <MenuItem
      key={item.id}
      item={item}
      goToCategory={goToCategory}
      setSearchBarQuery={setSearchBarQuery}
    />
  ));

  return <div>{newMenu}</div>;
}
