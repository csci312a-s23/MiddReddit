//code adapted from https://stackoverflow.com/questions/63297109/nested-sidebar-menu-with-material-ui-and-reactjs
import MenuItem from "./categorySidebarComponents/MenuItem";
//eslint-disable-next-line
import CurrentCategorySidebar from "./categorySidebarComponents/currentCategory";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function CategorySidebar({ categories, goToCategory }) {
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
    <MenuItem key={item.id} item={item} goToCategory={goToCategory} />
  ));

  //    {currentCategory && <CurrentCategorySidebar currentCategory={currentCategory}/>}
  //    currently only works about half the time, will have to investigate

  return <div>{newMenu}</div>;
}
