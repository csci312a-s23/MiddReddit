/* 

  index.js 
    Our main page with its corresponding components.
*/

//commented out to solve commit errors
// import { useState } from "react";
import ScrollDisplay from "../../../components/scrollDisplay";
//import data from "../../data/seedPost.json";
//import { useRouter } from "next/router";
import PropTypes from "prop-types";
import PostShape from "../../../components/PostShape";
import AddButton from "@/components/AddButton";

export default function MainPageCategory({
  goToPost,
  setCurrentPost,
  currentPost,
  searchQuery,
  //setCategoryQuery,
  searchBarQuery,
  handleClickMenubar,
  setOpenLeftSideBar,
  setOpenRightSideBar,
  setLatestUpvote,
}) {
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
