/*
  LeftSideBar.js

  Displays side bar options such as:
  Home: takes user back to main index page
  Profile: takes user to their profile
  etc: (WIP)
*/
import { Typography } from "@mui/material";
import CategorySidebar from "./categorySidebar";
export default function LeftSidebar({
  categories,
  goToCategory,
  setSearchBarQuery,
}) {
  return (
    <div>
      <Typography p={4} pb={1} variant="h6" component="h6">
        Categories
      </Typography>
      {categories && (
        <CategorySidebar
          categories={categories}
          goToCategory={goToCategory}
          setSearchBarQuery={setSearchBarQuery}
        />
      )}
    </div>
  );
}
