/* 

  index.js 
    Our main page with its corresponding components.
*/

import ScrollDisplay from "../../../components/scrollDisplay";
import PropTypes from "prop-types";
import PostShape from "../../../components/PostShape";
import AddButton from "@/components/AddButton";

export default function MainPageCategory({
  goToPost,
  setCurrentPost,
  currentPost,
  searchQuery,
  searchBarQuery,
  handleClickMenubar,
  setOpenLeftSideBar,
  setOpenRightSideBar,
  setLatestUpvote,
}) {
  console.log("here");

  return (
    <div>
      {searchQuery && (
        <ScrollDisplay
          Posts={searchQuery}
          goToPost={goToPost}
          setCurrentPost={setCurrentPost}
          currentPost={currentPost}
          searchBarQuery={searchBarQuery}
          setLatestUpvote={setLatestUpvote}
        />
      )}

      <AddButton
        handleClick={handleClickMenubar}
        setOpenLeftSideBar={setOpenLeftSideBar}
        setOpenRightSideBar={setOpenRightSideBar}
      />
    </div>
  );
}

MainPageCategory.propTypes = {
  goToPost: PropTypes.func,
  setCurrentPost: PropTypes.func,
  currentPost: PostShape,
  searchQuery: PropTypes.array,
  setCategoryQuery: PropTypes.func,
};
