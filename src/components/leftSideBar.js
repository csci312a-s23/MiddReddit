/*
  LeftSideBar.js

  Displays side bar options such as:
  Home: takes user back to main index page
  Profile: takes user to their profile
  etc: (WIP)
*/
import CategorySidebar from "./categorySidebar";
export default function LeftSidebar({ categories, goToCategory }) {
  return (
    <div>
      <h2>I am a sidebar.</h2>
      {categories && (
        <CategorySidebar categories={categories} goToCategory={goToCategory} />
      )}
    </div>
  );
}
